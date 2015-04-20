class PhotosController < ApplicationController
  def index
    @photos = Photo.all
    p Photo.get_start_timestamp
    render :json => {:stat => "ok",:photos => @photos } , :status => 200
  end

  def create
      @photo = Photo.new
      tempIO = params[:image_uploader_multiple]["0"].tempfile
      p tempIO
      @photo.photo_name = params[:image_uploader_multiple]["0"].original_filename
      @photo.photo_code = Time.now.to_i.to_s+@photo.photo_name.force_encoding("UTF-8")
      @photo.photo_addr = "public/uploads/#{@photo.photo_code}"
      @photo.photo_desc = "No,In present"#params[:photo][:photoDesc]
      if @photo.save && @photo.uploadImageFile(@photo.photo_addr,tempIO)
         render :json => {:stat => "ok"}, :status => 200
      else
         render :json => {:stat => "error"}, :status => 200
      end
  rescue ActiveRecord::RecordInvalid
     redirect_to :action => 'index', :alert => "#{@photo.errors.messages}"
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
