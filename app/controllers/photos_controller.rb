class PhotosController < ApplicationController
  def index
    @photos = Photo.all
    render :json => {:stat => "ok",:photos => @photos } , status => "200"
  end

  def create
      @photo = Photo.new
      @photo.photo_name = params[:photoname]
      #@photo.photo_addr =

  end

  def show
      @photo    = Photo.find params[:id]
      @comments = @photo.comments unless @photo.eql? nil
      @photo    || []
      @comments || []
      render :json => {:stat => "ok", :photo => @photo, :comments => @comments } , status => "200"
  rescue ActiveRecord::RecordNotFound
      redirect_to "/photos/index", :alert => 'No existing photo id'
  end

  def new
      @photo = Photo.new
  end



end
