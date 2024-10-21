import { useState, useEffect } from 'react';

const useItems  = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://marlin-backend.vercel.app/api/tinyItems/");
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

  const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const refetch = async () => {
  
  try {
    const response = await fetch("https://marlin-backend.vercel.app/api/storeItems/");
    const json = await response.json();
    const shuffledData = shuffleArray(json);  // Mezcla los items
    setData(shuffledData);
  } catch (err) {
    setError(err);
  } finally {
    
  }
};

  return { data, loading, error, refetch };
};

export default useItems; 
