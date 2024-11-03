import { useEffect, useState } from "react";

const useCRUDDelivery = () => {

    const [esRepartidor, setEsRepartidor]=useState([]);

  const isDelivery = async (userId) => {

    try {

      const response = await fetch(`https:marlin-backend.vercel.app/api/delivery-profiles/?user_id=${userId}/`, {
        method: 'GET'
    });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error de respuesta:", errorData);
        return;
      }
      const deliver = await response.json();
      setEsRepartidor(deliver);//pendiente de revisar tambien T.T

      

    } catch (err) {
      console.log("Error al realizar la consulta", err);
    }
  };

  return { isDelivery, esRepartidor };
};
export default useCRUDDelivery;
