Rails.application.routes.draw do
  root 'employees#index'
  get 'employees/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
