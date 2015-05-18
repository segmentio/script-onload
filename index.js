'use strict';

// Credit: https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

/**
 * Attach load event to `el` (IE >= 9, other major browsers).
 *
 * @api private
 * @param {Element} element
 * @param {Function} callback
 */

function add(element, callback){
  element.addEventListener('load', function(_, el){
    callback(null, el);
  }, false);
  element.addEventListener('error', function(event){
    var error = new Error('script error "' + element.src + '"');
    error.event = event;
    callback(error);
  }, false);
}

/**
 * Attach event (IE < 9).
 *
 * @api private
 * @param {Element} element
 * @param {Function} callback
 */

function attach(element, callback){
  element.attachEvent('onreadystatechange', function(e){
    if (!/complete|loaded/.test(element.readyState)) return;
    callback(null, e);
  });
  element.attachEvent('onerror', function(event){
    var error = new Error('failed to load the script "' + element.src + '"');
    error.event = event || window.event;
    callback(error);
  });
}

/**
 * Invoke `callback(err, el)` when the given `element` script loads.
 *
 * @api public
 * @param {Element} element
 * @param {Function} callback
 */

function onLoad(element, callback){
  return (element.addEventListener ? add : attach)(element, callback);
}

/**
 * Exports.
 */

module.exports = onLoad;
