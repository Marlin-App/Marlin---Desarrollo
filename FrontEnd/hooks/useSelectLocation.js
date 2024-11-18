import { useState, useEffect, useRef } from 'react';
import { Modal, View, Button, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const useSelectLocation = () => {

  const [location, setLocation] = useState({
    latitude: 9.994514,
    longitude: -84.651531,
  }); // Guardar la ubicación actual
  const [isModalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // Guardar la ubicación seleccionada (solo del marcador)

  // Función para obtener la ubicación actual
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }
      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setSelectedLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {

      }
    };

    getLocation();
  }, []);
  // ------------------------------------------------------------------------

  // Funciones para abrir y cerrar el modal
  const closeLocationPicker = () => {
    setModalVisible(false);
  };
  // ------------------------------------------------------------------------

  // Función para manejar el evento de arrastrar el marcador
  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };
  // ------------------------------------------------------------------------

  // Función para abrir el modal
  const LocationPickerComponent = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={location}
            onDragEnd={handleMarkerDragEnd}
          />
        </MapView>
        <Button title="Cerrar" onPress={closeLocationPicker} />
      </View>
    </Modal>
  );
  // ------------------------------------------------------------------------

  return {
    location,
    LocationPickerComponent,
    setModalVisible,
    isModalVisible,
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