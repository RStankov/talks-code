class ArticlePresenter
  attr_reader :article

  delegate :title, :headline, to: :article

  def initialize(article)
    @article = article
  end

  def publication_status
    if published?
      "Published at #{published_at}"
    else
      "Unpublished"
    end
  end

  def content
    BodyFormat.call(article.content)
  end

  private

  def published_at
    article.published_at.strftime("%A, %B %e")
  end
end

class ArticleDecoartor
  attr_reader :article, :view

  delegate :title, :headline, to: :article

  def initialize(article, view)
    @article = article
    @view    = view
  end

  def publication_status
    if published?
      "Published at #{published_at}"
    else
      "Unpublished"
    end
  end

  def content
    BodyFormat.call(article.content)
  end

  def publication_status_tag
    @view.content_tag :span, class: 'article-status', publication_status
  end

  def headline_tag
    @view.content_tag :h1, title
  end

  def render_comments
    @view.render 'comments/list', comments: article.comments
  end

  private

  def published_at
    article.published_at.strftime("%A, %B %e")
  end
end

# /apps/helpers/decorate_helper.rb

module DecorateHelper
  def decorate_article(article)
    yield ArticleDecoartor.new(article, self)
  end
end


<%= decorate_article @article do |article| %>
  <%= article.headline_tag %>
  <%= article.status_tag %>
  <%= article.cotnent_tag %>
  <%= article.render_comments %>
<% end %>


# https://github.com/drapergem/draper

class ArticleDecorator < Draper::Decorator
  delegate_all

  def publication_status
    if published?
      "Published at #{published_at}"
    else
      "Unpublished"
    end
  end

  private

  def published_at
    object.published_at.strftime("%A, %B %e")
  end
end
