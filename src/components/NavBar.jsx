import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaRegHeart } from 'react-icons/fa';
import { HiOutlineHeart } from 'react-icons/hi';


const NavBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { resetContextData } = useContext(ShopContext);

  const {
    setShowSearch,
    getWishlistCount,
    getCartCount,
    setCartItems,
    setWishlistItems,
  } = useContext(ShopContext);

  // Check if user is logged in by token presence
  const isLoggedIn = !!sessionStorage.getItem('token') || !!localStorage.getItem('token');

  const handleLogout = () => {
    resetContextData();
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    setCartItems({});
    setWishlistItems({});
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlistItems');

    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="Trendify" />
      </Link>

      <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/collection'>COLLECTION</NavLink>
        <NavLink to='/about'>ABOUT</NavLink>
        <NavLink to='/contact'>CONTACT</NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />

        {/* <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth="0.8"
  className="w-6 h-6 text-gray-600"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.6 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.6 16 21 16 21H12Z" />
</svg> */}


        <Link to='/wishlist' className='relative'>
          {/* <FaRegHeart className='text-[26px] text-gray-600' /> */}
          <HiOutlineHeart className='text-[29px] text-gray-600' />
          {getWishlistCount() > 0 && (
            <span className='absolute bottom-0 left-4 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center'>
              {getWishlistCount()}
            </span>
          )}
        </Link>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="Cart" />
          {getCartCount() > 0 && (
            <span className='absolute -bottom-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center'>
              {getCartCount()}
            </span>
          )}
        </Link>

     
          <div className='relative group'>
            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
            <div className='absolute right-0 hidden pt-4 group-hover:block'>
            { isLoggedIn &&
              <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                <p className='cursor-pointer hover:text-black' onClick={() => navigate('/profile')}>My Profile</p>
                <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
              </div>
            }
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default NavBar;
