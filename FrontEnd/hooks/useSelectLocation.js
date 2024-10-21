import { useState, useEffect, useRef } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const useSelectLocation = () => {
  const [location, setLocation] = useState(null); // Guardar la ubicación actual
  const [isModalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null); // Crear una referencia para el MapView
  const [selectedLocation, setSelectedLocation] = useState(null); // Guardar la ubicación seleccionada (solo del marcador)
  
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
      setSelectedLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    };
    
    getLocation();
  }, []);
  
  const closeLocationPicker = () => {
    setModalVisible(false);
  };

  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

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
