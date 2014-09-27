FactoryGirl.define do
  factory :user do
  end

  factory :exam do
  end

  factory :question, class: :exam_question do
    exam
    type 'single'
    points 1
    correct_answer 'Correct'
  end

  factory :single_question, class: :exam_question do
    exam
    type 'single'
    points 1
    correct_answer 'Correct'
  end

  factory :multi_question, class: :exam_question do
    exam
    type   'multi'
    points 1
    correct_answers ['Correct 1', 'Correct 2']
  end

  factory :exam_entry do
    exam
    user
  end

  factory :answer, class: :exam_answer do
    entry { create :exam_entry }
    question { create :single_question }
    text 'Text'
  end

  factory :correct_answer, class: :exam_answer do
    entry { create :exam_entry }
    question { create :single_question, correct_answer: 'Correct' }
    text 'Correct'
  end

  factory :wrong_answer, class: :exam_answer do
    entry { create :exam_entry }
    question { create :single_question, correct_answer: 'Correct' }
    text 'Wrong'
  end
end

