"use client";
import React from "react";

const StarRating = ({
  rating,
  onRatingChange = (star: number) => {},
  starSize = "w-6",
  filledStarColor = "text-yellow-500",
  emptyStarColor = "text-gray-400",
  halfStarColor = "text-yellow-500", // This color will be used for the filled part of the half star
  ratingTextColor = "text-gray-600",
}: {
  rating: number;
  onRatingChange?: (star: number) => void;
  starSize?: string;
  filledStarColor?: string;
  emptyStarColor?: string;
  halfStarColor?: string;
  ratingTextColor?: string;
}) => {
  const stars = [1, 2, 3, 4, 5];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      <div className="flex self-center">
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`focus:outline-none ${starSize}`}
          >
            {star <= filledStars ||
            (hasHalfStar && star === filledStars + 1) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  star <= filledStars ? filledStarColor : halfStarColor
                }`}
                fill="currentColor"
                viewBox="0 0 19 19"
              >
                {star <= filledStars ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.15327 2.34001L10.3266 4.68668C10.4866 5.01334 10.9133 5.32668 11.2733 5.38668L13.3999 5.74001C14.7599 5.96668 15.0799 6.95334 14.0999 7.92668L12.4466 9.58001C12.1666 9.86001 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.86001 3.55327 9.58001L1.89994 7.92668C0.926606 6.95334 1.23994 5.96668 2.59994 5.74001L4.72661 5.38668C5.07994 5.32668 5.50661 5.01334 5.66661 4.68668L6.83994 2.34001C7.47994 1.06668 8.51994 1.06668 9.15327 2.34001Z"
                  />
                ) : (
                  // Half Star SVG Path
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5V2.5z"
                  />
                )}
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={emptyStarColor}
                fill="none"
                viewBox="0 0 19 19"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.15327 2.34001L10.3266 4.68668C10.4866 5.01334 10.9133 5.32668 11.2733 5.38668L13.3999 5.74001C14.7599 5.96668 15.0799 6.95334 14.0999 7.92668L12.4466 9.58001C12.1666 9.86001 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.86001 3.55327 9.58001L1.89994 7.92668C0.926606 6.95334 1.23994 5.96668 2.59994 5.74001L4.72661 5.38668C5.07994 5.32668 5.50661 5.01334 5.66661 4.68668L6.83994 2.34001C7.47994 1.06668 8.51994 1.06668 9.15327 2.34001Z"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      <div className={`text-lg ${ratingTextColor} self-center`}>
        {rating.toFixed(1)}
      </div>
    </div>
  );
};

export default StarRating;
