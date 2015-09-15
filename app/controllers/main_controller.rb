class MainController < ApplicationController
  protect_from_forgery with: :exception

  respond_to :json

  def index
  end

end