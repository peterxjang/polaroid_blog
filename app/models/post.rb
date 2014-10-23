class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags
  # validates :tags, uniqueness: true
end
