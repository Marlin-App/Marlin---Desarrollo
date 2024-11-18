import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { useColorScheme } from "nativewind";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import useCart from '../hooks/useCart';
import useItems from '../hooks/useItems';
import useStores from '../hooks/useStores';
import HomeCarousel from '../components/CarouselHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import NotificationDropdown from '../components/NotificationDropdown';
import loaderGif from '../assets/loader.gif';
export function HomeScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const isFocused = useIsFocused();
    const [isLogged, setIsLogged] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const logo = colorScheme === 'dark' ? require('../assets/logoDark.png') : require('../assets/LogoLight.png');

    // Función para obtener el token
    useEffect(() => {
        const fetchUserToken = async () => {
            const token = await AsyncStorage.getItem('@userToken');
            setIsLogged(token);
        };
        fetchUserToken();
    }, [navigation, isFocused]);

   

    // ------------------------------------------------------------------------

    // Función para obtener la cantidad de productos en el carrito
    const {
        getCarLength
    } = useCart();
    // ------------------------------------------------------------------------

    const { data: items, loading, error } = useItems();
    const { data: stores } = useStores();

    useEffect(() => { 
        navigation.setOptions({
       tabBarStyle: { display: loading ?  "none" : "flex",
         backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#1952BE',
         height: 80,
         justifyContent: "space-around",
         paddingBottom: 10,
       },
     
     });
 
       }, [loading]);

    // Función para obtener las notificaciones
    const [notifications, setNotifications] = useState([
        // Aquí puedes agregar las notificaciones
    ]);
    // ------------------------------------------------------------------------

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

    // Función para dividir un array en partes de tamaño divisionSize
    const division = (array, divisionSize) => {
        const part = [];
        for (let i = 0; i < array.length; i += divisionSize) {
            part.push(array.slice(i, i + divisionSize));
        }
        return part;
    };
    // ------------------------------------------------------------------------

    // Datos para el carrusel
    const verticalData = [
        {
            id: "1",
            title: "Categorias",
            type: "category",
            horizontalData: [
                {
                    id: "1a",
                    title: "Cat 1",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1b",
                    title: "Cat 2",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1c",
                    title: "Cat 3",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1d",
                    title: "Cat 4",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
            ],
        },
        {
            id: '2',
            title: 'Productos para ti',
            type: 'product',
            horizontalData: items.map(item => ({
                id: item.id.toString(),
                name: item.name,
                description: item.description,
                baseprice: item.price,
                price: `${Number(item.price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })}`,
                picture: item.item_images[0]?.picture,
                pictures: item.item_images,
            }))
        },
        {
            id: "3",
            title: "Tiendas destacadas",
            type: "store",
            horizontalData: stores.slice(0, 3).map(store => ({
                id: store.id.toString(),
                title: store.name,
                image: store.picture,
                name: store.name,
                canton: store.canton,
                district: store.district,
                picture: store.picture,
                num_sinpe: store.num_sinpe,
                owner_sinpe: store.owner_sinpe,
                type: store.store_type,
                banner: store.banner,

            })),
        },
    ];
    // ------------------------------------------------------------------------

    // Función para formatear los items
    const renderHorizontalItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Item', { id: item.id })}>
            <View className="my-2 mx-4 items-start">
                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] dark:bg-neutral-900 p-[2px]">
                    <Image
                        source={{ uri: item.picture }}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text
                    className="text-lg font-Excon_bold text-left text-light-blue dark:text-white w-40"
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {item.name}
                </Text>
                <Text className="text-sm text-left text-light-blue dark:text-white font-Erode_bold">{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
    // ------------------------------------------------------------------------

    // Función para formatear las tiendas
    const renderStoreItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Store', { id: item.id, store: item })}>
            <View className="my-2 mx-4 items-center">
                <View className="bg-white rounded-lg shadow-lg w-40 h-40 p-2">
                    <Image
                        source={{ uri: item.image }}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />
                </View>
                <Text className="text-lg font-bold text-center text-light-blue dark:text-white mt-2">{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
    // ------------------------------------------------------------------------

    // Función para renderizar los apartados
    const renderVerticalItem = ({ item }) => {
        if (item.type === "product") {
            const largo = division(item.horizontalData, 10);

            return (
                <View className="p-2 my-2">
                    <Text className="ml-4 mt-2 mb-4 text-2xl font-Excon_bold text-main-blue dark:text-dk-blue">{item.title}</Text>
                    {largo.map((largo, index) => (
                        <FlatList
                            key={`product-chunk-${index}`}
                            data={largo}
                            renderItem={renderHorizontalItem}
                            keyExtractor={(horizontalItem) => horizontalItem.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginBottom: 10 }}
                        />
                    ))}
                </View>
            );
        } else if (item.type === "store") {
            return (
                <View className="p-2 my-2">
                    <Text className="ml-4 mt-2 mb-4 text-2xl font-Excon_bold text-main-blue dark:text-dk-blue">{item.title}</Text>
                    <FlatList
                        data={item.horizontalData}
                        renderItem={renderStoreItem}
                        keyExtractor={(horizontalItem) => horizontalItem.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            );
        }

        return null;
    };
    // ------------------------------------------------------------------------

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">

            <View className={`bg-main-blue absolute z-10 w-full h-full justify-center items-center  ${loading ? "flex" : "hidden"}`}>
                <Image source={loaderGif} style={{ width: 300, height: 300 }} />
            </View>

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
                        <Image className="w-12 h-10 ml-2" source={logo} />
                        <Text className="text-white dark:text-dk-blue text-2xl font-Outfit-medium">
                            Marlin
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-6 relative">
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Ionicons name="notifications-outline" size={25} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            {notifications.length > 0 && (
                                <View className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </TouchableOpacity>
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={
                                isLogged ? () => navigation.navigate("Cart") : () => navigation.navigate("Landing")
                            }>
                                <Feather name="shopping-cart" size={26} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            </Pressable>
                            {getCarLength() > 0 ? (
                                <View className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-red-600 rounded-full items-center justify-center">
                                    <Text className="text-white text-xs font-bold">{getCarLength()}</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>

            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                <HomeCarousel navigation={navigation} />
                <FlatList
                    data={verticalData}
                    renderItem={renderVerticalItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
}

export default HomeScreen;