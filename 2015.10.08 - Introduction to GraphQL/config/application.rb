require File.expand_path('../boot', __FILE__)

require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "sprockets/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GraphqlRubyDemo
  class Application < Rails::Application
    config.autoload_paths << Rails.root.join('app', 'graph', 'types')
    config.autoload_paths << Rails.root.join('app', 'graph', 'fields')

    config.active_record.raise_in_transactional_callbacks = true
  end
end
