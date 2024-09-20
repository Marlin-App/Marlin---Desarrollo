import { useState, useEffect} from 'react';

const useStoreType = () => {
    const [allCategories, setCategories] = useState([]);
    const [allStores, setStores] = useState([]);

    const getStoreCat = async () => {
        try {
            const response1 = await fetch('http://127.0.0.1:8000/api/storeTypes/');
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
            setCategories(formattedData1);

            const response2 = await fetch("http://127.0.0.1:8000/api/stores/");
            const data2 = await response2.json();
            const formattedData2 = data2.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                picture: item.picture,
                type: item.store_type,
            }));
            setStores(formattedData2);
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
