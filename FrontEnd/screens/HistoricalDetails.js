// screens/PurchaseDetails.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { UseHistorical } from '../hooks/useHistorical';

export function HistoricalDetailsScreen({ route }) {
  const { compraId } = route.params;

  const compra = UseHistorical.find(p => p.id === compraId);

  if (!compra) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Compra no encontrada.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View className="flex-row mb-4 border-b-2 pb-4 border-[#ccc]">
      <Image source={{ uri: item.image }} className="w-16 h-16 mr-2 rounded-lg" />
      <View className="ml-2 justify-center">
        <Text className="font-Excon_regular text-gray-800 text-base">{item.name}</Text>
        <Text>Cantidad: {item.quantity}</Text>
        <Text>Precio: {formatCurrency(item.price)}</Text>
      </View>
    </View>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC',
    });
  };

  return (
    <View className="flex-1 bg-white py-4 px-8">
      <Text className="text-2xl mb-2 text-center font-Excon_bold text-main-blue">Compra #{compra.id}</Text>
      <Text className="text-gray-600 font-Erode_regular text-center text-base mb-4">Fecha: {compra.date}</Text>
      <FlatList
        data={compra.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Text className="text-main-blue font-Excon_bold text-right text-xl">Total: {formatCurrency(compra.total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#015DEC',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#015DEC',
    textAlign: 'right',
    marginTop: 16,
  },
});
