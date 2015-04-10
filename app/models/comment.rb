class Comment < ActiveRecord::Base
  attr_accessible :comment_content, :photo_id
  belongs_to :photo


end
