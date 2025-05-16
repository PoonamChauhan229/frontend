// components/OrderSuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react'; // Or use any checkmark icon
import { Button } from '@/components/ui/button'; // Replace with your button if needed

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2 mb-6">Thank you for your purchase. You’ll receive a confirmation shortly.</p>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
