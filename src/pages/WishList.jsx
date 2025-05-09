import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title"; // Optional: You can use a <h2> if this isn't available
import { assets } from "../assets/assets"; // bin icon path

const Wishlist = () => {
  const { products, wishlistItems, addToWishlist, removeFromWishlist, currency } = useContext(ShopContext);

  // Filtering products that are present in the wishlistItems object
  const wishlistData = products.filter((product) => wishlistItems[product._id]);

  // Toggle function to add/remove items from wishlist
  const toggleWishlist = (itemId) => {
    if (wishlistItems[itemId]) {
      removeFromWishlist(itemId); // If the item is already in the wishlist, remove it
    } else {
      addToWishlist(itemId); // If the item is not in the wishlist, add it
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
