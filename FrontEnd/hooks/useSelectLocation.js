import { useState } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const useSelectLocation = () => {
  const [location, setLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openLocationPicker = () => {
    setModalVisible(true);
  };

  const closeLocationPicker = () => {
    setModalVisible(false);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    closeLocationPicker();
  };

  const LocationPickerComponent = () => (
    <Modal visible={isModalVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 9.7489, // Coordenadas iniciales
            longitude: -83.7534,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
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
