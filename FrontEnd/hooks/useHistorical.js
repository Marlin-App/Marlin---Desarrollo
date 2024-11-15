import { useEffect, useState } from 'react';

export const useHistorical = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // funcion que obtiene las ordenes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://marlin-backend.vercel.app/api/orders/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  // ------------------------------------------------------------------------

  return { orders, loading, error };
};