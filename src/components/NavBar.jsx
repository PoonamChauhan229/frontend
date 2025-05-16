import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaRegHeart } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    wishlistItems,
    getWishlistCount,
    getCartCount
  } = useContext(ShopContext);

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

        <div className='relative group'>
          <Link to='/login'>
            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
          </Link>
          <div className='absolute right-0 hidden pt-4 group-hover:block'>
            <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
              <p className='cursor-pointer hover:text-black' onClick={() => navigate('/profile')}>Profile</p>
              <p className='cursor-pointer hover:text-black'
              onClick={() => navigate('/orders')}
              >Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to='/wishlist' className='relative'>
          <FaRegHeart className='w-7' style={{ color: 'grey', fontSize: '230%' }} />
          <p className='absolute right-[-2px] bottom-[2px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getWishlistCount()}
          </p>
        </Link>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* Mobile Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
