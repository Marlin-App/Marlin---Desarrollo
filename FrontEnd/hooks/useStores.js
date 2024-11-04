import { useState, useEffect } from 'react';

const useStores  = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://marlin-backend.vercel.app/api/stores/");
        console.log(response);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return { data, loading, error };
};

export default useStores; 