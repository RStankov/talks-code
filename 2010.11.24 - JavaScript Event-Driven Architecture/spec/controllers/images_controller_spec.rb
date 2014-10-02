require 'spec_helper'

describe ImagesController do

  def mock_image(stubs={})
    @mock_image ||= mock_model(Image, stubs)
  end

  describe "GET index" do
    it "assigns all images as @images" do
      Image.should_receive(:order).with("position DESC").and_return [mock_image]

      get :index

      should assign_to(:images).with([mock_image])
    end
  end

  describe "GET show" do
    it "assigns the requested image as @image" do
      Image.stub(:find).with("37").and_return mock_image

      get :show, :id => "37"

      should assign_to(:image).with(mock_image)
    end
  end

  describe "POST create" do
    before { Image.stub(:new).with({'these' => 'params'}).and_return mock_image }

    context "with valid params" do
      context "xhr request" do
        before do
          mock_image.should_receive(:save).and_return true

          xhr :post, :create, :image => {'these' => 'params'}
        end

        it { should assign_to(:image).with(mock_image) }
        it { should render_template(mock_image) }

        it "returns response code 200" do
          response.code.should == "200"
        end
      end

      context "normal requst" do
        before do
          mock_image.should_receive(:save).and_return true

          post :create, :image => {'these' => 'params'}
        end

        it { should assign_to(:image).with(mock_image) }
        it { should redirect_to(images_url) }
      end
    end

    context "with invalid params" do
      context "xhr request" do

        before do
          mock_image.should_receive(:save).and_return false

          xhr :post, :create, :image => {'these' => 'params'}
        end

        it "returns response code 422 (unprocessable_entity) " do
          response.code.should == "422"
        end

        it "returns response text with the error" do
          response.body.should == I18n.t("activerecord.errors.image.cant_be_uploaded")
        end
      end

      context "normal request" do
        before do
          mock_image.should_receive(:save).and_return false

          post :create, :image => {'these' => 'params'}
        end

        it { should assign_to(:image).with(mock_image) }
        it { should set_the_flash.to(I18n.t("activerecord.errors.image.cant_be_uploaded")) }
        it { should redirect_to(images_url) }
      end
    end
  end

  describe "DELETE destroy" do
    context "normal request" do
      it "destroys image and redirects to images list" do
        Image.should_receive(:find).with("37").and_return mock_image

        mock_image.should_receive(:destroy)

        delete :destroy, :id => "37"

        should redirect_to(images_url)
      end
    end

    context "xhr request" do
      it "destroys image and heads :ok" do
        Image.should_receive(:find).with("37").and_return mock_image

        mock_image.should_receive(:destroy)

        xhr :delete, :destroy, :id => "37"

        response.code.should == "200"
        response.body.should == " "
      end
    end
  end

  describe "PUT reorder" do
    it "change the order of the given images" do
      Image.should_receive(:change_order_of).with(["1", "2", "3", "4"])

      xhr :put, :reorder, :image => ["1", "2", "3", "4"]

      response.code.should == "200"
      response.body.should == " "
    end
  end
end
