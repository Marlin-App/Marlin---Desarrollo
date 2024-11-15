import { useState } from 'react';

const useStoreCordenates = () => {
    const [storeLatitude, setStoreLatitude] = useState(null);
    const [storeLongitude, setStoreLongitude] = useState(null);

    // Función para obtener las coordenadas de la tienda
    const getStoreCordenates = async (id) => {
        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/${id}/`);
            console.log(response);
            const json = await response.json();
            const coordinates = json.coodernates.split(',');
            setStoreLatitude(parseFloat(coordinates[0]));
            setStoreLongitude(parseFloat(coordinates[1]));
        } catch (err) {
            console.error('Error al obtener la tienda:', err);
            return null;
        }
    }
    // ------------------------------------------------------------------------

    return { getStoreCordenates, storeLatitude, storeLongitude };
};
export default useStoreCordenates;