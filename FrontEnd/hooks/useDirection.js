import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDirections = (navigation) => {
  const [direction, setDirections] = useState([]);

  //Cargar las direcciones
  useEffect(() => {
    const loadDirections = async () => {
      try {
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
  // ------------------------------------------------------------------------

  // Recargar las direcciones
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
  // ------------------------------------------------------------------------

  // Agregar una nueva direccion
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
  // ------------------------------------------------------------------------

  // Reemplazar una direccion
  const replaceDirection = async (index, newDirection) => {
    try {
      const updatedDirections = [...direction];
      updatedDirections.forEach((direction) => {
        direction.isSelected = false;
      });
      newDirection.isSelected = true;
      updatedDirections[index] = newDirection;
      setDirections(updatedDirections);

      const jsonValue = JSON.stringify(updatedDirections);
      await AsyncStorage.setItem('@Directions', jsonValue);

    } catch (e) {
      console.error('Error al reemplazar la dirección:', e);
    }
  };
  // ------------------------------------------------------------------------

  // Eliminar una direccion
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
  // ------------------------------------------------------------------------

   // Actualizar una direccion
  const updateDirection = async (uptateDirection) => {
    console.log(direction);
    console.log(uptateDirection);
    try {
      const updatedDirections = direction.map((item) =>
        item.id === uptateDirection.id ? { ...item, ...uptateDirection } : item
      );
      setDirections(updatedDirections);

      const jsonValue = JSON.stringify(updatedDirections);
      await AsyncStorage.setItem('@Directions', jsonValue);
      if (navigation) {
        navigation.navigate('DirectionScreen');
      }
    } catch (e) {
      console.error('Error al actualizar la dirección:', e);
    }
  };
  // ------------------------------------------------------------------------


  return { direction, addToDirection, reLoadDirections, replaceDirection, removeDirection, updateDirection };
}

export default useDirections;