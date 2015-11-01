class CreateTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, :handle, null: false
      t.timestamps
    end

    add_index :users, %i(handle), unique: false

    create_table :post_makers do |t|
      t.references :user, index: true, null: false
      t.references :post, index: true, null: false
      t.timestamps
    end

    add_index :post_makers, %i(user_id post_id), unique: false

    create_table :posts do |t|
      t.references :user, index: true, null: false
      t.string :title, :tagline, null: false
      t.integer :votes_count, :comments_count, null: false, default: 0
      t.timestamps
    end
  end
end
