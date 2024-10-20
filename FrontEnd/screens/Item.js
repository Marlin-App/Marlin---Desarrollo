import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Modal, Alert, ScrollView, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styled, useColorScheme } from "nativewind";
import useCart from '../hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ItemPage({ navigation }) {
    const { addToCart, isSameStore, clearCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [fontsLoaded] = useFonts({
        'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
        'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
        'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
        'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
        'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
    });

    const { colorScheme } = useColorScheme();
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const route = useRoute();
    const { product } = route.params; // Recibir el producto desde la navegación

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
        if (!isLoggedIn) {
            Alert.alert('Error', 'Debes estar logueado para agregar productos al carrito.');
            return;
        }

        if (!selectedColor || !selectedSize) {
            Alert.alert('Error', 'Debes seleccionar un color y una talla.');
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
        addToCart({ ...product, cantidad: quantity, formattedTotalPrice, selectedColor, selectedSize });
    };

    const unitPrice = Number(product.price.replace(/[^0-9]/g, ''));
    const totalPrice = unitPrice * quantity;

    const formattedTotalPrice = totalPrice.toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC',
        maximumFractionDigits: 0
    });

    const colors = product.variation
      .map(variation => 
        variation.item_variations.filter(itemVar => itemVar.attribute_name === 'Color').map(itemVar => itemVar.value)
      )
      .flat();

    const sizes = product.variation
      .map(variation => 
        variation.item_variations.filter(itemVar => itemVar.attribute_name === 'Talla').map(itemVar => itemVar.value)
      )
      .flat();

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
                            <View className="flex-row justify-center gap-2">
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
                    <FlatList
                        data={product.pictures} 
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image
                                className="w-[310] h-[310] rounded-3xl bg-black mt-10 mb-3 mr-3"
                                source={{ uri: item.picture }}
                                resizeMode="stretch"
                                onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                            />
                        )}
                    />

                    <Text className="text-xl pl-1 font-Excon_bold dark:text-white">{product.name}</Text>
                    <Text className="text-sm pl-1 font-Excon_regular dark:text-white">{product.description}</Text>

                    <View className="pl-1 pr-1 mt-2">
                        <Text className="text-lg font-Excon_bold dark:text-white">Color:</Text>
                        <View className="flex-row flex-wrap mt-1">
                            {colors.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedColor(color)}
                                    className={`mr-2 mb-2 py-2 px-4 rounded-full ${
                                        selectedColor === color ? 'bg-light-blue dark:bg-main-blue' : 'bg-neutral-300 dark:bg-neutral-600'
                                    }`}
                                >
                                    <Text className="text-main-blue dark:text-white font-Excon_bold">{color}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="pl-1 pr-1 mt-2">
                        <Text className="text-lg font-Excon_bold dark:text-white">Talla:</Text>
                        <View className="flex-row flex-wrap mt-1">
                            {sizes.map((size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedSize(size)}
                                    className={`mr-2 mb-2 py-2 px-4 rounded-full ${
                                        selectedSize === size ? 'bg-light-blue dark:bg-main-blue' : 'bg-neutral-300 dark:bg-neutral-600'
                                    }`}
                                >
                                    <Text className="text-main-blue dark:text-white font-Excon_bold">{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                            value={quantity.toString()}
                            editable={false}
                        />
                        <TouchableOpacity
                            className="rounded-r-2xl bg-[#d7d7d7] py-1 px-3 dark:bg-dk-blue"
                            onPress={increaseQuantity}
                        >
                            <Text className="text-main-blue dark:text-white text-3xl">+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className="bg-white  rounded-xl px-4 py-2 dark:bg-main-blue"
                        onPress={vericarCarrito}
                    >
                        <Text className="text-main-blue text-lg font-Excon_regular dark:text-white">Agregar al Carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
