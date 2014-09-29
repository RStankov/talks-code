class ExamEntryReport
  attr_reader :correct_answers, :wrong_answers, :score

  def initialize(answers)
    @correct_answers = answers.select &:correct?
    @wrong_answers   = answers.reject &:correct?
    @score           = answers.to_a.sum &:points
  end
end
