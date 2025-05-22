import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState({});

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

  const resetWishlist = () => {
    setWishlistItems({});
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        getWishlistCount,
        addToWishlist,
        removeFromWishlist,
        resetWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider
