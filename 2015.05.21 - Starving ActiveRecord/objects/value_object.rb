class Size
  include Comparable

  SIZES = [
    s:     'small'
    m:     'medium'
    l:     'large'
    xl:    'XL'
    xxl:   'XXL'
    xxxl:  'XXL'
  ]

  GENDERS = [
    f: 'female',
    m: 'male',
    u: 'unisex'
  ]

  GENDER_KEYS = SIZES.keys
  SIZE_KEYS   = SIZES.keys

  attr_reader :size, :gender

  class << self
    def groups
      SIZE_KEYS.map(&:to_s)
    end

    def genders
      GENDER_KEYS.map(&:to_s)
    end
  end

  def initialize(size, gender)
    @size   = size.to_sym
    @gender = gender.to_sym

    raise ArgumentError unless SIZES[@size].present?
    raise ArgumentError unless GENDERS[@gender].present?
  end

  def name
    "#{GENDERS[gender]} #{SIZES[size]}"
  end

  def <=>(other)
    [GENDER_KEYS.index(gender), SIZE_KEYS.index(size)] <=> [GENDER_KEYS.index(other.gender), SIZE_KEYS.index(other.size)]
  end

  def eql?(other)
    gender == other.gender && size == other.size
  end

  def to_s
    name
  end
end

class Size
  module WithSize
    def self.included(model)
      model.validates :size_group, inclusion: {in: Size.groups}
      model.validates :size_gender, inclusion: {in: Size.genders}
      model.composed_of :size,
          mapping:     [%w(size_group size_group), %w(size_gender size_gender)],
          allow_nil:   true,
          constructor: lambda { |group, gender| Size.new(group, gender) }

      model.extend ClassMethods
    end

    module ClassMethods
      def by_size
        # TODO: nasty sql :P
      end
    end
  end
end
