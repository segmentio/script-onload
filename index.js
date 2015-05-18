'use strict';

// Credit: https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

/**
 * Attach load event to `el` (IE >= 11, other major browsers).
 *
 * @api private
 * @param {Element} element
 * @param {Function} callback
 */

function add(element, callback) {
  element.addEventListener('load', function(event) {
    callback(null, event);
  }, false);
  element.addEventListener('error', function(event) {
    var error = new Error('script error "' + element.src + '"');
    error.event = event;
    callback(error);
  }, false);
}

/**
 * Attach event (IE <= 10).
 *
 * @api private
 * @param {Element} element
 * @param {Function} callback
 */

function attach(element, callback) {
  element.attachEvent('onreadystatechange', function(event) {
    if (!/complete|loaded/.test(element.readyState)) return;
    callback(null, event);
  });
  element.attachEvent('onerror', function(event) {
    var error = new Error('failed to load the script "' + element.src + '"');
    error.event = event || window.event;
    callback(error);
  });
}

/**
 * Invoke `callback(err, event)` when the given `element` script loads.
 *
 * @api public
 * @param {Element} element
 * @param {Function(err, event)} callback
 */

function onLoad(element, callback) {
  return (element.addEventListener ? add : attach)(element, callback);
}

/**
 * Exports.
 */

module.exports = onLoad;
