import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDirections = (navigation) =>{
    const [direction, setDirections]= useState([]);
    
    useEffect(()=>{
        const loadDirections = async () => {
            try {
             /* await AsyncStorage.removeItem('@Directions'); */
              const jsonValue = await AsyncStorage.getItem('@Directions');
              if (jsonValue != null) {
                setDirections(JSON.parse(jsonValue));
              }
             
            } catch (e) {
              console.error('Error al cargar :', e);
            }
          };
          loadDirections();

    }, [])

    const reLoadDirections = async () => {
      try {
       
        const jsonValue = await AsyncStorage.getItem('@Directions');
        if (jsonValue != null) {
          setDirections(JSON.parse(jsonValue));
        }
       
      } catch (e) {
        console.error(':', e);
      }
    };

    const addToDirection = async (direction1) => {
      const updatedDirections = [...direction, direction1];
      setDirections(updatedDirections);
      try {
          const jsonValue = JSON.stringify(updatedDirections);
          await AsyncStorage.setItem('@Directions', jsonValue);
          if (navigation) {
              navigation.navigate('DirectionScreen');
          }
      } catch (e) {
          console.error('Error al guardar la dirección:', e);
      }
  };

  const replaceDirection = async (index, newDirection) => {
    try {

      const updatedDirections = [...direction];
      updatedDirections.forEach((direction) => {
        direction.isSelected = false;
      });
      newDirection.isSelected= true;
      updatedDirections[index] = newDirection;
      setDirections(updatedDirections);

      const jsonValue = JSON.stringify(updatedDirections);
      await AsyncStorage.setItem('@Directions', jsonValue);

    } catch (e) {
      console.error('Error al reemplazar la dirección:', e);
    }

  };

  const removeDirection = async (direccionId) => {
    try {
        const updatedDirections = direction.filter((item) => item.id !== direccionId);
        setDirections(updatedDirections); 

        const jsonValue = JSON.stringify(updatedDirections);
        await AsyncStorage.setItem('@Directions', jsonValue);

    } catch (e) {
        console.error('Error al eliminar la dirección:', e);
    }
};


      return {direction, addToDirection, reLoadDirections, replaceDirection, removeDirection};
}

export default useDirections;