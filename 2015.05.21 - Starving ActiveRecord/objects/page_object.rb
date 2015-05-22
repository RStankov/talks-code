def show
  @news = News.find params[:id]
  @comments = @news.comments.page(params[:page])
  @ads = Adverntisment.for(current_user, @news)
  @related_news = @news.related_news
end


class NewsShowPage
  attr_reader :news

  def initialize(news, current_user, params)
    @news   = news
    @user   = current_user
    @params = params
  end

  def comments
    @comments ||= news.comments.page(@params[:page])
  end

  def ads
   @ads ||= Adverntisment.for(@user, news)
  end

  def related_news
    @related_news ||= news.related_news
  end
end


# BONUS

class NewsShowPage
  def cache_key
    # ... mighm
  end

  def to_json

  end
end
