import { useState, useEffect } from "react";

const useStoreItem = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/storeItems/?store_id=${id}`);
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        };
    
        fetchData();
    }, [id]);
    
    return { data, loading };
    }

    export default useStoreItem; 