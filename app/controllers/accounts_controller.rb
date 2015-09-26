class AccountsController < ApplicationController
	protect_from_forgery with: :exception
	respond_to :json

	def index 
		respond_with  Account.all 
	end

	def destroy
		respond_with Account.destroy(params[:id])
	end

	def create 
		respond_with Account.create(account_params)
	end

	def show 
		respond_with Account.find(params([:id]))
	end

	def update
		acct  = Account.find(params([:id]))
		acct.update!(account_params)  
    end

	private 
	def account_params 
		params.require(:account).permit(:name)
	end
	# def get_team 
	# 	@team = Team.find(params([:id]))
	# 	render json: {status: :not_found} unless @team
	# end
end

