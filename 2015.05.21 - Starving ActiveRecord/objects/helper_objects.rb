module TourHelper
  def with_tour
    yeild ShowTour.new(self)
  end

  class ShowTour
    def initialize(context)
      @context         = context
      @just_registered = context.session.delete(:show_tour)
    end

    def show?
      @just_registered || @context.cookies[:hide_tour].blank?
    end

    def scene
      @just_registered ? 5 : 1
    end

    def show_hi_user?
      @just_registered
    end

    def max_scene
      @context.logged_in?  5 : 6
    end

    def link
      text = show? ? 'Hide tour' : 'Show tour'
      @context.link_to text, '#', class: 'focus js-toggle-tour'
    end
  end
end
