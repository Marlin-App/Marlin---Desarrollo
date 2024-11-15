import { useState, useEffect } from 'react';
import useCRUDTiendas from './useCRUDTiendas';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allStores, getUserStores } = useCRUDTiendas({});

  // funcion que obtiene las ordenes
  useEffect(() => {
    const fetchOrdersByStore = async () => {
      setLoading(true);
      try {
        await getUserStores();
        if (!allStores || allStores.length === 0) return;

        const fetchPromises = allStores.map((store) =>
          fetch(`https://marlin-backend.vercel.app/api/orders/?store_id=${store.id}`)
            .then(response => response.json())
            .catch(err => {
              setError(err);
              return [];
            })
        );

        const ordersResults = await Promise.all(fetchPromises);
        const allOrders = ordersResults.flat();
        setOrders(allOrders);
      }
      catch (err) {
        setError(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchOrdersByStore();
  }, [allStores]);
  // ------------------------------------------------------------------------

  return { orders, loading, error };
};

export default useOrders; 