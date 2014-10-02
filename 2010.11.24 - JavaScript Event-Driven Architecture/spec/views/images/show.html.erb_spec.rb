require 'spec_helper'

describe "images/show.html.erb" do
  before(:each) do
    @image = assign(:image, stub_model(Image,
      :position => 1
    ))
  end

  it { render }
end
