class ExamEntry < ActiveRecord::Base
  belongs_to :exam
  belongs_to :user

  has_many :answers, class_name: 'ExamAnswer'

  validates_presence_of :user, :exam
end
