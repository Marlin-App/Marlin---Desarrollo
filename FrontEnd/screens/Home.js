import React, { useEffect, useCallback, useState } from 'react';
import { Button, Text, TextInput, View, FlatList, Image, ScrollView, TouchableOpacity, Pressable, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useCart from '../hooks/useCart';
import useItems from '../hooks/useItems';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeCarousel from '../components/CarouselHome';

export function HomeScreen({ navigation }) {
    const { colorScheme } = useColorScheme();

    
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addToCart,
        total,
    } = useCart();

    const { data: items, loading, error } = useItems();

    /*  const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });  */

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const notifications = [
        // aqui se tendrian que cargar las notificaciones xd
    ];


    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    const NotificationDropdown = () => (
        <Modal
            transparent={true}
            visible={isDropdownVisible}
            animationType="fade"
            onRequestClose={closeDropdown}
        >
            <TouchableWithoutFeedback onPress={closeDropdown}>
                <View className="flex-1 justify-start items-end p-4 bg-[#00000070]">

                    <TouchableWithoutFeedback>
                        <View className="w-72 bg-white rounded-lg shadow-lg max-h-96 dark:bg-black">
                            <Text className="text-xl font-Excon_bold px-4 py-2 border-b text-main-blue dark:text-light-blue dark:border-main-blue">Notificaciones</Text>
                            <FlatList
                                data={notifications}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View className="px-4 py-2 border-b border-gray-200 dark:border-light-blue">
                                        <Text className="font-semibold text-gray-800">{item.title}</Text>
                                        <Text className="text-gray-400">{item.description}</Text>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <View className="px-4 py-4 items-center">
                                        <Text className="text-gray-600 dark:text-[#d6d6d6]">No tienes notificaciones nuevas.</Text>
                                    </View>
                                }
                            />
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );


    const division = (array, divisionSize) => {
        const parte = [];
        for (let i = 0; i < array.length; i += divisionSize) {
            parte.push(array.slice(i, i + divisionSize));
        }
        return parte;
    };


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
                stock: item.stock,
                picture: item.picture,
                store_id: item.store_id,
                item_type: item.item_type
            }))
        },
        {

            id: "3",
            title: "Tiendas destacadas",
            type: "store",
            horizontalData: [
                {
                    id: "3a",
                    title: "Tienda 1",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "3b",
                    title: "Tienda 2",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "3c",
                    title: "Tienda 3",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
            ],
        },
    ];


    const renderHorizontalItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Item', { product: item })}>
            <View className="my-2 mx-4 items-start">
                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px]">
                    <Image
                        source={{ uri: item.picture }}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text
                    className="text-lg font-Excon_bold  text-left text-light-blue dark:text-white w-40"
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {item.name}
                </Text>
                <Text className="text-sm text-left text-light-blue dark:text-white font-Erode_bold">{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderStoreItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Store', { store: item })}>
            <View className="my-2 mx-4 items-center">
                <View className="bg-white rounded-lg shadow-lg w-40 h-40 p-2">
                    <Image
                        source={item.image}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />
                </View>
                <Text className="text-lg font-bold text-center text-light-blue dark:text-white mt-2">{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderVerticalItem = ({ item }) => {
        if (item.type === "product") {
            const largo = division(item.horizontalData, 10);

            return (
                <View className="p-2 my-2" /*onLayout={onLayout}*/>
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
                <View className="p-2 my-2" /* onLayout={onLayout} */>
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

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <NotificationDropdown />
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-tab py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-dk-blue text-lg font-Excon_regular">
                            Carr. Interamericana Norte
                        </Text>
                        <AntDesign name="down" size={18} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 relative">
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"}/>
                            {notifications.length > 0 && (
                                <View className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </TouchableOpacity>
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={() => navigation.navigate("Cart")}>
                                <Feather name="shopping-cart" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            </Pressable>
                            <Text
                                className={`absolute left-4 w-3 h-3 rounded-full mb-5 text-white ${cart.length > 1 ? "bg-red-600" : "bg-transparent"
                                    }`}
                            >
                                {" "}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {loading ? (
                <View className="w-full h-full justify-center items-center bg-white">
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            ) : null}

            <ScrollView>
                <HomeCarousel navigation={navigation} />
                <FlatList
                    data={verticalData}
                    scrollEnabled={false}
                    renderItem={renderVerticalItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                /> 
            </ScrollView>
        </View>
    );


}
