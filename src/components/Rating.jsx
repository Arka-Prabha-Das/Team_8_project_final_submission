import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from "react-toastify";


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
export default Rating;
