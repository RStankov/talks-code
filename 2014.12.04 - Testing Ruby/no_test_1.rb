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

puts Calculation.new("1 + 1")
puts Calculation.new("2 - 1")
puts Calculation.new("3 * 2")
