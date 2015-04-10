class Photo < ActiveRecord::Base
  attr_accessible :photo_name, :photo_addr, :photo_code, :photo_desc
  has_many :comments
end
