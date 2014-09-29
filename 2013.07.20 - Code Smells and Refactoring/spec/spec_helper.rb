ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'

RSpec.configure do |config|
  config.color_enabled = true
  config.include FactoryGirl::Syntax::Methods
end

