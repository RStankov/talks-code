Factory.define :image do |object|
  include ActionDispatch::TestProcess

  object.file { fixture_file_upload("spec/fixtures/image.jpg", "image/jpeg") }
end