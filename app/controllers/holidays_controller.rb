class HolidaysController < ApplicationController
	protect_from_forgery with: :exception
	respond_to :json

	def index
		# logger.debug Holiday.all
		respond_with  Holiday.all 
	end

	def create 
		respond_with Holiday.create(holiday_params)
	end

	def show 
		respond_with Holiday.find(params([:id]))
	end

	def destroy
		respond_with Holiday.destroy(params[:id])
	end



	private 
	def holiday_params 
		params.require(:holiday).permit(:country_id, :holiday_date, :description)
	end


end

