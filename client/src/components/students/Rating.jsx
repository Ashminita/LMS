import React from 'react'
import { useState, useEffect } from 'react'

const Rating = ({ initialRating, onRate }) => {

  const [rating, setRating] = useState(initialRating || 0)

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value)
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating)
    }
  }, [initialRating])

  return (
    <div className="flex gap-1 text-xl cursor-pointer select-none">
  {Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <span
        key={index}
        className={`transition-colors duration-200 ${
          starValue <= rating ? 'text-[#f1c40f]' : 'text-[#cfd9e4]'
        } hover:text-[#f1c40f]`}
        onClick={() => handleRating(starValue)}
      >
        &#9733;
      </span>
    );
  })}
</div>

  )
}

export default Rating
