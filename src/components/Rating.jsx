import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from "react-toastify";

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
  <span
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    className={`cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
  >
    ★
  </span>
);

const Rating = ({ data, setReview }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const submitReview = async () => {
    try {
      const reviewData = {
        stars: rating,
        content: comment,
        bid: data.id,
        carID: data.carID,
        cid: data.cid,
        name: "Test Customer"
      };
      
      await addDoc(collection(firestore, "reviews"), reviewData);
      setReview(reviewData);
      toast.success("Review added successfully");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to add review. Please try again later.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            filled={hoverRating > 0 ? index < hoverRating : index < rating}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index + 1)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows="4"
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500" onClick={submitReview}>
        Submit Review
      </button>
    </div>
  );
};

export default Rating;
