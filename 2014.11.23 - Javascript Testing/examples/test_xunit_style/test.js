"use strict";

mocha.setup('tdd');
window.assert = chai.assert;

function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function(value) {
  this.value += value;
}

Calculator.prototype.multiply = function(value) {
  this.value *= value;
}


suite("Calculator", function() {
  setup(function() {
    this.calculator = new Calculator(2)
  });

  test("adding a value", function() {
    this.calculator.add(2);

    assert(this.calculator.value == 4);
  });

  test("multiply a value", function() {
    this.calculator.multiply(3);

    assert(this.calculator.value == 6);
  });
});



