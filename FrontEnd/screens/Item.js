import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, Image, TouchableOpacity, Modal, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useCart from '../hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

export function ItemPage({ navigation }) {
    const { addToCart, isSameStore, clearCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [item, setItem] = useState(null);
    const [maxQuantity, setMaxQuantity] = useState(0);

    const route = useRoute();
    const { id } = route.params;

    // Chequear si el usuario está logueado
    useEffect(() => {
        // Función para verificar el estado de inicio de sesión
        async function checkLoginStatus() {
            const userToken = await AsyncStorage.getItem('@userToken');
            setIsLoggedIn(userToken !== null);
        }
        checkLoginStatus();

        const fetchItem = async () => {
            try {
                const response = await fetch(`https://marlin-backend.vercel.app/api/storeItems/${id}/`);
                const result = await response.json();
                setItem(result);

                // Calcular el stock total
                const totalStock = result.variations.length > 0 
                    ? result.variations.reduce((acc, variation) => acc + variation.stock, 0) 
                    : result.stock;
                setMaxQuantity(totalStock);
     
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [id]);
    // ------------------------------------------------------------------------

    // Función para ocultar el splash
    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    // ------------------------------------------------------------------------

    // Función para cargar las fuentes
    const [fontsLoaded] = useFonts({
        'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
        'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
        'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
        'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
        'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
    });
    // ------------------------------------------------------------------------

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }

    if (!item) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No se encontró el ítem</Text>
            </View>
        );
    }

    // Funciones para aumentar la cantidad 
    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    // ------------------------------------------------------------------------

    // Funciones para disminuir la cantidad
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    // ------------------------------------------------------------------------

    // Funciones para agregar al carrito y verificar el carrito
    const verifyCart = () => {
        if (!isLoggedIn) {
            Alert.alert('Error', 'Debes estar logueado para agregar productos al carrito.');
            return;
        }

        // Verificar si el carrito pertenece a la misma tienda
        if (isSameStore(item.store_id)) {
            if (!item.variations.length) {
                handleAddToCart();
                return;
            }

            if (item.variations.length > 0) {
                const hasColorVariants = colors.length > 0;
                const hasSizeVariants = sizes.length > 0;

                if (hasColorVariants && !selectedColor) {
                    Alert.alert('Error', 'Debes seleccionar un color.');
                    return;
                }

                if (hasSizeVariants && !selectedSize) {
                    Alert.alert('Error', 'Debes seleccionar una talla.');
                    return;
                }
                handleAddToCart();
            }

        } else {
            setModalVisible2(true);
        }
    };
    // ------------------------------------------------------------------------

    // Funciones para agregar al carrito
    const handleAddToCart = () => {
        setModalVisible(true);

        const itemWithImage = {
            ...item,
            cantidad: quantity,
            image: item.item_images?.[0]?.picture,
            color: selectedColor,
            size: selectedSize
        };

        addToCart(itemWithImage);
    };
    // ------------------------------------------------------------------------

    const unitPrice = Number(item.price.toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }));
    const totalPrice = unitPrice * quantity;

    // Función para formatear el precio
    const formattedTotalPrice = totalPrice.toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC',
        maximumFractionDigits: 0
    });
    // ------------------------------------------------------------------------

    // Función para obtener los colores
    const colors = Array.from(new Set(
        item.variations
            .flatMap(variation => variation.item_variations.filter(itemVar => itemVar.attribute_name === 'Color').map(itemVar => itemVar.value))
    ));
    // ------------------------------------------------------------------------

    // Función para obtener las tallas
    const sizes = Array.from(new Set(
        item.variations
            .flatMap(variation => variation.item_variations.filter(itemVar => itemVar.attribute_name === 'Talla').map(itemVar => itemVar.value))
    ));
    // ------------------------------------------------------------------------

    const hasColors = colors.length > 0;
    const hasSizes = sizes.length > 0;

    return (
        <View className="flex-grow-1 bg-white dark:bg-neutral-950 h-full" onLayout={onLayout}>
            <ScrollView className="mb-32">
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
                                <Text className="text-md font-Excon_regular mb-4 dark:text-white">Se agregó el {item.name} al carrito.</Text>
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
                    <Swiper
                        className="my-4 h-[310]"
                        showsButtons={false}
                        loop={false}
                        dot={<View className="bg-gray-400 w-2 h-2 rounded-full m-1" />}
                        activeDot={<View className="bg-main-blue w-2 h-2 rounded-full m-1" />}
                    >
                        {item.item_images.map((image, index) => (
                            <View className="justify-center items-center" key={index}>
                                <Image source={{ uri: image.picture }} className="w-[310] h-[310] rounded-lg" />
                            </View>
                        ))}
                    </Swiper>
                    <Text className="text-xl pl-1 font-Excon_bold dark:text-white">{item.name}</Text>
                    <Text className="text-sm pl-1 font-Excon_regular dark:text-white">{item.description}</Text>

                    {hasColors && (
                        <View className="pl-1 pr-1 mt-2">
                            <Text className="text-lg font-Excon_bold dark:text-white">Color:</Text>
                            <View className="flex-row flex-wrap mt-1">
                                {colors.map((color, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`border rounded-lg h-8 w-20 mb-2 flex items-center justify-center mr-2 ${selectedColor === color ? 'border-main-blue' : 'border-black dark:border-light-blue'}`}
                                        style={{ backgroundColor: color }}
                                        onPress={() => setSelectedColor(color)}
                                    >
                                        <Text className={`font-Excon_regular ${selectedColor === color ? 'text-main-blue' : 'dark:text-white'}`}>{color}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {hasSizes && (
                        <View className="pl-1 pr-1 mt-2">
                            <Text className="text-lg font-Excon_bold dark:text-white">Talla:</Text>
                            <View className="flex-row flex-wrap mt-1">
                                {sizes.map((size, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`border rounded-lg h-8 w-20 mb-2 flex items-center justify-center mr-2 ${selectedSize === size ? 'border-main-blue' : 'border-black dark:border-light-blue'}`}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text className={`font-Excon_regular ${selectedSize === size ? 'text-main-blue' : 'dark:text-white'}`}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

            </ScrollView>
            <View className="absolute bg-main-blue dark:bg-dk-main-bg p-5 w-full bottom-0">
                <View className="flex-row mt-2 justify-between ">
                    <Text className="text-xl font-Excon_bold text-white">{formattedTotalPrice}</Text>
                    <View className="flex-row items-center bg-gray-100 dark:bg-dk-blue rounded-lg">
                        <TouchableOpacity
                            onPress={decreaseQuantity}
                            disabled={quantity <= 1}
                            className="bg-gray-200 dark:bg-main-blue rounded-l-lg w-8 h-8 flex items-center justify-center"
                        >
                            <Text className="text-main-blue dark:text-white font-Excon_bold text-lg">-</Text>
                        </TouchableOpacity>
                        <TextInput
                            value={String(quantity)}
                            onChangeText={text => setQuantity(Number(text))}
                            keyboardType="numeric"
                            editable={false}
                            className="w-12 text-center mx-2 font-Excon_regular text-main-blue dark:text-white"
                        />
                        <TouchableOpacity
                            onPress={increaseQuantity}
                            disabled={quantity >= maxQuantity}
                            className=" bg-gray-200 dark:bg-main-blue rounded-r-lg  w-8 h-8 flex items-center justify-center"
                        >
                            <Text className="text-main-blue dark:text-white font-Excon_bold text-lg">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={verifyCart}
                    className="bg-white dark:bg-dk-blue rounded-lg mt-4 py-2"
                >
                    <Text className="text-main-blue text-center dark:text-white font-Excon_bold">Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}