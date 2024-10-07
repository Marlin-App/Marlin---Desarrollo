import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import { UseHistorical } from '../hooks/useHistorical';

export function HistoricalScreen({ navigation }) {

  const HistoricalDetailsScreen = ({ item }) => (
    <TouchableOpacity
      className="flex flex-row border-b-2 pb-4 border-light-blue"
      onPress={() => {
        navigation.navigate('HistoricalDetailsScreen', { compraId: item.id });
      }}
    >
      <View className="flex-1">
        <Text className="font-Erode_regular text-gray-800 text-lg">Compra #{item.id}</Text>
        <Text className="font-Erode_regular text-gray-600">Fecha: {item.date}</Text>
        <Text className="font-Erode_regular text-gray-600">Total: {formatCurrency(item.total)}</Text>
      </View>
      {/* <Feather name="chevron-right" size={24} color="#015DEC" /> */}
    </TouchableOpacity>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC',
    });
  };

  const ordenHistoricalData = [...UseHistorical].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <View className="flex-1 bg-white py-4 px-8">
      <Text className="text-xl font-bold mb-6 text-center">Historial de Compras</Text>
      <FlatList
        data={ordenHistoricalData}
        renderItem={HistoricalDetailsScreen}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
