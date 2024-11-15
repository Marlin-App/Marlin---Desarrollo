import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Función para calcular el total
  useEffect(() => {
    calculateTotal();
  }, [cart]);
  // ------------------------------------------------------------------------

  // Función para cargar el carrito
  useEffect(() => {
    const loadCart = async () => {
      try {
        /*   await clearCart(); */
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
  // ------------------------------------------------------------------------

  // Función para guardar el carrito
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
  // ------------------------------------------------------------------------

  // Función para agregar un producto al carrito
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
  // ------------------------------------------------------------------------

  // Funciones para aumentar la cantidad
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };
  // ------------------------------------------------------------------------

  // Funciones para disminuir la cantidad
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.cantidad > 0 ? { ...item, cantidad: item.cantidad - 1 } : item
      )
    );
  };
  // ------------------------------------------------------------------------

  // Función para eliminar un producto del carrito
  const removeFromCart = async (productId, color, size) => {
    if (cart.length == 1) {
      await clearCart();
      return;
    }
    setCart((prevCart) =>
      prevCart.filter((item) =>
        !(item.id === productId && item.color === color && item.size === size)
      )
    );

  };
  // ------------------------------------------------------------------------

  // Función para limpiar el carrito
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('@cart');
      setCart([]);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  };
  // ------------------------------------------------------------------------

  // Función que hace el cálculo del total
  const calculateTotal = () => {
    const totalAmount = cart.reduce((total, item) => total + item.cantidad * item.price.replace(/[^0-9.]/g, ''), 0);
    setTotal(totalAmount);
  };
  // ------------------------------------------------------------------------

  // Función para verificar si el carrito pertenece a la misma tienda
  const isSameStore = (store_id) => {
    if (cart.length === 0) {
      return true;
    }
    console.log(cart[0].store_id);
    console.log(store_id);
    return cart[0].store_id == store_id;
  };
  // ------------------------------------------------------------------------

  // Función para obtener la longitud del carrito
  function getCarLength() {
    return cart.length;
  }
  // ------------------------------------------------------------------------

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    isSameStore,
    getCarLength,
    total,
  };
};

export default useCart;