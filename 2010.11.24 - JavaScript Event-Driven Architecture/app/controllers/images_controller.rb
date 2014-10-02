class ImagesController < ApplicationController
  def index
    @images = Image.order("position DESC")
  end

  def show
    @image = Image.find(params[:id])
  end

  def create
    @image = Image.new(params[:image])

    if @image.save
      if request.xhr?
        render @image
      else
        redirect_to images_url
      end
    else
      alert = I18n.t("activerecord.errors.image.cant_be_uploaded")
      if request.xhr?
        render :text => alert, :status => :unprocessable_entity
      else
        redirect_to images_url, :alert => alert
      end
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy

    if request.xhr?
      head :ok
    else
      redirect_to images_url
    end
  end

  def reorder
    Image.change_order_of params[:image]

    head :ok
  end
end
