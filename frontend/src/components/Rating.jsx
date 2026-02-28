import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const Rating = ({
  value = 0,
  disabled = false,
  showValue = true,
  onRatingChange,
}) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (star) => {
    if (disabled) return;
    setRating(star);
    onRatingChange?.(star);
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = hover ? star <= hover : star <= rating;
          return (
            <Star
              key={star}
              size={18}
              className={`
            transition-all duration-200 ${filled ? "fill-amber-400 text-amber-400" : "text-gray-300"}
            ${disabled ? "cursor-default" : "cursor-pointer hover:scale-125"}
            `}
              onMouseEnter={() => !disabled && setHover(star)}
              onMouseLeave={() => !disabled && setHover(0)}
              onClick={() => handleClick(star)}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-gray-500">{rating}/5</span>
      )}
    </div>
  );
};

export default Rating;
