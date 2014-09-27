class Exam < ActiveRecord::Base
  has_many :entries, class_name: 'ExamEntry'
end
