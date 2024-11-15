import { useState, useEffect } from "react";

const useSelectedStoreType = (categoryId) => {
    const [stores, setStores] = useState([]);

    // Función para obtener las tiendas
    const getStores = async () => {
        try {
            const response = await fetch("https://marlin-backend.vercel.app/api/stores/");
            const data = await response.json();
            const filteredData = data.filter(item => item.store_type.includes(categoryId));
            const formattedData = filteredData.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                picture: item.picture,
                type: item.store_type,
            }));
            setStores(formattedData);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };
    // ------------------------------------------------------------------------

    // Obtiene las tiendas
    useEffect(() => {
        if (categoryId !== null) {
            getStores();
        }
    }, [categoryId]);
    // ------------------------------------------------------------------------

    return [stores];
};

export default useSelectedStoreType;
