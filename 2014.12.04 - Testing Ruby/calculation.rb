class Calculation
  OPERATIONS = {
    '+' => ->(a, b) { a + b },
    '-' => ->(a, b) { a - b },
    '*' => ->(a, b) { a * b },
    '/' => ->(a, b) { a / b }
  }

  def self.operations
    OPERATIONS.keys
  end

  attr_reader :expression

  def initialize(expression)
    @expression = expression
  end

  def value
    @value ||= calculate_value
  end

  def to_s
    "#{expression} = #{value}"
  end

  private

  def calculate_value
    a, operand, b = expression.split ' '

    operation = OPERATIONS[operand]
    raise "Can't parse expression - #{@expression}" unless operation

    operation.call a.to_f, b.to_f
  end
end

class CLI
  def initialize(supported_operations)
    @operations = supported_operations
  end

  def run
    system 'clear'

    puts '-' * 20
    puts '~ Fancy Calculator ~'
    puts '-' * 20
    puts
    puts 'Supported operations: '

    @operations.each do |operation|
      puts "  #{operation}"
    end

    puts
    puts "(type 'exit' for quitting)"
    puts

    loop do
      puts 'calculation:'
      input = gets.chomp
      break if input == 'exit'

      puts yield(input)
      puts
    end
  end
end

if __FILE__ == $0
  cli = CLI.new Calculation.operations.map { |o| "a #{o} b"}
  cli.run { |input| Calculation.new(input).to_s }
end
