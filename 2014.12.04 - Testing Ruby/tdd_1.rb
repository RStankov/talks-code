require 'bundler/setup'
require 'rspec'
require 'rspec/autorun'

class Calculation
  def initialize(expression)
  end

  def value
  end
end


describe Calculation do
  it "can sum numbers" do
    calculation = Calculation.new('1 + 1')
    expect(calculation.value).to eq 2
  end
end
