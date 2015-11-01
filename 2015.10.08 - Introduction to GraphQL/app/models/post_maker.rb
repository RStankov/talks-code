class PostMaker < ActiveRecord::Base
  belongs_to :user
  belongs_to :post

  validates :user, :post, presence: true
  validates :user_id, uniqueness: {scope: 'post_id'}
end
