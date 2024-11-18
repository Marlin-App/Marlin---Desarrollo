import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useHistorical } from "../hooks/useHistorical";
import useGetUser from "../hooks/useGetUser";
import loaderGif from '../assets/loader.gif';
import useStores from "../hooks/useStores";

export function HistoricalScreen({ navigation }) {
  const [filter, setFilter] = useState("all");
  const { orders, loading: historicalLoading, error } = useHistorical();
  const {
    user,
    loading: userLoading,
    isLogged,
    fetchData,
    token,
  } = useGetUser();
  const {
    data: stores,
    loading: storesLoading,
    error: storesError,
  } = useStores();

  useEffect(() => {
    fetchData();
  }, []);

  // Función para obtener los detalles de la tienda
  const getStoreDetails = (storeId) => {
    const store = stores.find((store) => store.id === storeId);
    return store
      ? { storeName: store.name, storePicture: store.picture }
      : { storeName: "Tienda desconocida", storePicture: null };
  };
  // ------------------------------------------------------------------------

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", options);
  };
  // ------------------------------------------------------------------------

  // Función para renderizar los items
  const HistoricalDetailsScreen = ({ item }) => {
    const { storeName, storePicture } = getStoreDetails(item.store_id);

    return (
      <TouchableOpacity
        className="flex flex-row p-2 items-center mb-1 bg-white rounded-lg border-gray-200 dark:border-[#232323] dark:bg-[#1C1C1C] border"
        onPress={() => {
          navigation.navigate("HistoricalDetailsScreen", {
            compraId: item.id,
            products: item.products,
            totalPrice: item.total_price,
            orderDate: item.order_date,
          });
        }}
      >
        <Image
          source={{ uri: storePicture }}
          className="w-14 h-14 rounded-lg mr-4"
        />
        <View className="flex-1">
          <Text className="font-Excon_bold text-base dark:text-[#f1f1f1]">
            {storeName}
          </Text>
          <Text className="font-Excon_bold text-xs dark:text-[#cdcdcd]">
            Fecha:{" "}
            <Text className="font-Excon_thin">
              {formatDate(item.order_date)}
            </Text>
          </Text>
          {(item.status === "Pendiente" || item.status === "En camino") && (
            <Text className="font-Excon_bold text-xs dark:text-[#cdcdcd]">
              Estado:{" "}
              <Text className="font-Excon_thin">
                {item.status === "En camino" ? "En camino" : item.status}
              </Text>
            </Text>
          )}
          <View className="flex-row justify-between">
            <Text className="font-Excon_bold text-xs dark:text-[#cdcdcd]">
              Productos:{" "}
              <Text className="font-Excon_thin">{item.products.length}</Text>
            </Text>
            <Text className="font-Excon_bold text-xs dark:text-[#f1f1f1]">
              Total:{" "}
              <Text className="font-Excon_thin">
                {formatCurrency(item.total_price)}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // ------------------------------------------------------------------------

  // Función para formatear el precio
  const formatCurrency = (value) => {
    return value.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      maximumFractionDigits: 0,
    });
  };
  // ------------------------------------------------------------------------

  const ordenHistoricalData = [...orders].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  // Filtrar los datos
  const filteredData = ordenHistoricalData.filter((item) => {
    if (filter === "all") return item.user_id === user.user_id;
    if (filter === "Pendiente")
      return (
        (item.status === "Pendiente" || item.status === "En camino") &&
        item.user_id === user.user_id
      );
    return item.status === filter && item.user_id === user.user_id;
  });
  // ------------------------------------------------------------------------

  // Renderizar la pantalla
  if (userLoading || historicalLoading || storesLoading) {
    return (
      <View className="bg-main-blue w-full h-full justify-center items-center">
        <Image source={loaderGif} style={{ width: 300, height: 300 }} />
      </View>
    );
  }
  // ------------------------------------------------------------------------

  if (error || storesError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error || storesError}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 py-4 px-8 bg-[#f9f9f9] dark:bg-black">
      <Text className="text-2xl mb-6 font-Excon_bold px-2 text-main-blue">
        ¡Mirá tus increíbles pedidos!
      </Text>
      <Text className="text-base mb-4 font-Excon_bold dark:text-[#efeeee]">
        Historial de Compras
      </Text>
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className={`px-5 py-2 rounded-xl ${filter === "all"
            ? "border border-light-blue dark:border-main-blue"
            : "border border-gray-800 dark:border-white"
            }`}
          onPress={() => setFilter("all")}
        >
          <Text className="text-center dark:text-white">Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-5 py-2 rounded-xl ${filter === "Entregado"
            ? "border border-light-blue dark:border-main-blue"
            : "border border-gray-800 dark:border-white"
            }`}
          onPress={() => setFilter("Entregado")}
        >
          <Text className="text-center dark:text-white">Completados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-5 py-2 rounded-xl ${filter === "Pendiente"
            ? "border border-light-blue dark:border-main-blue"
            : "border border-gray-800 dark:border-white"
            }`}
          onPress={() => setFilter("Pendiente")}
        >
          <Text className="text-center dark:text-[#f9f9f9]">Pendientes</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <HistoricalDetailsScreen item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="border p-2 border-light-blue dark:border-main-blue rounded-lg mb-4"
        ListEmptyComponent={
          <View className="items-center mt-4">
            <Text className="text-gray-600 dark:text-gray-400">
              No hay compras en este estado.
            </Text>
          </View>
        }
      />
    </View>
  );
}
