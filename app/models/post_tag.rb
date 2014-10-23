class PostTag < ActiveRecord::Base
  validates_uniqueness_of :post_id, :scope => :tag_id
  # Remember to create a migration!
  belongs_to :post
  belongs_to :tag
end
