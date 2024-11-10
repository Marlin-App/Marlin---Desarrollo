
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Route, Alert, Navigation, Navigate, Button } from 'react-native';
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTransportFee } from '../hooks/useTransportFee';

export function OrderInfo({ navigation }) {

    // const [region, setRegion] = useState({
    //     latitude: 9.9333,
    //     longitude: -84.0833,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // });
    // const [routeCoordinates, setRouteCoordinates] = useState([]);
    // const [distance, setDistance] = useState(null);


    // const route = useRoute();
    // const { order } = route.params;

    // const [startCoords, setStartCoords] = useState({ latitude: order.tiendaCoordenadas.latitude, longitude: order.tiendaCoordenadas.longitude });
    // const [endCoords, setEndCoords] = useState({ latitude: order.entregaCoordenadas.latitude, longitude: order.entregaCoordenadas.longitude });



    // useEffect(() => {
    //     const calculateDistanceAndRoute = async () => {
    //         const result = await getDistanceFromGoogleMaps(startCoords, endCoords);
    //         if (result) {
    //             setDistance(result.distance);

    //             // Almacena las coordenadas de la ruta
    //             const route = result.routeCoordinates || [];
    //             setRouteCoordinates(route);
    //         }
    //     };
    //     calculateDistanceAndRoute();
    // }, [startCoords, endCoords]);


    // useEffect(() => {
    //     console.log('esta es la order', distance);
    // }, [order]);

    const route = useRoute();
    const { order } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
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

    const calculateDistanceAndRoute = async () => {
        console.log(order);
        const result = await useTransportFee(startCoords, endCoords);
        if (result) {
            setDistance(result.distance);
            const route = result.routeCoordinates || [];
            setRouteCoordinates(route);
        }
    };
    useEffect(() => {
        calculateDistanceAndRoute();
    }, []);

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