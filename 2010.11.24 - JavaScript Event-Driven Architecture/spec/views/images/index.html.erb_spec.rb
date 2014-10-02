require 'spec_helper'

describe "images/index.html.erb" do
  before(:each) do
    assign(:images, [
      stub_model(Image,
        :position => 1
      ),
      stub_model(Image,
        :position => 1
      )
    ])
  end

  it { render }
end
