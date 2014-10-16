
describe('script-onload', function(){
  var onload = require('script-onload');
  var assert = require('assert');

  it('should invoke the callback when the script loads', function(done){
    var el = document.createElement('script');
    el.src = '/test/works.js';
    document.body.appendChild(el);
    onload(el, function(err){
      if (err) return done(err);
      assert('yes' == window.works);
      done();
    });
  });

  it('should invoke the callback with error on error', function(done){
    var el = document.createElement('script');
    el.src = '/test/foo.js';
    document.body.appendChild(el);
    onload(el, function(err){
      if (!err) return done(err);
      done();
    });
  });
});
