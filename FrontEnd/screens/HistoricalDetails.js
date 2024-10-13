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
    <View className="flex-row mb-1 pb-2 justify-between">
      <Text className="text-gray-800 font-Erode_regular text-base dark:text-[#e8e8e8]">{item.name}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8]">{formatCurrency(item.price)}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8]">{item.quantity}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8]">{formatCurrency(item.quantity * item.price)}</Text>
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
    <View className="flex-1 bg-white dark:bg-black py-4 px-8">
      <Text className="text-xl mt-2 font-Erode_regular text-main-blue dark:text-[#e6e6e6]">Tienda:</Text>
      <Text className="text-2xl mt-1 mb-3 font-Excon_bold text-main-blue dark:text-white">{compra.tienda}</Text>

      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Fecha: <Text className="font-Erode_regular">{compra.date}</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Total a pagar: <Text className="font-Erode_regular">{formatCurrency(compra.total)}</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Código: <Text className="font-Erode_regular">{randomCode}</Text></Text>
      </View>

      <View className="border-b border-gray-30 dark:border-main-blue mb-4" />

      <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">Detalles de la orden</Text>

      <View className="flex-row justify-between mb-3 ">
        <Text className="font-Erode_bold w-1/3 text-main-blue text-lg dark:text-[#e6e6e6]">Producto</Text>
        <Text className="font-Erode_bold w-1/5 text-main-blue text-lg dark:text-[#e6e6e6]">Precio</Text>
        <Text className="font-Erode_bold w-1/6 text-main-blue text-lg dark:text-[#e6e6e6]">Cant.</Text>
        <Text className="font-Erode_bold w-1/7 text-main-blue text-lg dark:text-[#e6e6e6]">Subtotal</Text>
      </View>

      <FlatList
        data={compra.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />



      <View className="border-b border-gray-300 dark:border-main-blue mb-4" />

      <Text className="text-lg mb-4 font-Erode_medium text-main-blue dark:text-white">Entrega:</Text>
      <Text className="text-gray-600 font-Erode_regular mb-2 dark:text-[#e6e6e6d0]">Lorem ipsum dolor sit amet consectetur. Et consectetur magnis nulla enim luctus turpis egestas. Adipiscing tortor facilisis risus risus in ornare. Sagittis mi aliquam purus lorem elementum. Est non volutpat turpis lectus et urna.</Text>

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
