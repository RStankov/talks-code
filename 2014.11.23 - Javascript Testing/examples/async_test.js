"use strict";

mocha.setup('bdd');
window.expect = chai.expect;

var delay = function(callback) {
  setTimeout(function() {
    callback('wait for it...');
  }, 50);
};

it('is called later', function(done) {
  delay(function(message) {
    expect(message).to.eq('wait for it...');
    done();
  });
});
