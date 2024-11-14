import {
  Button,
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  navigation,
  navigate,
  Switch
} from "react-native";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Animated, Modal, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCRUDProductos } from "../hooks/useCRUDProductos";
import NotificationDropdown from "../components/NotificationDropdown";
import React, { useEffect, useCallback, useState, useRef } from "react";
import useOrders from '../hooks/useOrders';



export function ExpressScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [longPressProduct, setLongPressProduct] = useState(null);
  const { colorScheme } = useColorScheme();
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);
  const { orders } = useOrders();
  const [online, setOnline] = useState(false);
  const switchOnline = () => setOnline(previousState => !previousState);

  // const ordenes = [
  //   {
  //     id: 1,
  //     tienda: "Bazar Marta",
  //     destinatario: "Jeremy Guzman",
  //     detalle: "Detalles del pedido aquí",
  //     tiendaCoordenadas: { latitude: 9.9763, longitude: -84.833 },
  //     entregaCoordenadas: { latitude: 9.979, longitude: -84.813 },
  //     estado: "Pendientes",
  //   },
  //   {
  //     id: 2,
  //     tienda: "Panadería La Esperanza",
  //     destinatario: "Ana Lopez",
  //     detalle: "Detalles del pedido aquí",
  //     tiendaCoordenadas: { latitude: 9.978, longitude: -84.834 },
  //     entregaCoordenadas: { latitude: 9.981, longitude: -84.820 },
  //     estado: "En Progreso",
  //   },
  //   {
  //     id: 3,
  //     tienda: "Panadería La Esperanza",
  //     destinatario: "Ana Lopez",
  //     detalle: "Detalles del pedido aquí",
  //     tiendaCoordenadas: { latitude: 9.978, longitude: -84.834 },
  //     entregaCoordenadas: { latitude: 9.981, longitude: -84.820 },
  //     estado: "Completada",
  //   },
  // ];

  const [prueba, setprueba] = useState([
    {
      title: "Pendientes", orders: [{
        id: 1,
        tienda: "Bazar Marta",
        codigo: "1234",
        destinatario: "Jeremy Guzman",
        detalle: "Detalles del pedido aquí",
        tiendaCoordenadas: { latitude: 9.9763, longitude: -84.833 },
        entregaCoordenadas: { latitude: 9.9763, longitude: -84.830 },
        estado: "Pendientes",
      }]
    },
    { title: "En Progreso", orders: [] },
    { title: "Completados", orders: [] },
  ]);

  const handleRejectOrder = (orderId) => {
    setprueba((prevPrueba) => {
      const updatedPrueba = prevPrueba.map((category) => {
        if (category.title === "Pendientes") {
          return {
            ...category,
            orders: category.orders.filter((order) => order.id !== orderId),
          };
        }
        return category;
      });
      return updatedPrueba;
    });
  };
  const handleAcceptOrder = (orderId) => {
    setprueba((prevPrueba) => {
      const updatedPrueba = prevPrueba.map((category) => {
        if (category.title === "Pendientes") {
          const orderToMove = category.orders.find((order) => order.id === orderId);
          if (orderToMove) {
            orderToMove.estado = "En Progreso";
            return {
              ...category,
              orders: category.orders.filter((order) => order.id !== orderId),
            };
          }
        } else if (category.title === "En Progreso") {
          const orderToMove = prevPrueba.find((cat) => cat.title === "Pendientes").orders.find((order) => order.id === orderId);
          if (orderToMove) {
            return {
              ...category,
              orders: [...category.orders, orderToMove],
            };
          }
        }
        return category;
      });
      return updatedPrueba;
    });
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [notifications, setNotifications] = useState([

  ]);

  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const fetchStores = async () => {
      await fetchStoresWithProducts();
    };

    fetchStores();
  }, [navigation]);

  const longpress = (id) => {
    setLongPressProduct(id);
    setModalVisible(true);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: page * screenWidth, animated: true });
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    console.log(online);
  }, [online]);

  return (
    <View className="bg-white dark:bg-neutral-950 h-full">
      <NotificationDropdown
        notifications={notifications}
        isDropdownVisible={isDropdownVisible}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        onNotificationClick={handleNotificationClick}
      />
      <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-tab py-8 ">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-center">
            <Text className="text-white text-2xl font-Excon_bold w-[80vw] dark:text-light-blue">
              ¡Bienvenido a Marlin, aqui puedes ver los pedidos!
            </Text>
          </View>
          <View className="flex-row items-center justify-center gap-x-4 mr-2">
            <TouchableOpacity onPress={toggleDropdown}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colorScheme === "dark" ? "#5186EC" : "white"}
              />
              {notifications.length > 0 && (
                <View className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-red-600 rounded-full" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {prueba.map((store, storeIndex) => (
          <View
            key={storeIndex}
            style={{ width: screenWidth }}
            className="flex-col p-4"
          >
            <Text className="text-2xl text-main-blue font-Excon_bold mt-2 dark:text-white">
              {store.title}
            </Text>
            <View className="flex-col">
              <FlatList
                className="h-[60vh] my-4"
                data={store.orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ScrollView className="flex-col px-4 rounded-lg mb- bg-red-60">
                    <View className="flex-row justify-center mb-1">
                      <View className="flex-row justify-center mt-2 py-4 border-[0.5px] border-main-blue dark:border-light-blue w-full items-center rounded-md ">
                        <View>
                          <View className="flex-row">
                            <View className=" justify-center item-center bg-blue-800 rounded-lg dark:bg-neutral-900">
                              <Image
                                style={{
                                  width: 100,
                                  height: 100,
                                  resizeMode: "stretch",
                                }}
                              />
                            </View>
                            <View className="ml-2">
                              <Text className="font-Excon_bold text-base dark:text-white">
                                {item.tienda}
                              </Text>
                              <Text className="font-Excon_regular text-sm dark:text-white">
                                Usuario: {item.destinatario}
                              </Text>
                              <TouchableOpacity onPress={() =>
                                navigation.navigate("OrderInfo", { order: item })
                              }>
                                <Text className="font-Excon_regular text-sm dark:text-white underline">
                                  Más información
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View className="flex-row justify-center gap-x-4 mt-3">
                            <TouchableOpacity
                              onPress={() => handleAcceptOrder(item.id)}>
                              <Text
                                className={`font-Excon_regular text-sm text-white dark:text-white px-4 py-1 rounded-xl mr-2 ${storeIndex === 0 ||
                                  scrollX._value / screenWidth === storeIndex
                                  ? "bg-main-blue"
                                  : "bg-main-gray"
                                  }`}
                              >
                                Aceptar
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleRejectOrder(item.id)}>
                              <Text
                                className={`font-Excon_regular text-sm text-white dark:text-white px-2 py-1 rounded-xl ${storeIndex === 0 ||
                                  scrollX._value / screenWidth === storeIndex
                                  ? "bg-main-red"
                                  : "bg-main-gray"
                                  }`}
                              >
                                No Aceptar
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View className="flex-row justify-between items-center px-5 mb-2">
        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿Deseas recibir pedidos?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={online ? '#015DEC' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchOnline}
          value={online}
        />
      </View>

      <View className="flex-row justify-center mt-4">
        {prueba.map((_, index) => {
          // Animación del tamaño del punto
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              className="mb-4"
              key={index}
              style={{
                width: dotWidth,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#015DEC",
                marginHorizontal: 4,
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
