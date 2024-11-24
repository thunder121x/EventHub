import React from "react";
import starIcon from "../assets/star.png"; // replace with actual icon path
import halfStarIcon from "../assets/half-star.png"; // replace with actual icon path

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // จำนวนดาวเต็ม
  const halfStar = rating % 1 !== 0; // มีครึ่งดาวหรือไม่
  const totalStars = 5; // จำนวนดาวทั้งหมด

  return (
    <div className="flex items-center">
      {/* แสดงดาวทั้ง 5 ดวง */}
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          // แสดงดาวเต็ม
          return (
            <img
              key={`full-${i}`}
              src={starIcon}
              alt="Star"
              className="w-[30px] h-[25px]"
            />
          );
        } else if (i === fullStars && halfStar) {
          // แสดงครึ่งดาว
          return (
            <img
              key="half-star"
              src={halfStarIcon}
              alt="Half Star"
              className="w-[30px] h-[25px]"
            />
          );
        } else {
          // แสดงดาวจางโดยลด opacity
          return (
            <img
              key={`dim-${i}`}
              src={starIcon}
              alt="Dimmed Star"
              className="w-[30px] h-[25px] opacity-30" // ใช้ opacity-30 เพื่อจางลง
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
