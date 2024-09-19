import { useState, useEffect} from 'react';

const useStoreType = () => {
    const [categories, setCategories] = useState([]);

    const getStoreCat = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/storeTypes/');
            const data = await response.json();
            const formattedData = [
                {
                    title: 'Categorías',
                    data: data.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                }
            ];
            setCategories(formattedData);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    useEffect(() => {
        getStoreCat();
    }, [setCategories]);
    return {categories};
};

export default useStoreType;
