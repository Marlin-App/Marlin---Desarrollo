import { useState, useEffect } from 'react';
import useCRUDTiendas from './useCRUDTiendas';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Cambié el estado inicial a `false`
  const [error, setError] = useState(null);
  const [storesLoaded, setStoresLoaded] = useState(false); // Controla si las tiendas ya se cargaron
  const { allStores, getUserStores } = useCRUDTiendas({});

  // Cargar tiendas
  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        await getUserStores();
        setStoresLoaded(true); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchStores();
  }, []); 

  // Cargar las órdenes después de que las tiendas estén disponibles
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Fetching orders...");
      if (!storesLoaded || !allStores || allStores.length === 0) return;

      setLoading(true);
      try {
        const fetchPromises = allStores.map((store) =>
          fetch(`https://marlin-backend.vercel.app/api/orders/?store_id=${store.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error fetching store ${store.id}: ${response.statusText}`);
              }
              return response.json();
            })
            .catch((err) => {
              setError((prevError) => [...(prevError || []), err]);
              return [];
            })
        );

        const ordersResults = await Promise.all(fetchPromises);
        setOrders(ordersResults.flat());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [storesLoaded, allStores]); 

  return { orders, loading, error, setStoresLoaded };
};

export default useOrders;
