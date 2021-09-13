import React, { useState } from "react";

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }) => {
  return (
    <svg className="reviewIcon">
      <use xlinkHref={`#stars-${Math.round(rating)}-0-star`} />
    </svg>
  );
};

export default StarRating;
