require 'bundler/setup'
require 'rspec'
require 'rspec/autorun'

class Calculation
  def initialize(expression)
    @expression = expression
  end

  def value
    a, operation, b = @expression.split ' '
    if operation == '+'
      a.to_i + b.to_i
    elsif operation == '-'
      a.to_i - b.to_i
    elsif operation == '*'
      a.to_i * b.to_i
    end
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
end

