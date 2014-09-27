require 'spec_helper'

describe ExamEntryReport do
  let(:correct_answer) { double correct?: true,  points: 1 }
  let(:wrong_answer)   { double correct?: false, points: 0 }
  let(:report)         { ExamEntryReport.new [correct_answer, wrong_answer] }

  it "has correct answers" do
    report.correct_answers.should eq [correct_answer]
  end

  it "has wrong answers" do
    report.wrong_answers.should eq [wrong_answer]
  end

  it "has score" do
    report.score.should eq correct_answer.points
  end
end
