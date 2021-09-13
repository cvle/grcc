class ReviewController < ApplicationController
  def index
    @reviews = Review.all.reverse
    if @reviews.size > 0
      @rating = @reviews.inject(0.0) { |sum, el| sum + el.rating } / @reviews.size
    else
      @rating = 0
    end
  end

  def create
    @review = Review.new(review_params)
    if @review.save
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
