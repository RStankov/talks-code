module Paperclip
  class Attachment
    def self.default_options
      @default_options ||= {
        :url               => '/system/:class/:id/:style.:extension',
        :path              => ":rails_root/public:url",
        :styles            => {},
        :processors        => [:thumbnail],
        :convert_options   => {},
        :default_url       => "/images/missing/:class/:attachment_:style.png",
        :default_style     => :original,
        :storage           => :filesystem,
        :whiny             => Paperclip.options[:whiny] || Paperclip.options[:whiny_thumbnails]
      }
    end
  end
end