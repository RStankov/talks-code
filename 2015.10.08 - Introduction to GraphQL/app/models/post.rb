class Post < ActiveRecord::Base
  belongs_to :user

  has_many :post_makers, dependent: :destroy
  has_many :makers, foreign_key: 'user_id', through: :post_makers, source: :user

  validates :user, :title, :tagline, presence: true

  def thumbnail_url
    "assets.producthunt.com/post-#{id}"
  end
end
