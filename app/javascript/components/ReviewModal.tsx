import React, { FormEvent, useCallback, useRef, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Star from "./Star";

export interface SuccessData {
  rating: string;
  body: string;
}

interface Props {
  /** authenticity token as required by rails for form data */
  authenticityToken: string;
  open: boolean;
  /** Called when formed was sent successfully with data. */
  onSuccess: (data: SuccessData) => void;
  /** Called when Modal should be closed. */
  onClose: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ReviewModal: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
  authenticityToken,
}) => {
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  const formRef = useRef<HTMLFormElement>();
  /** Ref to our hidden rating input */
  const ratingInputRef = useRef<HTMLInputElement>();

  /** Star click handler, that sets rating state and syncs it to the input value */
  const handleStarClick = useCallback(
    (event: React.MouseEvent, value: number) => {
      /** Actual value that we will dermine below */
      let actualValue: number;
      const clickTarget = (event.currentTarget as HTMLElement)
        .parentNode as HTMLElement;
      console.log(clickTarget.offsetWidth);
      const clickTargetWidth = clickTarget.offsetWidth;
      const xCoordInClickTarget =
        event.clientX - clickTarget.getBoundingClientRect().left;
      if (clickTargetWidth / 2 > xCoordInClickTarget) {
        // clicked left, so we only give 0.5 points instead of a full one.
        actualValue = value - 0.5;
      } else {
        // clicked right, give full value.
        actualValue = value;
      }

      setRating(actualValue);

      // Sync with form input.
      if (ratingInputRef.current) {
        ratingInputRef.current.value = actualValue.toString();
      }
    },
    []
  );

  /** Handle form submit */
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData(formRef.current);
    try {
      await fetch("", { method: "POST", body });
      onSuccess({
        rating: body.get("review[rating]").toString(),
        body: body.get("review[body]").toString(),
      });
      // Reset rating choice.
      setRating(0);
    } catch {
      setError("Apologies. An error occured while sending the data.");
    }
  }, []);

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="What's your rating?"
    >
      <form ref={formRef} onSubmit={handleSubmit}>
        <h1>What's your rating?</h1>
        <section>
          <h2>Rating</h2>
          <div id="modalIconContainer" className="modalIconContainer">
            {Array.from(Array(5).keys()).map((i) => {
              let variant: "full" | "empty" | "half" = "full";
              if (rating <= i) {
                variant = "empty";
              } else if(Math.trunc(rating) <= i && rating % 1 === 0.5) {
                variant = "half";
              }
              return (
                <div key={i}>
                  <Star
                    variant={variant}
                    onClick={(e) => {
                      handleStarClick(e, i + 1);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <input
            ref={ratingInputRef}
            className="reviewRatingInput"
            type="text"
            name="review[rating]"
            id="reviewRatingInput"
            required
          />
        </section>
        <section>
          <h2>Review</h2>
          <textarea
            name="review[body]"
            className="reviewBodyInput"
            placeholder="Start typing..."
            required
          ></textarea>
        </section>
        <div>{error}</div>
        <div>
          <input
            type="hidden"
            name="authenticity_token"
            value={authenticityToken}
          />
          <Button type="submit">Submit review</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewModal;
