require 'spec_helper'

describe ExamAnswer do
  describe "#correct?" do
    it "returns true if answer is correct" do
      answer = build :answer, question: build(:question, correct_answer: 'Correct'), text: 'Correct'
      answer.should be_correct
    end

    it "returns false if answer is wrong" do
      answer = build :answer, text: 'Wrong'
      answer.should_not be_correct
    end
  end

  describe "#points" do
    context "correct answer" do
      it "returns its question points" do
        answer = build :correct_answer
        answer.points.should eq answer.question.points
      end
    end

    context "wrong answer" do
      it "returns 0" do
        answer = build :wrong_answer
        answer.points.should eq 0
      end
    end
  end
end
