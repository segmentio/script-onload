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
  mocha.globals(['works']);

  it('should invoke the callback when the script loads', function(done){
    var el = document.createElement('script');
    el.src = fmt('%s/script.js', testUrl);
    document.body.appendChild(el);
    onload(el, function(err){
      if (err) return done(err);
      assert.equal(window.works, 'yes');
      done();
    });
  });

  it('should invoke the callback with error on error', function(done){
    var el = document.createElement('script');
    el.src = fmt('%s/nonexistent.js', testUrl);
    document.body.appendChild(el);
    onload(el, function(error) {
      assert(error);
      done();
    });
  });
});
