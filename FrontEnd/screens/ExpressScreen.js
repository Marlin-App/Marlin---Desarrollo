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
} from "react-native";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Animated, Modal, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCRUDProductos } from "../hooks/useCRUDProductos";
import NotificationDropdown from '../components/NotificationDropdown';
import React, { useEffect, useCallback, useState, useRef } from "react";

export function ExpressScreen({ navigation }) {
  //   const { colorScheme } = useColorScheme();
  //   const [envios, setEnvios]=useState([
  //     1,2,3
  //   ])

  //   const goToPage = (page) => {
  //     setCurrentPage(page);
  //     if (scrollViewRef.current) {
  //       scrollViewRef.current.scrollTo({ x: page * screenWidth, animated: true });
  //     }
  //   };

  //   const handleScroll = (event) => {
  //     const contentOffsetX = event.nativeEvent.contentOffset.x;
  //     const pageIndex = Math.round(contentOffsetX / screenWidth);
  //     setCurrentPage(pageIndex);
  //   };

  //   return (
  //     <View className="flex-1 bg-white dark:bg-neutral-950">
  //       <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-main-bg py-8">
  //         <View className="flex-row justify-between w-full">
  //           <View className="flex-row items-center">
  //             <Text className="text-white dark:text-light-blue text-2xl font-Excon_bold w-[80vw]">
  //               ¡Bienvenido a Marlin, aqui puedes ver los pedidos!
  //             </Text>
  //           </View>
  //           <View className="flex-row items-center justify-center gap-x-4 mr-2">
  //             <Ionicons
  //               name="notifications-outline"
  //               size={24}
  //               color={colorScheme === "dark" ? "#5186EC" : "white"}
  //             />
  //           </View>
  //         </View>
  //       </View>

  //       <View className="mt-6">
  //         <View className="px-8 justify-between items-center flex-row gap-x-4">
  //           <Text className="font-Excon_bold text-base dark:text-white">
  //             Pedidos por Aceptar
  //           </Text>
  //           <Ionicons name="filter" size={24} color="white" />
  //         </View>
  //         <ScrollView className="flex-col p-4 mx-5 rounded-lg mb-4">
  //           <View className="flex-row justify-center mb-1">
  //             <View className="flex-row justify-between mt-2 px-4 py-4 border-[0.5px] border-main-blue dark:border-light-blue w-full items-center rounded-md ">
  //               <View className="flex-row">
  //                 <View className=" justify-center item-center bg-blue-800 rounded-lg dark:bg-neutral-900">
  //                   <Image
  //                     style={{
  //                       width: 100,
  //                       height: 100,
  //                       resizeMode: "stretch",
  //                     }}
  //                   />
  //                 </View>
  //                 <View className="px-6">
  //                   <Text className="font-Excon_bold text-base dark:text-white">
  //                     Nombre de la tienda
  //                   </Text>
  //                   <Text className="font-Excon_regular text-sm dark:text-white">
  //                     Producto: Nombre Producto
  //                   </Text>
  //                   <Text className="font-Excon_regular text-sm dark:text-white">
  //                     Usuario: Nombre Cliente
  //                   </Text>
  //                   <View className="flex-row mt-3">
  //                     <TouchableOpacity
  //                       onPress={() => navigation.navigate("TerminosCondiciones")}
  //                     >
  //                       <Text className="font-Excon_regular text-sm text-white dark:text-white bg-main-blue px-4 py-1 rounded-xl mr-2 ">
  //                         Aceptar
  //                       </Text>
  //                     </TouchableOpacity>
  //                     <TouchableOpacity>
  //                       <Text className="font-Excon_regular text-sm text-white dark:text-white bg-main-red px-2 py-1 rounded-xl">
  //                         No Aceptar
  //                       </Text>
  //                     </TouchableOpacity>
  //                   </View>
  //                 </View>
  //               </View>
  //             </View>
  //           </View>
  //         </ScrollView>
  //         <View className="flex-row justify-center mt-4">
  //           {envios.map((_, index) => {
  //             // Animación del tamaño del punto
  //             const dotWidth = scrollX.interpolate({
  //               inputRange: [
  //                 (index - 1) * screenWidth,
  //                 index * screenWidth,
  //                 (index + 1) * screenWidth,
  //               ],
  //               outputRange: [8, 16, 8],
  //               extrapolate: "clamp",
  //             });

  //             const dotOpacity = scrollX.interpolate({
  //               inputRange: [
  //                 (index - 1) * screenWidth,
  //                 index * screenWidth,
  //                 (index + 1) * screenWidth,
  //               ],
  //               outputRange: [0.3, 1, 0.3],
  //               extrapolate: "clamp",
  //             });

  //             return (
  //               <Animated.View
  //                 className="mb-4"
  //                 key={index}
  //                 style={{
  //                   width: dotWidth,
  //                   height: 8,
  //                   borderRadius: 4,
  //                   backgroundColor: "#015DEC",
  //                   marginHorizontal: 4,
  //                   opacity: dotOpacity,
  //                 }}
  //               />
  //             );
  //           })}
  //         </View>
  //       </View>
  //     </View>
  //   );

  const [modalVisible, setModalVisible] = useState(false);
  const { deleteProduct, fetchStoresWithProducts, storesWithProducts } =
    useCRUDProductos();
  const [longPressProduct, setLongPressProduct] = useState(null);
  const { colorScheme } = useColorScheme();
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);

  const [prueba, setprueba] = useState([
    { title: "Pendientes", pedidos: [1] },
    { title: "En Progreso", pedidos: [1] },
    { title: "Completados", pedidos: [1] },
  ]);
  // const [prueba, setprueba]=useState([{title:"Pendientes",pedidos:[1,2,3]},{title:"En Progreso",pedidos:[{tienda:"Bazar marta",destinatario:"Jeremy Guzman", detalle:[informacion del pedido de la api de Jere]}]},{title:"Completados",pedidos:[1,2,3,4,5]}])
  console.log("storeWithproducts:", prueba);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const notifications = [
        {
            id: 1,
            title: "Notificación 1",
            description: "Descripción de la notificación 1",
        }
    ];

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
  return (
    <View className="bg-white dark:bg-neutral-950 h-full">
      <NotificationDropdown
                notifications={notifications}
                isDropdownVisible={isDropdownVisible}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
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
                            <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
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
          className="h-[40vh]"
          data={store.pedidos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ScrollView className="flex-col p-4 rounded-lg mb-4">
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
                          Nombre de la tienda
                        </Text>
                        <Text className="font-Excon_regular text-sm dark:text-white">
                          Usuario: Nombre Cliente
                        </Text>
                        <Text className="font-Excon_regular text-sm dark:text-white underline">
                          Más información
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-center gap-x-4 mt-3">
                      {/* Botones de Aceptar / No Aceptar para la primera vista y basados en scroll para las demás */}
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("TerminosCondiciones")
                        }
                      >
                        <Text
                          className={`font-Excon_regular text-sm text-white dark:text-white px-4 py-1 rounded-xl mr-2 ${
                            storeIndex === 0 || scrollX._value / screenWidth === storeIndex
                              ? "bg-main-blue"
                              : "bg-main-gray"
                          }`}
                        >
                          Aceptar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text
                          className={`font-Excon_regular text-sm text-white dark:text-white px-2 py-1 rounded-xl ${
                            storeIndex === 0 || scrollX._value / screenWidth === storeIndex
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
