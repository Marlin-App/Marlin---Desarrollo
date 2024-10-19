import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useCart from '../hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ItemPage({ navigation }) {
    const { addToCart, isSameStore, clearCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [fontsLoaded] = useFonts({
        'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
        'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
        'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
        'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
        'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
    });

    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const route = useRoute();
    const { product, images } = route.params;

    useEffect(() => {
        async function checkLoginStatus() {
            const userToken = await AsyncStorage.getItem('@userToken');
            setIsLoggedIn(userToken !== null);
        }
        checkLoginStatus();

        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const vericarCarrito = () => {
        console.log('isLoggedIn:', isLoggedIn); 
        console.log('product:', product);

        if (!isLoggedIn) {
            Alert.alert('Error', 'Debes estar logueado para agregar productos al carrito.');
            return;
        }

        if (isSameStore(product.store_id)) {
            handleAddToCart();
        } else {
            setModalVisible2(true);
        }
    };

    const handleAddToCart = () => {
        setModalVisible(true);
        addToCart({ ...product, cantidad: quantity });
    };

    const unitPrice = Number(product.price.replace(/[^0-9]/g, ''));
    const totalPrice = unitPrice * quantity;

    const formattedTotalPrice = totalPrice.toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC',
        maximumFractionDigits: 0
    });
    console.log(images.item_images);

    return (
        <View className="flex-grow-1 bg-white dark:bg-neutral-950 h-full" onLayout={onLayout}>
            <ScrollView className="mb-20">
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg p-6 shadow-lg w-[80vw] dark:bg-dk-main-bg">
                            <View className="justify-center items-center">
                                <View className="border-b-[0.5px] dark:border-light-blue w-full mb-4">
                                    <Text className="text-lg text-center font-Excon_bold mb-2 dark:text-white">¡Producto Agregado!</Text>
                                </View>
                                <Text className="text-md font-Excon_regular mb-4 dark:text-white">Se agregó el {product.name} al carrito.</Text>
                            </View>
                            <View className="flex-row justify-center">
                                <TouchableOpacity
                                    className="bg-main-blue dark:bg-light-blue rounded-lg px-4 py-2"
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.goBack();
                                    }}
                                >
                                    <Text className="text-white font-Excon_regular">Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible2}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg p-6 shadow-lg w-[80vw]">
                            <View className="justify-center items-center">
                                <View className="border-b-[0.5px] w-full mb-4">
                                    <Text className="text-lg text-center font-Excon_bold mb-2">¡Atención!</Text>
                                </View>
                                <Text className="text-md font-Excon_regular mb-4">Este producto pertenece a una tienda distinta. Si decides crear un nuevo carrito, perderás los productos guardados hasta ahora!</Text>
                            </View>
                            <View className="flex-row justify-center">
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={async () => {
                                        await clearCart();
                                        handleAddToCart();
                                        navigation.goBack();
                                    }}
                                >
                                    <Text className="text-white font-Excon_regular">Nuevo Carrito</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={() => {
                                        setModalVisible2(false);
                                    }}
                                >
                                    <Text className="text-white font-Excon_regular">Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View className="px-8">
                    <Image
                        className="w-full h-[300] rounded-3xl bg-black mt-10 mb-3"
                        source={{ uri: product.picture }}
                        resizeMode="cover"
                        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                    />
                    <Text className="text-xl pl-1 font-Excon_bold dark:text-white">{product.name}</Text>
                    <Text className="text-sm pl-1 font-Excon_regular dark:text-white">{product.description}</Text>

                    <Text className="text-base font-bold pl-1 mt-3 dark:text-white">Color</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-black mx-1 dark:border-2 border-white" />
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-red-600 mx-1" />
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-blue-700 mx-1" />
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bg-main-blue dark:bg-dk-main-bg p-5 w-full bottom-0">
                <Text className="text-xl font-bold text-white mb-4">Precio: {formattedTotalPrice}</Text>

                <View className="flex-row justify-between pb-3">
                    <View className="flex-row ">
                        <TouchableOpacity
                            className="rounded-l-2xl bg-[#d7d7d7] py-1 px-3 dark:bg-dk-blue"
                            onPress={decreaseQuantity}
                        >
                            <Text className="text-main-blue dark:text-white text-3xl">-</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="w-16 text-center text-lg bg-white text-main-blue dark:bg-main-blue dark:text-white"
                            keyboardType="numeric"
                            value={String(quantity)}
                            onChangeText={(value) => {
                                const numericValue = Number(value.replace(/[^0-9]/g, ''));
                                setQuantity(isNaN(numericValue) || numericValue < 1 ? 1 : numericValue);
                            }}
                        />
                        <TouchableOpacity
                            className="rounded-r-2xl bg-[#d7d7d7] py-1 px-3 dark:bg-dk-blue"
                            onPress={increaseQuantity}
                        >
                            <Text className="text-main-blue dark:text-white text-3xl">+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="bg-white rounded-3xl py-2 px-4"
                        onPress={vericarCarrito}
                    >
                        <Text className="text-main-blue text-lg font-bold">Agregar al carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
