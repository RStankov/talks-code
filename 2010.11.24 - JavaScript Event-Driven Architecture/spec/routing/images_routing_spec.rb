require "spec_helper"

describe ImagesController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/images" }.should route_to(:controller => "images", :action => "index")
    end

    it "recognizes and generates #create" do
      { :post => "/images" }.should route_to(:controller => "images", :action => "create")
    end

    it "recognizes and generates #show" do
      { :get => "/images/1" }.should route_to(:controller => "images", :action => "show", :id => "1")
    end

    it "recognizes and generates #destroy" do
      { :delete => "/images/1" }.should route_to(:controller => "images", :action => "destroy", :id => "1")
    end

    it "recognizes and generates #reorder" do
      { :put => "/images/reorder" }.should route_to(:controller => "images", :action => "reorder")
    end

  end
end
