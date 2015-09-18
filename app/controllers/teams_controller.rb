class TeamsController < ApplicationController
	protect_from_forgery with: :exception
	respond_to :json

	def index 
		respond_with  Team.all 
	end

	def create 
		respond_with Team.create(team_params)
	end

	def show 
		respond_with Team.find(params([:id]))
	end

	private 
	def team_params 
		params.require(:team).permit(:name)
	end

end

