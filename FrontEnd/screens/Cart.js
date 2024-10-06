import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable, FlatList, Image, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useCart from '../hooks/useCart';

export function CartScreen({ navigation }) {

    const { cart, increaseQuantity, decreaseQuantity, total: cartTotal } = useCart();

    const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });


    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        const initializeCart = async () => {
            /*  await clearCart(); */

            //addToCart(product);
        };

        initializeCart();
    }, []);

    const deliveryFee = 250;
    const transportFee = 750;
    const total = cartTotal + deliveryFee + transportFee;

    const CartItem = ({ item }) => {
        return (
            <View className="mx-4 my-2 rounded-lg border-2 border-main-blue p-2" onLayout={onLayoutRootView}>
                <View className="items-end justify-end">
                    <Entypo name="dots-three-vertical" size={15} color="#015DEC" />
                </View>
                <View className="flex-row">
                    <View className="rounded-lg shadow-lg shadow-gray-400">
                        <Image
                            source={{ uri: item.picture }}
                            className="rounded-lg"
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <View className="ml-2 flex-1">
                        <Text className="text-[16px] ml-2 font-Excon_regular">{item.name}</Text>
                        <View className="flex-row justify-between mt-4 flex-1">
                            <View className="items-center">
                                <View className="rounded-lg h-6 w-7 items-center">
                                    <View className="rounded-full h-4 w-4 bg-black"></View>
                                </View>
                                <Text className="font-Erode_regular text-gray-600 ml-2">Color</Text>
                            </View>
                            <View className="items-center">
                                <View className="rounded-md h-6 w-7 bg-main-blue items-center justify-center">
                                    <Text className="font-Excon_regular text-[12px] text-white">M</Text>
                                </View>
                                <Text className="font-Erode_regular text-gray-600">Talla</Text>
                            </View>
                            <View className="items-center">
                                <View className="rounded-md h-6 w-20 bg-main-blue items-center flex-row">
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => decreaseQuantity(item.id)}
                                    >
                                        <Text className="text-white">-</Text>
                                    </Pressable>
                                    <Text className="font-Excon_regular text-[12px] text-white">{item.cantidad}</Text>
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => increaseQuantity(item.id)}
                                    >
                                        <Text className="text-white">+</Text>
                                    </Pressable>
                                </View>
                                <Text className="font-Erode_regular text-gray-600">Cantidad</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="items-end justify-end mt-2">
                    <Text className="font-Excon_regular">{item.price} CRC</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white" onLayout={onLayoutRootView}>
            <View className="flex-1 bg-white">
                <Text className="text-[24px] font-Excon_regular text-main-blue mt-4 text-center">Carrito</Text>
                
                {cart.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-[20px] font-Excon_regular text-main-blue">No hay productos en el carrito</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cart}
                            renderItem={CartItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 50 }}
                        />

                        <View className="mt-6 p-4 rounded-lg mx-4 border-t-2 border-slate-200">
                            <Text className="text-[20px] font-Excon_regular text-main-blue mb-4">Datos de entrega</Text>

                            <View className="flex-row gap-x-6 items-center mb-4">
                                <EvilIcons name="location" size={24} color="black" />
                                <View className="flex-1">
                                    <Text className="font-Erode_regular text-gray-800 font-bold text-base">Ubicación de entrega</Text>
                                    <Text className="font-Erode_regular text-gray-800 w-60">
                                        Direccion ramdom, por puntarenas, Costa Rica
                                    </Text>
                                </View>
                                <Pressable onPress={() => {
                                    Alert.alert('Cambiar ubicación', 'Implementa la lógica para cambiar la ubicación.');
                                }}>
                                    <Text className="font-Erode_regular text-main-blue">Cambiar</Text>
                                </Pressable>
                            </View>

                            <View className="flex-row gap-x-6 items-center">
                                <FontAwesome5 name="search-location" size={20} color="black" />
                                <View className="flex-1">
                                    <Text className="font-Erode_regular text-gray-800 font-bold text-base">Indicaciones para la entrega</Text>
                                    <Text className="font-Erode_regular text-gray-800 w-60">Casa de latas de zinc color rosado, junto a un palo de mango</Text>
                                </View>
                                <Pressable onPress={() => {
                                    Alert.alert('Cambiar indicaciones', 'Implementa la lógica para cambiar las indicaciones.');
                                }}>
                                    <Text className="font-Erode_regular text-main-blue">Cambiar</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View className="mt-6 p-4 bg-gray-100 rounded-lg mx-4 mb-2">
                            <Text className="text-[20px] font-Excon_regular text-main-blue mb-4">Resumen</Text>
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Erode_regular text-gray-800">Precio de productos:</Text>
                                <Text className="font-Erode_regular text-gray-800">₡{cartTotal}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Erode_regular text-gray-800">Tarifa de entrega:</Text>
                                <Text className="font-Erode_regular text-gray-800">₡{deliveryFee}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Erode_regular text-gray-800">Tarifa de transporte:</Text>
                                <Text className="font-Erode_regular text-gray-800">₡{transportFee}</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>

            {cart.length > 0 && (
                <View className="bg-main-blue p-4">
                    <View className="flex-row justify-between mb-4">
                        <Text className="font-Excon_regular text-[20px] text-white">Total a pagar:</Text>
                        <Text className="font-Excon_regular text-[20px] text-white">₡{total}</Text>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('Pay')}
                        className="bg-white p-4 rounded-md mb-2"
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Text className="text-main-blue font-Excon_regular text-[20px] text-center">Pagar</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );

}
