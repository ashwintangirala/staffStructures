class CommentsController < ApplicationController

	protect_from_forgery with: :exception

    respond_to :json

	def create 
		post = post.find(params[:post_id]) 
		comment = post.comments.create(comment_params)

		respond_with post, comment 
	end

	def upvote 
		post = Post.find(params[:post_Id])
		comment = post.comments.find(params[:id])
		comment.increment!(:upvotes)

		respond_with post, comment 
	end

	private

	def comment_params 
		params.require(:comment).permit(:body)
	end

end

