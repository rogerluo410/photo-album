class Photo < ActiveRecord::Base
  attr_accessible :photo_name, :photo_addr, :photo_code, :photo_desc
  has_many :comments, :dependent => :destroy

  validate :photo_name, presence:true, on: :create
  validate :photo_addr, presense:true, on: :create



end
