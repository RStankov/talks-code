require 'bundler/setup'
require 'rspec'
require 'rspec/autorun'

class Calculation
  def initialize(expression)
    @expression = expression
  end

  OPERATIONS = {
    '+' => ->(a, b) { a + b },
    '-' => ->(a, b) { a - b },
    '*' => ->(a, b) { a * b }
  }

  def value
    a, operand, b = @expression.split ' '

    operation = OPERATIONS[operand]
    raise "Can't parse expression - #{@expression}" unless operation

    operation.call a.to_i, b.to_i
  end
end


describe Calculation do
  it "can add numbers" do
    calculation = Calculation.new('1 + 1')
    expect(calculation.value).to eq 2
  end

  it "can subtract numbers" do
    calculation = Calculation.new('2 - 1')
    expect(calculation.value).to eq 1
  end

  it "can multiply numbers" do
    calculation = Calculation.new('3 * 2')
    expect(calculation.value).to eq 6
  end

  it "raises an error on unknown operation" do
    calculation = Calculation.new('3 ~ 2')
    expect { calculation.value }.to raise_error
  end
end

