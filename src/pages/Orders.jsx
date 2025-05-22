import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import ReviewModal from '../components/ReviewModal';
import { CartContext } from '../context/cartContext';

const Orders = () => {
  const { products, currency } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct({ ...product });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="Product" />
              <div>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>{currency} {item.price.toFixed(2)}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>25 JUL 2024</span></p>
              </div>
            </div>
            <div className='flex justify-between md:w-1/2'>
              <div className='flex items-center gap-2'>
                <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                <p className='text-sm md:text-base'>Ready for Shipping</p>
              </div>
              <button onClick={() => openModal(item)} className='px-4 py-2 text-sm font-medium border rounded-sm'>RATE & REVIEW</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <ReviewModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default Orders;
