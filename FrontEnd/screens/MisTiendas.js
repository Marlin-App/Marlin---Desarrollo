import { Text, View, Pressable, FlatList, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from 'react';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useCRUDTiendas from '../hooks/useCRUDTiendas';
import NotificationDropdown from '../components/NotificationDropdown';

export function MisTiendas({ navigation }) {
    const { colorScheme } = useColorScheme();
    const { allStores, loading, getUserStores, setAllStores } = useCRUDTiendas();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        // Notificaciones de ejemplo
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

    // llama a la función getUserStores al montarse el componente
    useEffect(() => {
        const fetchStores = async () => {
            await getUserStores();
        };
        const focusListener = navigation.addListener('focus', fetchStores);
    }, [navigation]);
    // ------------------------------------------------------------------------

    // Función para formatear las tiendas
    const renderStoreItem = ({ item }) => (
        <View className="relative">
            <View className="absolute h-[150] w-[425] items-center justify-center">
                <Text className={`text-black text-2xl font-Excon_bold dark:text-white ${item.status === 'Aceptado' ? 'hidden' : ''}`}>Tienda en espera...</Text>
            </View>
            <Pressable
                className={`flex-row justify-center px-4 mb-5 ${item.status === 'Aceptado' ? 'opacity-100' : 'opacity-30'}`}
                onPress={() => item.status === 'Aceptado' ? navigation.navigate("NuevaTienda", { store: item }) : alert(`${item.name} esta siendo validada por nuestro equipo, pronto estará disponible.`)}
            >
                <View className="flex-col w-full">
                    <Image className="rounded-xl h-[150]" source={{ uri: item.banner }} style={{ resizeMode: "stretch" }} />
                    <Text className="text-black text-lg font-Excon_bold dark:text-white">{item.name}</Text>
                    <Text className="text-black text-md font-Excon_regular dark:text-white">{item.canton} {item.district}</Text>
                </View>
            </Pressable>
        </View>
    );
    // ------------------------------------------------------------------------

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
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw] dark:text-light-blue">
                            ¡Aquí inicia el camino al emprendimiento!
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

            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4 dark:text-white">Mis tiendas</Text>

            <FlatList
                data={allStores}
                renderItem={renderStoreItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 4, marginTop: 4 }}
            />

            <TouchableOpacity className="bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2" onPress={() => navigation.navigate("NuevaTienda")}>
                <MaterialIcons name="store-mall-directory" size={30} color="white" />
                <Text className="text-white font-Excon_bold text-lg ml-2">Agregar nueva tienda</Text>
            </TouchableOpacity>
        </View>
    );
}