import { Image, View, Text, ScrollView, TouchableOpacity, FlatList, Switch } from "react-native";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Animated, Dimensions } from "react-native";
import NotificationDropdown from "../components/NotificationDropdown";
import React, { useEffect, useState, useRef } from "react";
import useOrders from '../hooks/useOrders';
import useDecodeJWT from "../hooks/useDecodeJWT";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ExpressScreen({ navigation }) {
  const { getToken, isTokenExpired, refreshToken, decodeJWT } = useDecodeJWT();
  const { colorScheme } = useColorScheme();
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);
  const { orders } = useOrders();
  const [online, setOnline] = useState(false);

  const [pendiente, setPendiente] = useState([]);
  const [enProgreso, setEnProgreso] = useState([]);
  const [completado, setCompletado] = useState([]);

  const [misOrdenes, setMisOrdenes] = useState([
    { title: "Pendientes", orders: pendiente },
    { title: "En Progreso", orders: enProgreso },
    { title: "Completados", orders: completado },
  ]);

  const switchOnline = async () => {

    if (await isTokenExpired()) {
      await refreshToken();
    }
    const jsonValue = await AsyncStorage.getItem("@userToken");
    const userData = JSON.parse(jsonValue);
    const token = userData.access;
    const decodedToken = decodeJWT(token);
    const user_id = decodedToken.payload.user_id; //cambiar el id del usuario por id del repartidor

    try {
      const response = await fetch(
        `https://marlin-backend.vercel.app/api/delivery-profiles/${user_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_active: !online,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al poner en linea al usuario');
      }

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setOnline(previousState => !previousState)
  };


  useEffect(() => {
    setMisOrdenes([
      { title: "Pendientes", orders: pendiente },
      { title: "En Progreso", orders: enProgreso },
      { title: "Completados", orders: completado },
    ]);
  }, [pendiente, enProgreso, completado]);

  //useEffect para actualizar los pedidos cada 10 segundos
  useEffect(() => {
    let interval;

    const fetchOrders = async () => {
      if (await isTokenExpired()) {
        await refreshToken();
      }
      let token = await getToken();

      try {

        const response = await fetch(
          `https://marlin-backend.vercel.app/api/delivery-orders/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access}`,
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const updatedOrders = await response.json();
        const pendientes = updatedOrders.filter(order => order.status === "Pendiente");
        setPendiente(updatedOrders);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (online) {
      // Llama a `fetchOrders` inmediatamente y luego cada 10 segundos
      fetchOrders(); // Llama inmediatamente
      interval = setInterval(fetchOrders, 10000); // Intervalo cada 10 segundos
    }

    // Limpia el intervalo al desmontar el componente
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [online]);

  useEffect(() => {
    console.log("Estado pendiente actualizado:", pendiente);
  }, [pendiente]);

  // funcion para rechazar una orden
  const handleRejectOrder = (orderId) => {
    setMisOrdenes((prevMisOrdenes) => {
      const updatedMisOrdenes = prevMisOrdenes.map((category) => {
        if (category.title === "Pendientes") {
          return {
            ...category,
            orders: category.orders.filter((order) => order.id !== orderId),
          };
        }
        return category;
      });
      return updatedMisOrdenes;
    });
  };
  // ------------------------------------------------------------------------

  const aceptOrder = async (orderId) => {
    if (await isTokenExpired()) {
      await refreshToken();
    }
    let token = await getToken();

    try {

      const response = await fetch(
        `https://marlin-backend.vercel.app/api/accept-delivery/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
          body: JSON.stringify({
            delivery_order_id: orderId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      //logica para consultar pedidos a en progreso
      alert('Orden aceptada con éxito, dirigite a la tienda para recoger el pedido');

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  // funcion para aceptar una orden
  const handleAcceptOrder = (orderId) => {

    aceptOrder(orderId);

    setMisOrdenes((prevMisOrdenes) => {
      const updatedMisOrdenes = prevMisOrdenes.map((category) => {
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
          const orderToMove = prevMisOrdenes.find((cat) => cat.title === "Pendientes").orders.find((order) => order.id === orderId);
          if (orderToMove) {
            return {
              ...category,
              orders: [...category.orders, orderToMove],
            };
          }
        }
        return category;
      });
      return updatedMisOrdenes;
    });
  };
  // ------------------------------------------------------------------------

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    // aqui va la lista de notificaciones
  ]);

  // Función para manejar el clic en una notificación
  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };
  // ------------------------------------------------------------------------

  // Función para manejar el scroll
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentPage(pageIndex);
  };
  // ------------------------------------------------------------------------

  // funcion para manejar la conexion
  useEffect(() => {
    console.log(online);
  }, [online]);
  // ------------------------------------------------------------------------

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
        {misOrdenes.map((store, storeIndex) => (
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
                                source={{ uri: item.order_id.store_photo }}
                                style={{
                                  width: 100,
                                  height: 100,
                                  resizeMode: "stretch",
                                }}

                              />
                            </View>
                            <View className="ml-2">
                              <Text className="font-Excon_bold text-base dark:text-white">
                                {item.order_id.order_num}
                              </Text>
                              <Text className="font-Excon_regular text-sm dark:text-white">
                                Usuario: {item.order_id.user_name}
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
        {misOrdenes.map((_, index) => {
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