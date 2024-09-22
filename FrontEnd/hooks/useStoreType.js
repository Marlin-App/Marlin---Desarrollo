import { useState, useEffect} from 'react';

const useStoreType = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [allStores, setAllStores] = useState([]);

    const getStoreCat = async () => {
        try {
            const response1 = await fetch('https://marlin-backend.vercel.app/api/storeTypes/');
            const data1 = await response1.json();
            const formattedData1 = [
                {
                    title: 'Categorías',
                    data: data1.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                }
            ];
            setAllCategories(formattedData1);

            const response2 = await fetch("https://marlin-backend.vercel.app/api/stores/");
            const data2 = await response2.json();
            setAllStores(data2);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    useEffect(() => {
        getStoreCat();
    }, []);
    return {allCategories, allStores};
};

export default useStoreType;
