// screens/HistoricalScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { UseHistorical } from '../hooks/useHistorical';

export function HistoricalScreen({ navigation }) {
  const [filter, setFilter] = useState('all');

  const HistoricalDetailsScreen = ({ item }) => (
    <TouchableOpacity
      className="flex flex-row p-2 items-center mb-1 bg-white rounded-lg border-gray-200 border"
      onPress={() => {
        navigation.navigate('HistoricalDetailsScreen', { compraId: item.id });
      }}
    >
      <Image source={{ uri: item.image }} className="w-14 h-14 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="font-Excon_regular text-xs">Fecha: {item.date}</Text>
        <Text className="font-Excon_bold text-base">{item.tienda}</Text>
        <View className="flex-row justify-between">
          <Text className="font-Excon_regular text-xs">{item.quantity} productos</Text>
          <Text className="font-Excon_regular text-xs">Total: {formatCurrency(item.total)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    });
  };

  const ordenHistoricalData = [...UseHistorical].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredData = ordenHistoricalData.filter(item => {
    if (filter === 'all') return true;
    return item.estado === filter;
  });

  return (
    <View className="flex-1 py-4 px-8 bg-[#f9f9f9]">
      <Text className="text-2xl mb-6 font-Excon_bold px-2 text-main-blue">¡Mirá tus increíbles pedidos!</Text>
      <Text className="text-base mb-4 font-Excon_bold">Historial de Compras</Text>
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-xl ${filter === 'completed' ? 'border border-light-blue' : 'border border-gray-800'}`}
          onPress={() => setFilter('completed')}
        >
          <Text className="text-center">Completados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-3 py-2 rounded-xl ${filter === 'pending' ? 'border border-light-blue' : 'border border-gray-800'}`}
          onPress={() => setFilter('pending')}
        >
          <Text className="text-center">Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-3 py-2 rounded-xl ${filter === 'cancelled' ? 'border border-light-blue' : 'border border-gray-800'}`}
          onPress={() => setFilter('cancelled')}
        >
          <Text className="text-center">Cancelados</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <HistoricalDetailsScreen item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="border p-2 border-light-blue rounded-lg mb-4"
        ListEmptyComponent={
          <View className="items-center mt-4">
            <Text className="text-gray-600">No hay compras en este estado.</Text>
          </View>
        }
      />
    </View>
  );
}
