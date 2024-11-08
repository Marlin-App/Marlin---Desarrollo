
import { Text, View, FlatList, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import NotificationDropdown from '../components/NotificationDropdown';
import useOrders from '../hooks/useOrders';
export function HomeComercianteScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const [filter, setFilter] = useState("Completado");
    const {orders} = useOrders([]);
 

    
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
    const [orderFiler, setOrderFilter] = useState(orders);


    useEffect(() => {
            const filteredOrders = orders.filter(order => order.status === filter);
            setOrderFilter(filteredOrders);
        
    }, [filter]);

    const dateForm = (order_date) => {    
        const date = new Date(order_date);

        // Opciones de formato para mostrar mes, día y hora
        const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        
        // Formatear la fecha
      const formattedDate = date.toLocaleString('es-ES', options);
      return `${formattedDate.slice(0, 15)}...`;
    }


    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <NotificationDropdown
                notifications={notifications}
                isDropdownVisible={isDropdownVisible}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
                onNotificationClick={handleNotificationClick}
            />
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-tab py-8">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-light-blue text-2xl font-Excon_bold w-[80vw]">
                            ¡Bienvenido a Marlin emprendedor!
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
            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4 dark:text-light-blue">Tus pedidos</Text>
            <View className="flex-row justify-center gap-x-2 p-4 mt-4 ">
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Completado" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Completado")} >
                    <Text className="font-Excon_thin text-sm dark:text-white">Completados</Text>
                </Pressable>
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Pendiente" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Pendiente")}>
                    <Text className="font-Excon_thin text-sm dark:text-white">Pendientes</Text>
                </Pressable>
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Cancelado" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Cancelado")}>
                    <Text className="font-Excon_thin text-sm dark:text-white">Cancelados</Text>
                </Pressable>
            </View>

            <ScrollView className="flex-col p-4 mx-5  border border-light-blue dark:border-main-blue rounded-lg mb-4">

                    <FlatList
                        data={orderFiler}
                        scrollEnabled={false}   
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        className=""
                        ListEmptyComponent={
                            <View className="items-center mt-4">
                                <Text className="text-gray-600 dark:text-gray-400">No hay pedidos</Text>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido", { order: item })}>
                                <View className="flex-row justify-between mt-2 px-4 py-4 border-[0.5px] border-[#D6D6D6] dark:border-light-blue w-full items-center rounded-md ">
                                    <View className="flex-row">
                                        <View className=" justify-center item-center dark:bg-neutral-900">
                                            <Image source={{uri: item.user_picture }} style={{ width: 100, height: 100, resizeMode: "stretch" }} />
                                        </View>
                                        <View className="px-6">
                                            <Text className="font-Excon_bold text-sm dark:text-white">Fecha: <Text className="font-Excon_thin text-sm">{dateForm(item.order_date)} </Text></Text>
                                            <Text className="font-Excon_bold text-sm dark:text-white">Estado: <Text className="font-Excon_thin text-sm">{item.status} </Text></Text>
                                            <Text className="font-Excon_bold text-sm dark:text-white">Recibo: <Text className="font-Excon_thin text-sm">{item.order_num} </Text></Text>
                                            <Text className="font-Excon_thin text-sm dark:text-white">₡{item.total_price} - {item.products.length} productos</Text>
                                        </View>
                                    </View>

                                    <View className="flex-col gap-y-1 h-full">
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                    </View>

                                </View>
                            </Pressable>
                        )}
                    />
            </ScrollView>
        </View>
    );
}