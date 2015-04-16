class PhotosController < ApplicationController
  def index
    @photos = Photo.all
    render :json => {:stat => "ok",:photos => @photos } , :status => 200
  end

  def create
      @photo = Photo.new
      tempIO = params[:originalPhoto]
      @photo.photo_name = params[:photoName]
      @photo.photo_code = Time.now.to_i.to_s+tempIO.original_filename.force_encoding("UTF-8")
      @photo.photo_addr = 'public/uploads/'

  end

  def show
      @photo    = Photo.find params[:id]
      @comments = @photo.comments unless @photo.eql? nil
      @photo    ||= []
      @comments ||= []
      render :json => {:stat => "ok", :photo => @photo, :comments => @comments } , :status => 200
  rescue ActiveRecord::RecordNotFound
      #redirect_to "/photos/index", :alert => 'No existing photo id'
      redirect_to :action => 'index'
  end

  def new
      @photo = Photo.new
  end



end
