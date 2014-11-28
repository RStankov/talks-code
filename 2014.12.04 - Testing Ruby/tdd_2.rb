require 'bundler/setup'
require 'rspec'
require 'rspec/autorun'

class Calculation
  def initialize(expression)
    @expression = expression
  end

  def value
    a, b = @expression.split '+'
    a.to_i + b.to_i
  end
end


describe Calculation do
  it "can add numbers" do
    calculation = Calculation.new('1 + 1')
    expect(calculation.value).to eq 2
  end
end

