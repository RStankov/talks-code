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


def assert_calculation(expression, value)
  calculation = Calculation.new(expression)

  if calculation.value != value
    raise "Expected #{value}, but got #{calculation.value} from #{expression}"
  end
end

assert_calculation "1 + 1", 2
assert_calculation "2 - 1", 1
assert_calculation "3 * 2", 6

puts 'Everything okay :)'
