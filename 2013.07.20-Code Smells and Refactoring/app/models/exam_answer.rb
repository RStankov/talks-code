class ExamAnswer < ActiveRecord::Base
  belongs_to :question, class_name: 'ExamQuestion', foreign_key: 'exam_question_id'
  belongs_to :entry, class_name: 'ExamEntry', foreign_key: 'exam_entry_id'

  validates_presence_of :question, :entry, :text

  def correct?
    question.correct_answer? text
  end

  def points
    return 0 unless correct?
    question.points
  end
end
