import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useTransportFee } from '../hooks/useTransportFee';

export function OrderInfo({ navigation }) {

  const route = useRoute();
  const { order } = route.params;

  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState({
    latitude: order.tiendaCoordenadas.latitude,
    longitude: order.tiendaCoordenadas.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const startCoords = { latitude: order.tiendaCoordenadas.latitude, longitude: order.tiendaCoordenadas.longitude };
  const endCoords = { latitude: order.entregaCoordenadas.latitude, longitude: order.entregaCoordenadas.longitude };

  // Función para calcular la distancia y la ruta
  const calculateDistanceAndRoute = async () => {
    console.log(order);
    const result = await useTransportFee(startCoords, endCoords);
    if (result) {
      setDistance(result.distance);
      const route = result.routeCoordinates || [];
      setRouteCoordinates(route);
    }
  };
  // ------------------------------------------------------------------------

  // Calcular la distancia y la ruta al cargar el componente
  useEffect(() => {
    calculateDistanceAndRoute();
  }, []);
  // ------------------------------------------------------------------------

  return (
    <View className="flex-1 bg-white dark:bg-black py-4 px-8">
      <Text className="text-xl mb-2 font-Excon_regular text-main-blue dark:text-white">Detalles del pedido:</Text>

      <Text className="text-xl my-2 font-Excon_bold text-main-blue dark:text-[#e6e6e6]">Tienda: <Text className="text-base mt-1 mb-3 font-Excon_regular text-main-blue dark:text-white">{order.tienda}</Text></Text>

      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Código: <Text className="text-gray-600 font-Erode_regular mb-1 dark:text-[#e6e6e6]">{order.codigo}</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Usuario: <Text className="text-gray-600 font-Erode_regular mb-1 dark:text-[#e6e6e6]">{order.destinatario}</Text></Text>
      </View>

      <View className="border-b border-main-blue dark:border-light-blue mb-4" />

      <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">Detalles del transporte:</Text>

      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Distancia: <Text className="text-gray-600 font-Erode_regular mb-1 dark:text-[#e6e6e6]">2Km</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Precio: <Text className="text-gray-600 font-Erode_regular mb-1 dark:text-[#e6e6e6]"> ₡ 700</Text></Text>
      </View>

      <View className="border-b border-main-blue dark:border-light-blue mb-4" />

      <Text className="text-xl mb-2 font-Excon_regular text-main-blue dark:text-white">Dirección de entrega:</Text>
      <Text className="text-gray-600 dark:text-white font-Erode_regular mb-2 dark:text-[#e6e6e6d0]">Referencia de la direccion proporcionada por el cliente</Text>

      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
        >
          <Marker coordinate={startCoords} title="Punto de inicio" />
          <Marker coordinate={endCoords} title="Punto de destino" />
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#0000FF"
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
    </View>
  )
}