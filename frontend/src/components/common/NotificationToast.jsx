import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle } from 'lucide-react';

const NotificationToast = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-brand-700 text-white px-5 py-3.5 rounded-lg shadow-2xl transition-all duration-300 animate-bounce">
      <CheckCircle className="w-5 h-5 text-brand-gold" />
      <span className="text-sm font-medium">{notification}</span>
    </div>
  );
};

export default NotificationToast;
