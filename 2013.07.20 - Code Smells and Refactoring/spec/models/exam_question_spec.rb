require 'spec_helper'

describe ExamQuestion do
  describe "#correct_answer?" do
    context "single" do
      let(:question) { build :single_question, correct_answer: 'Correct' }

      it "returns true if answer is correct" do
        question.correct_answer?('Correct').should be_true
      end

      it "returns false if answer is wrong" do
        question.correct_answer?('Wrong').should be_false
      end
    end

    context "multi" do
      let(:question) { build :multi_question, correct_answers: %W(Correct1 Correct2) }

      it "returns true if answer included in correct answers list" do
        question.correct_answer?('Correct1').should be_true
        question.correct_answer?('Correct2').should be_true
      end

      it "returns false if answer is wrong" do
        question.correct_answer?('Wrong').should be_false
      end
    end
  end
end
