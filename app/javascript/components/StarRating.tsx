import React from "react";

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }) => {
  const roundToHalfpoints = Math.round(rating * 2)/2;
  const fullInteger = Math.trunc(roundToHalfpoints);
  const rest = Math.trunc((roundToHalfpoints % 1 * 10));
  return (
    <svg className="reviewIcon">
      <use xlinkHref={`#stars-${fullInteger}-${rest}-star`} />
    </svg>
  );
};

export default StarRating;
