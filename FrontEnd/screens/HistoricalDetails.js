import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useHistorical } from '../hooks/useHistorical';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export function HistoricalDetailsScreen({ route }) {
  const { compraId } = route.params;

  const { orders } = useHistorical();
  const compra = orders.find(p => p.id === compraId);


  if (!compra) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-green-500">Espere un momento...</Text>
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
    <View className="flex-row mb-1 pb-2 justify-between items-center">
      <Text className="text-gray-800 font-Erode_regular text-base dark:text-[#e8e8e8] w-1/3">{item.item_name}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8] w-1/5">{formatCurrency(item.total_price)}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8] w-1/6">{item.quantity}</Text>
      <Text className="text-gray-600 font-Erode_regular text-base dark:text-[#e8e8e8] w-1/7">{formatCurrency(item.quantity * item.total_price)}</Text>
    </View>
  );

  const handleDownload = async () => {
    try {
      const htmlContent = `
        <h1>Detalles de Compra</h1>
        <p>Usuario: ${compra.user_name}</p>
        <p>Fecha: ${formatDate(compra.order_date)}</p>
        <p>Total a pagar: ${formatCurrency(compra.total_price)}</p>
        <p>Código: ${compra.order_num}</p>
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
            ${compra.products.map(item => `
              <tr>
                <td>${item.item_name}</td>
                <td>${formatCurrency(item.total_price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.quantity * item.total_price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <hr/>
        <h2>Entrega</h2>
        <p>${compra.direction}</p>
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CR', options);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black py-4 px-8">
      <Text className="text-xl mt-2 font-Erode_regular text-main-blue dark:text-[#e6e6e6]">Usuario:</Text>
      <Text className="text-2xl mt-1 mb-3 font-Excon_bold text-main-blue dark:text-white">{compra.user_name}</Text>

      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Fecha: <Text className="font-Erode_regular">{formatDate(compra.order_date)}</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Total a pagar: <Text className="font-Erode_regular">{formatCurrency(compra.total_price)}</Text></Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Código: <Text className="font-Erode_regular">{compra.order_num}</Text></Text>
      </View>

      <View className="border-b border-gray-30 dark:border-main-blue mb-4" />

      <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">Detalles de la orden</Text>

      <View className="flex-row justify-between mb-3 ">
        <Text className="font-Erode_bold w-1/3 text-main-blue text-lg dark:text-[#e6e6e6]">Producto</Text>
        <Text className="font-Erode_bold w-1/5 text-main-blue text-lg dark:text-[#e6e6e6]">Precio</Text>
        <Text className="font-Erode_bold w-1/6 text-main-blue text-lg dark:text-[#e6e6e6]">Cant.</Text>
        <Text className="font-Erode_bold w-1/7 text-main-blue text-lg dark:text-[#e6e6e6]">Subtotal</Text>
      </View>

      {compra.products.map((item, index) => (
        <View key={index} className="flex-row justify-between mb-3">
          <Text className="font-Erode_regular w-1/3 text-gray-600 text-lg dark:text-[#e6e6e6d0]">{item.item_name}</Text>
          <Text className="font-Erode_regular w-1/5 text-gray-600 text-lg dark:text-[#e6e6e6d0]">{formatCurrency(item.total_price)}</Text>
          <Text className="font-Erode_regular w-1/6 text-gray-600 text-lg dark:text-[#e6e6e6d0]">{item.quantity}</Text>
          <Text className="font-Erode_regular w-1/7 text-gray-600 text-lg dark:text-[#e6e6e6d0]">{formatCurrency(item.quantity * item.total_price)}</Text>
        </View>
      ))}

      <View className="border-b border-gray-300 dark:border-main-blue mb-4" />

      <Text className="text-lg mb-2 font-Erode_regular text-main-blue dark:text-white">Entrega:</Text>
      <Text className="text-gray-600 font-Erode_regular mb-2 dark:text-[#e6e6e6d0]">{compra.direction}</Text>

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
