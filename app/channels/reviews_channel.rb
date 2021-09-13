class ReviewsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "reviews_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    raise NotImplementedError
  end
end
