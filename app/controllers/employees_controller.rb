class EmployeesController < ApplicationController
	protect_from_forgery with: :exception

	respond_to :json

	def index 
		respond_with  Employee.all 
	end

	def create 
		respond_with Employee.create(post_params)
	end

	def show 
		respond_with Employee.find(params([:id]))
	end

	private 
	def employee_params 
		params.require(:employee).permit(:name)
	end

end
