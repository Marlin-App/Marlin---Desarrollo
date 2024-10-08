import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCart = () => {
  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    calcularTotal();
  }, [cart]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@cart');
        if (jsonValue != null) {
          setCart(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error al cargar el carrito:', e);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        const jsonValue = JSON.stringify(cart);
        await AsyncStorage.setItem('@cart', jsonValue);
      } catch (e) {
        console.error('Error al guardar el carrito:', e);
      }
    };

    if (cart.length > 0) {
      saveCart();
    }
  }, [cart]);

  const addToCart = (product) => {
    console.log(product.cantidad);
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: product.cantidad  }];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.cantidad > 0 ? { ...item, cantidad: item.cantidad - 1 } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };


  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('@cart');
      setCart([]);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  };

  const calcularTotal = () => {
    const totalAmount = cart.reduce((total, item) => total + item.cantidad * item.price.replace(/[^0-9.]/g, ''), 0);
    setTotal(totalAmount);
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    total,
  };
};

export default useCart;
