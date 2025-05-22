import React, { useContext } from "react";

import Title from "../components/Title"; 
import { assets } from "../assets/assets"; 

import { use } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
const Wishlist = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const {products,currency}=useContext(CartContext);

  // Filtering products that are present in the wishlistItems object
  const wishlistData = products.filter((product) => wishlistItems[product._id]);

  // Toggle function to add/remove items from wishlist
  const toggleWishlist = (itemId) => {
    if (wishlistItems[itemId]) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist(itemId);
    }
  };

  return (
    <div className="border-t pt-14 px-4">
      <div className="mb-6 text-2xl font-semibold">
        <Title text1="YOUR" text2="WISHLIST" />
      </div>
      {wishlistData.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6">
          {wishlistData.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-4">
              <img className="w-24 h-24 object-cover" src={item.image[0]} alt={item.name} />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {currency}&nbsp;
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                alt="Remove"
                className="w-5 h-5 cursor-pointer"
                onClick={() => toggleWishlist(item._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
