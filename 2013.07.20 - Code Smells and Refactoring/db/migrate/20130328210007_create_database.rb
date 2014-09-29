class CreateDatabase < ActiveRecord::Migration
  def change
    create_table :exams do |t|
      t.timestamps
    end

    create_table :exam_questions do |t|
      t.integer :exam_id, null: false
      t.string :type, null:false
      t.integer :points, null: false
      t.string :correct_answer
      t.string :correct_answers
      t.timestamps
    end

    create_table :users do |t|
      t.timestamps
    end

    create_table :exam_entries do |t|
      t.integer :exam_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    create_table :exam_answers do |t|
      t.integer :exam_entry_id, null: false
      t.integer :exam_question_id, null: false
      t.string :text, null: false
      t.timestamps
    end
  end
end
