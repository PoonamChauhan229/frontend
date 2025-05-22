// src/context/ShopContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [wishlistItems, setWishlistItems] = useState({});
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
    if (storedWishlistItems) {
      setWishlistItems(storedWishlistItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const getWishlistCount = () => Object.keys(wishlistItems).length;

  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: true }));
  };

  const removeFromWishlist = (itemId) => {
    const updated = { ...wishlistItems };
    delete updated[itemId];
    setWishlistItems(updated);
  };

  const resetContextData = () => {
    setWishlistItems({});
  };

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review],
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        search,
        setSearch,
        showSearch,
        setShowSearch,
        wishlistItems,
        setWishlistItems,
        getWishlistCount,
        addToWishlist,
        removeFromWishlist,
        navigate,
        resetContextData,
        reviews,
        addReview,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
