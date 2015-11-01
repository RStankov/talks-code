Rails.application.routes.draw do
  resources :queries, only: %i(create)

  root to: 'queries#new'
end
