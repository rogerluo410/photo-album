class Photo < ActiveRecord::Base
  attr_accessible :photo_name, :photo_addr, :photo_code, :photo_desc
  has_many :comments, :dependent => :destroy

  validate :photo_name, presence:true, on: :create
  validate :photo_addr, presense:true, on: :create

  #scope :get_start_timestamp, lambda { select(:created_at).order(created_at: :desc).first }
  #scope :get_start_timestamp, lambda { order(created_at: :desc).first.pluck(:created_at) }
  #scope :get_start_timestamp, lambda { order(created_at: :desc).first }
  scope :get_start_timestamp, lambda { where("id < 5") }

  def uploadImageFile(filePath,fileIO)
      File.open(filePath,'w') do | file |
         file.write(fileIO.read.force_encoding("UTF-8"))
      end
  end

end
