class Image < ActiveRecord::Base
  attr_accessible :file

  has_attached_file :file,  :styles => { :thumb => "125x125", :big => "800x600" }, :default_style => :thumb

  validates_attachment_presence :file
  validates_attachment_content_type :file, :content_type => ["image/jpeg", "image/jpg", "image/png", "image/gif"]

  acts_as_list

  def self.change_order_of(ids)
    if ids.is_a? Array
      position = ids.size
      ids.each { |id| find(id).update_attribute("position", position -= 1) }
    end
  end
end
