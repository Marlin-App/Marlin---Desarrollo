import { useState, useEffect } from 'react';

const useOrders  = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://marlin-backend.vercel.app/api/orders/");
        console.log(response);
        const json = await response.json();
        setOrders(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  return { orders, loading, error };
};

export default useOrders; 