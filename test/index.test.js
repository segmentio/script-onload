'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var fmt = require('util').format;
var onload = require('..');

/**
 * Get the location of the test server. We fetch test scripts from this server.
 */

var location = window.location;
var testUrl = fmt('%s//%s%s', location.protocol, location.hostname, location.port && ':' + ZUUL.port);

/**
 * Tests.
 */

describe('script-onload', function(){
  // Declared by `script.js`
  mocha.globals(['works']);

  var container;

  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  it('should invoke `callback` when the script loads', function(done) {
    var el = document.createElement('script');
    el.src = fmt('%s/script.js', testUrl);
    container.appendChild(el);
    onload(el, function(error) {
      assert.equal(error, null);
      assert.equal(window.works, 'yes');
      done();
    });
  });

  it('should invoke `callback` with the event', function(done) {
    var el = document.createElement('script');
    el.src = fmt('%s/script.js', testUrl);
    container.appendChild(el);
    onload(el, function(error, event) {
      assert.equal(error, null);
      assert.equal(typeof event, 'object');
      done();
    });
 });

  it('should invoke the callback with error on error', function(done) {
    var el = document.createElement('script');
    el.src = fmt('%s/nonexistent.js', testUrl);
    container.appendChild(el);
    onload(el, function(error) {
      assert(error);
      done();
    });
  });
});
