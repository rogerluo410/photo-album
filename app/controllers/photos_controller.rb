class PhotosController < ApplicationController
  def index
    render :json=>'{"stat":"ok","msg":"Creating Container is ok"}', status=>"200 ok"
  end
end
