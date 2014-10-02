OpenFestDemo::Application.routes.draw do
  resources :images, :only => [:index, :show, :create, :destroy] do
    collection do
      put :reorder
    end
  end

  root :to => "images#index"
end
