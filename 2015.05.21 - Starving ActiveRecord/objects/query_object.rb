module ProductRanking
  def initialize(scope = Product)
    @scope = Product
  end

  def all
    query
  end


  def paginage(page, per_page: 10)
    query.paginage page: page, per_page: per_page
  end

  def find_each(&block)
    query.find_each(&block)
  end

  private

  def query
    # really nasty SQL SELECT
  end
end

products = ProductRanking.new.paginate params[:page]
products = ProductRanking.new(Product.visible).paginate params[:page]


# https://github.com/rstankov/SearchObject

class PostSearch
  include SearchObject.module

  # Use .all (Rails4) or .scoped (Rails3) for ActiveRecord objects
  scope { Post.all }

  option(:name)             { |scope, value| scope.where name: value }
  option(:created_at)       { |scope, dates| scope.created_after dates }
  option(:published, false) { |scope, value| value ? scope.unopened : scope.opened }
end


search = PostSearch.new filters: params[:filters]

# accessing search options
search.name                        # => name option
search.created_at                  # => created at option

# accessing results
search.count                       # => number of found results
search.results?                    # => is there any results found
search.results                     # => found results

# params for url generations
search.params                      # => option values
search.params opened: false        # => overwrites the 'opened' option
