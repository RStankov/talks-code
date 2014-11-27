require 'bundler/setup'
require 'minitest'
require 'minitest/autorun'

class Calculation
  attr_reader :value, :expression

  def initialize(expression)
    @expression = expression
    @value       = calculate_value
  end

  def to_s
    "#{expression} = #{value}"
  end

  private

  OPERATIONS = {
    '+' => ->(a, b) { a + b },
    '-' => ->(a, b) { a - b },
    '*' => ->(a, b) { a * b },
  }

  def calculate_value
    left, action, right = expression.split ' '

    operation = OPERATIONS.fetch(action) { raise "unknown action: #{action} (#{expression})" unless %w(+ -).include? action }
    operation.call left.to_i, right.to_i
  end
end

class Stack < Minitest::Test
  def test_add
    assert_equal 2, Calculation.new('1 + 1').value
  end

  def test_subtract
    assert_equal 1, Calculation.new('2 - 1').value
  end

  def test_multiply
    assert_equal 6, Calculation.new('3 * 2').value
  end
end
