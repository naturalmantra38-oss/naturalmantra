import React, { createContext, useContext, useState, useEffect } from 'react';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_FEE } from '../config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('nm_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('nm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    const variantName = selectedVariant ? selectedVariant.name : (product.variants?.[0]?.name || 'Standard');
    const unitPrice = selectedVariant ? selectedVariant.price : product.price;

    setCartItems((prevItems) => {
      const itemKey = `${product._id}_${variantName}`;
      const existingIndex = prevItems.findIndex((item) => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            itemKey,
            product,
            productId: product._id,
            name: product.name,
            image: product.images?.[0] || product.image,
            variant: variantName,
            price: unitPrice,
            mrp: selectedVariant ? selectedVariant.mrp : product.mrp,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${variantName}) to cart!`);
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || cartItems.length === 0;
  const shippingFee = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : DEFAULT_SHIPPING_FEE);
  const grandTotal = subtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItemsCount,
        isFreeShipping,
        shippingFee,
        grandTotal,
        amountNeededForFreeShipping,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
