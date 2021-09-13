import React, { useState } from "react";

interface Props {
  variant: "full" | "half" | "empty";
  onClick?: React.MouseEventHandler;
}

const StarRating: React.FC<Props> = ({ variant, onClick }) => {
  let xlinkHref: string;
  switch (variant) {
    case "half":
      xlinkHref = "#stars-filled-half-star";
      break;
    case "full":
      xlinkHref = "#stars-filled-full-star";
      break;
    default:
      xlinkHref = "#stars-empty-full-star";
  }
  return (
    <svg className="modalIcon" onClick={onClick}>
      <use xlinkHref={xlinkHref} />
    </svg>
  );
};

export default StarRating;
