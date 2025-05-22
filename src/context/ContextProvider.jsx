import React from "react";
import CartProvider from "./CartContext";
import WishlistProvider from "./WishlistContext";
import ReviewProvider from "./ReviewContext";
import SearchProvider from "./SearchContext";
import NavigationProvider from "./NavigationContext";

const ContextProvider = ({ children }) => {
  return (
    <NavigationProvider>
      <SearchProvider>
        <ReviewProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </ReviewProvider>
      </SearchProvider>
    </NavigationProvider>
  );
};

export default ContextProvider;
