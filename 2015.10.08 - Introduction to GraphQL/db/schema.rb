# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151031191801) do

  create_table "post_makers", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "post_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "post_makers", ["post_id"], name: "index_post_makers_on_post_id"
  add_index "post_makers", ["user_id", "post_id"], name: "index_post_makers_on_user_id_and_post_id"
  add_index "post_makers", ["user_id"], name: "index_post_makers_on_user_id"

  create_table "posts", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.string   "title",                      null: false
    t.string   "tagline",                    null: false
    t.integer  "votes_count",    default: 0, null: false
    t.integer  "comments_count", default: 0, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "handle",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["handle"], name: "index_users_on_handle"

end
