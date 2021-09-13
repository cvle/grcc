import React, { useCallback, useState } from "react";
import ReviewModal, { SuccessData } from "./ReviewModal";
import StarRating from "./StarRating";
import { ActionCableProvider, ActionCableConsumer } from "react-actioncable-provider";
import Button from "./Button";


type ReviewsData = Array<{
  rating: string;
  body: string;
}>;

interface Props {
  /** authenticity token as required by rails for form data */
  authenticityToken: string;
  rating: string;
  reviews: ReviewsData;
}

const Review: React.FC<Props> = ({ rating, reviews, authenticityToken }) => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>(reviews);

  // Modal handlers
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  const handleCreateReviewSuccess = useCallback((newReview: SuccessData) => {
    setModalOpen(false);
    // No need to add newReview, because it comes through the websocket connection.
  }, []);

  // Handle live data through websocket connection.
  const handleReceivedCreateReview = useCallback((data) => {
    setReviewsData((oldData) => [data, ...oldData]);
  }, []);

  const ratingNumber = Number.parseFloat(rating);

  return (
    <ActionCableProvider url={`ws://${location.host}/cable`}>
      <ActionCableConsumer
        channel="ReviewsChannel"
        onReceived={handleReceivedCreateReview}
      />
      <ReviewModal
        onSuccess={handleCreateReviewSuccess}
        authenticityToken={authenticityToken}
        open={isModalOpen}
        onClose={closeModal}
      />
      <div>
        <h1>The Minimalist Entrepreneur</h1>
        <div>
          <div className="ratingContainer">
            <div className="ratingNumber">{ratingNumber.toFixed(1)}</div>
            <div className="iconContainer">
              <StarRating rating={ratingNumber} />
            </div>
            <div>
              <Button onClick={openModal}>
                Add review
              </Button>
            </div>
          </div>
          <hr className="separator" />
          <div>
            <h2>Reviews</h2>
            {reviewsData.map((review, i) => {
              const reviewRatingNumber = Number.parseFloat(review.rating);
              return (
                <div className="reviewContainer" key={i}>
                  <div>
                    <StarRating rating={reviewRatingNumber} />
                  </div>
                  <div className="reviewRating">
                    {reviewRatingNumber.toFixed(1)}
                  </div>
                  <div className="reviewContent">, {review.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ActionCableProvider>
  );
};

export default Review;
