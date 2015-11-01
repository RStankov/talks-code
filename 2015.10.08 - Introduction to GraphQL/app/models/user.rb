class User < ActiveRecord::Base
  has_many :posts, dependent: :destroy

  has_many :post_makers, dependent: :destroy
  has_many :made_posts, foreign_key: 'post_id', through: :post_makers, source: :post

  validates :name, :handle, presence: true

  validates :handle, uniqueness: true

  def avatar_url
    "assets.producthunt.com/user-#{id}"
  end
end

