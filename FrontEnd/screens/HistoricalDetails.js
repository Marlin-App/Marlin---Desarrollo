// screens/PurchaseDetails.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { UseHistorical } from '../hooks/useHistorical';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing'; 

export function HistoricalDetailsScreen({ route, navigation }) {
  const { compraId } = route.params;
  const [randomCode, setRandomCode] = useState('');

  const compra = UseHistorical.find(p => p.id === compraId);

  useEffect(() => {
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
    };
    setRandomCode(generateRandomCode());
  }, []);

  if (!compra) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Compra no encontrada.</Text>
      </View>
    );
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    });
  };

  const renderItem = ({ item }) => (
    <View className="flex-row items-center mb-1 pb-2 justify-between">
        <Text className="font-Erode_regular text-gray-800 text-base">{item.name}</Text>
        <Text className="text-gray-600 font-Erode_regular text-base">{formatCurrency(item.price)}</Text>
        <Text className="text-gray-600 font-Erode_regular text-base">{item.quantity}</Text>
        <Text className="text-gray-600 font-Erode_regular text-base">{formatCurrency(item.quantity * item.price)}</Text>
    </View>
  );

  const handleDownload = async () => {
    try {
      const htmlContent = `
        <h1>Detalles de Compra</h1>
        <p>Tienda: ${compra.storeName}</p>
        <p>Fecha: ${compra.date}</p>
        <p>Total a pagar: ${formatCurrency(compra.total)}</p>
        <p>Código: ${randomCode}</p>
        <hr/>
        <table border="1" cellspacing="0" cellpadding="5">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${compra.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.quantity * item.price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <hr/>
        <h2>Entrega</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Et consectetur magnis nulla enim luctus turpis egestas. Adipiscing tortor facilisis risus risus in ornare. Sagittis mi aliquam purus lorem elementum. Est non volutpat turpis lectus et urna.</p>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      await Sharing.shareAsync(uri);
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  const handleNotifyProblem = () => {
    Alert.alert('Notificación', 'Has presionado el botón de notificar problema.');
  };

  return (
    <View className="flex-1 bg-white py-4 px-8">
      <Text className="text-lg mt-2 font-Erode_regular text-main-blue">Tienda</Text>
      <Text className="text-2xl mb-6 font-Excon_bold text-main-blue">{compra.tienda}</Text>
      
      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_regular mb-1">Fecha: {compra.date}</Text>
        <Text className="text-gray-600 font-Erode_regular mb-1">Total a pagar: {formatCurrency(compra.total)}</Text>
        <Text className="text-gray-600 font-Erode_regular mb-1">Código: {randomCode}</Text>
      </View>

      <View className="border-b border-gray-300 mb-4" />

      <Text className="text-lg mb-4 font-Erode_medium text-main-blue">Detalles de la orden</Text>
      
      <View className="flex-row justify-between mb-3 ">
        <Text className="font-Erode_regular w-1/3 text-main-blue text-base">Producto</Text>
        <Text className="font-Erode_regular w-1/5 text-main-blue text-base">Precio</Text>
        <Text className="font-Erode_regular w-1/6 text-main-blue text-base">Cant</Text>
        <Text className="font-Erode_regular w-1/6 text-main-blue text-base">Subtotal</Text>
      </View>

      <FlatList
        data={compra.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

     

      <View className="border-b border-gray-300 mb-4" />
      
      <Text className="text-lg mb-4 font-Erode_medium text-main-blue">Entrega:</Text>
      <Text className="text-gray-600 font-Erode_regular mb-2">Lorem ipsum dolor sit amet consectetur. Et consectetur magnis nulla enim luctus turpis egestas. Adipiscing tortor facilisis risus risus in ornare. Sagittis mi aliquam purus lorem elementum. Est non volutpat turpis lectus et urna.</Text>

       <View className="flex-row justify-evenly mt-4 mb-20">
        <TouchableOpacity
          className="bg-main-blue px-4 py-2 rounded-lg"
          onPress={handleDownload}
        >
          <Text className="text-white font-Excon_bold">Descargar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg"
          onPress={handleNotifyProblem}
        >
          <Text className="text-white font-Excon_bold">Notificar Problema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
