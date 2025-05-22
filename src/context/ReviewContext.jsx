import React, { createContext, useState } from "react";

// Create the context
export const ReviewContext = createContext();

// Create the provider component
const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review],
    }));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider
