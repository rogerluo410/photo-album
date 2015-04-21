class PhotosController < ApplicationController
  def index
    @photos = Photo.all
    #p Photo.get_start_timestamp
    render :json => {:stat => "ok",:photos => @photos } , :status => 200
    #respond_to do | format |
    #   #format.html
    #   format.json { render json: @photos.to_json }
    #end
  end

  def create
      params[:image_uploader_multiple].each do | key,image |
           @photo = Photo.new
           tempIO = image.tempfile || ''
           raise ActiveRecord::RecordInvalid.new(@photo) if tempIO.blank?

           @photo.photo_name = image.original_filename || ''
           @photo.photo_code = Time.now.to_i.to_s+@photo.photo_name.force_encoding("UTF-8")
           @photo.photo_addr = "public/uploads/#{@photo.photo_code}"
           @photo.photo_desc = "No,In present"#params[:photo][:photoDesc]
           Photo.transaction do
              unless @photo.uploadImageFile(@photo.photo_addr,tempIO) && @photo.save #One DML, one transaction
                raise ActiveRecord::RecordInvalid.new(@photo)
              end
           end
      end
      #render :json => {:stat => "ok" , :options => {:skip => true}}, :status => 200
      redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid => e
     redirect_to :action => 'index', :alert => "#{e.message}"
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
