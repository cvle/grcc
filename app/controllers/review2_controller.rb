class Review2Controller < ApplicationController
  def index
    @reviews = Review.all
    @rating = @reviews.inject(0.0) { |sum, el| sum + el.rating } / @reviews.size
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      ActionCable.server.broadcast "reviews_channel", @review
      self.index
      render :index
    else
      self.index
      # TODO: Should go to error page.
      render :index
    end
  end
  private
    def review_params
      params.require(:review).permit(:rating, :body)
    end
end
