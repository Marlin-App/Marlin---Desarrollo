import { useState } from "react";

const useCRUDDelivery = () => {
    const [esRepartidor, setEsRepartidor] = useState([]);
    const [idRepartidor, setIdRepartidor] = useState(null);

    // Verificar si el usuario es repartidor
    const isDelivery = async (userId) => {
        console.log("userId", userId);
        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/delivery-profiles/?user_id=${userId}`, {
                method: 'GET'
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error de respuesta:", errorData);
                return;
            }
            const deliver = await response.json();
            setEsRepartidor(deliver[0].status);
            setIdRepartidor(deliver[0].id);

        } catch (err) {
            console.log("Error al realizar la consulta", err);
        }
    };
    // ------------------------------------------------------------------------

    return { isDelivery, esRepartidor, idRepartidor };
};
export default useCRUDDelivery;