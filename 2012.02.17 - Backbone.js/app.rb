require 'bundler'

Bundler.require

ROOT_PATH = File.dirname(__FILE__)

class SlimTemplate
  def initialize(root_path)
    @trail = Hike::Trail.new root_path
    @trail.append_path 'views'
  end

  def call(env)
    template = find_template(env['REQUEST_URI'])
    if template.nil?
      [404, {'Content-Type' => 'text/html'}, 'File not found']
    else
      [200, {'Content-Type' => 'text/html'}, Tilt.new(template).render]
    end
  end

  private

  def find_template(path)
    @trail.find "#{path == '/' ? 'index' : path}.slim"
  end
end

class AssetPipeline < Sprockets::Environment
  def initialize(root_path)
    super(root_path)

    self.cache = false
    self.append_path 'assets/javascripts'
    self.append_path 'assets/stylesheets'
    self.append_path 'assets/images'
    self.append_path "#{Gem.loaded_specs['compass'].full_gem_path}/frameworks/compass/stylesheets"
  end
end

Sass::Engine::DEFAULT_OPTIONS[:load_paths].tap do |load_paths|
  load_paths << "#{ROOT_PATH}/assets/stylesheets"
  load_paths << "#{Gem.loaded_specs['compass'].full_gem_path}/frameworks/compass/stylesheets"
end

builder = Rack::Builder.new do
  use Rack::CommonLogger

  map('/assets') { run AssetPipeline.new(ROOT_PATH) }
  map('/')       { run SlimTemplate.new(ROOT_PATH)  }
end

Rack::Handler::Mongrel.run builder, :Port => 3000

