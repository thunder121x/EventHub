import React from "react";
import starIcon from "../assets/star.png"; // replace with actual icon path
import halfStarIcon from "../assets/half-star.png"; // replace with actual icon path

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <img key={i} src={starIcon} alt="Star" className="icon" />
      ))}
      {halfStar && <img src={halfStarIcon} alt="Half Star" className="icon" />}
    </div>
  );
};

export default StarRating;
