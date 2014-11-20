"use strict";

mocha.setup('bdd');
window.expect = chai.expect;

function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function(value) {
  this.value += value;
}

Calculator.prototype.multiply = function(value) {
  this.value *= value;
}


describe("Calculator", function() {
  beforeEach(function() {
    this.calculator = new Calculator(2)
  });

  it("can add a value", function() {
    this.calculator.add(2);

    expect(this.calculator.value).to.eq(4);
  });

  it("can multiply a value", function() {
    this.calculator.multiply(3);

    expect(this.calculator.value).to.eq(6);
  });
});


