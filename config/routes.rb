Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "review#index"
  post "/", to: "review#create"
  get "/2.0/", to: "review2#index"
  post "/2.0/", to: "review2#create"

  mount ActionCable.server => "/cable"
end
