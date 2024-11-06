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
      /*   await clearCart(); */
        const jsonValue = await AsyncStorage.getItem('@cart');
        if (jsonValue != null) {
          setCart(JSON.parse(jsonValue));
          console.log(cart);
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
    const imageUrl = product.item_images && product.item_images.length > 0 ? product.item_images[0].picture : null;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id && item.color === product.color && item.size === product.size);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.color === product.color && item.size === product.size 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, cantidad: product.cantidad, picture: imageUrl, color: product.color, size: product.size }];
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

  const removeFromCart = async (productId, color, size) => {
    if(cart.length==1){
      await clearCart();
      return;
    }
      setCart((prevCart) => 
      prevCart.filter((item) => 
        !(item.id === productId && item.color === color && item.size === size)
      )
    );

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

  const isSameStore = (store_id) => {
    if (cart.length === 0) {
      return true;
    }
    return cart[0].store_id === store_id;
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    isSameStore,
    total,
  };
};

export default useCart;