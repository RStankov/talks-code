require 'spec_helper'

describe Image do
  it { Image.should have_attached_file(:file) }
  it { should validate_attachment_presence(:file) }
  it { should allow_mass_assignment_of(:file) }
  it { should_not allow_mass_assignment_of(:position) }

  describe ".change_order_of" do
    it "accepts nil as argument" do
      lambda { Image.reorder( nil ) }.should_not raise_error
    end

    def should_have_order_of(*items)
      items = items.flatten.map(&:reload)
      items.collect(&:id).should == items.sort_by(&:position).reverse.collect(&:id)
    end

    it "takes array of image ids and update image positions according to them" do
      @image_1 = Factory(:image)
      @image_2 = Factory(:image)
      @image_3 = Factory(:image)
      @image_4 = Factory(:image)

      should_have_order_of @image_4, @image_3, @image_2, @image_1

      images = [@image_2, @image_4, @image_1, @image_3]

      Image.change_order_of images.collect(&:id)

      should_have_order_of images
    end
  end
end
