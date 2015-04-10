class PhotosController < ApplicationController
  def index
    @photo = Photo.new
    c = Photo.find(1).comments
    render :json => {:stat => "ok",:msg => "Creating Container is #{c}"} , status=>"200 ok"
  end
end
