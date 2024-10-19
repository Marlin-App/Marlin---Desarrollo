import { useState, useEffect, useRef } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const useSelectLocation = () => {
  const [location, setLocation] = useState(null); // Guardar la ubicación actual
  const [isModalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null); // Crear una referencia para el MapView

  // Obtener permisos de ubicación y la ubicación actual
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    };

    if (isModalVisible) {
      getLocation();
    }
  }, [isModalVisible]);

  const openLocationPicker = () => {
    setModalVisible(true);
  };

  const closeLocationPicker = () => {
    setModalVisible(false);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });

    // Animar el mapa para que se centre en la ubicación seleccionada
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom más cercano a la ubicación seleccionada
        longitudeDelta: 0.01,
      });
    }
  };

  const LocationPickerComponent = () => (
    <Modal visible={isModalVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {location && (
          <MapView
            ref={mapRef} // Asociar la referencia al MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude, // Usar la ubicación actual del dispositivo
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress} // Manejar el evento de tocar en el mapa
          >
            <Marker coordinate={location} />
          </MapView>
        )}
        <Button title="Cerrar" onPress={closeLocationPicker} />
      </View>
    </Modal>
  );

  return {
    location,
    openLocationPicker,
    LocationPickerComponent,
  };
};

export default useSelectLocation;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
