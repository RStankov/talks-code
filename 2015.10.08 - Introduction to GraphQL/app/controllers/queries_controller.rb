class QueriesController < ApplicationController
  layout false

  def new
  end

  def create
    render json: MainSchema.execute(params[:query], variables: params[:variables] || {})
  end
end
