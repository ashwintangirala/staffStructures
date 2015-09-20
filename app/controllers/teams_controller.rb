class TeamsController < ApplicationController
	protect_from_forgery with: :exception

	respond_to :json

	def index 
		respond_with  Team.all 
	end

	def destroy
		respond_with Team.destroy(params[:id])
	end

	def create 
		respond_with Team.create(team_params)
	end

	def show 
		respond_with Team.find(params([:id]))
	end

	def update
		team  = Team.find(params([:id]))
		team.update!(team_params)  
    end

	private 
	def team_params 
		params.require(:team).permit(:name)
	end
	# def get_team 
	# 	@team = Team.find(params([:id]))
	# 	render json: {status: :not_found} unless @team
	# end

end
