import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useCart from '../hooks/useCart';

export function ItemPage({ navigation }) {
    const { addToCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({
        'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
        'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
        'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
        'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
        'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
    });

    useEffect(() => {
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

    const [quantity, setQuantity] = useState(1);
    const route = useRoute();
    const { product } = route.params;
    console.log(product);
    console.log(product.picture);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        setModalVisible(true);
        addToCart({ ...product, cantidad: quantity });
    };

    // **1. Extraer el Valor Numérico del Precio**
    const unitPrice = Number(product.price.replace(/[^0-9]/g, ''));
    
    // **2. Calcular el Precio Total**
    const totalPrice = unitPrice * quantity;

    // **3. Formatear el Precio Total**
    const formattedTotalPrice = totalPrice.toLocaleString('es-CR', { 
        style: 'currency', 
        currency: 'CRC', 
        maximumFractionDigits: 0 
    });

    return (
        <View className="flex-grow-1 bg-white h-full" onLayout={onLayout}>
            <ScrollView className="mb-20">
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Se agregó el producto {product.name} al carrito!
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
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
                    <Text className="text-xl pl-1 font-Excon_bold">{product.name}</Text>
                    <Text className="text-sm pl-1 font-Excon_regular">{product.description}</Text>

                    <Text className="text-base font-bold pl-1 mt-3">Color</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-black mx-1" />
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-red-600 mx-1" />
                        <TouchableOpacity className="rounded-full w-6 h-6 bg-blue-700 mx-1" />
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bg-main-blue p-5 w-full bottom-0">
                {/* **4. Mostrar el Precio Total Formateado** */}
                <Text className="text-xl font-bold text-white mb-4">Precio: {formattedTotalPrice}</Text>

                <View className="flex-row justify-between pb-3">
                    <View className="flex-row ">
                        <TouchableOpacity 
                            className="rounded-l-2xl bg-[#d7d7d7] py-1 px-3" 
                            onPress={decreaseQuantity}
                        >
                            <Text className="text-main-blue text-3xl">-</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="w-16 text-center text-lg bg-white text-main-blue"
                            keyboardType="numeric"
                            value={String(quantity)}
                            onChangeText={(value) => {
                                const numericValue = Number(value.replace(/[^0-9]/g, ''));
                                setQuantity(isNaN(numericValue) || numericValue < 1 ? 1 : numericValue);
                            }}
                        />
                        <TouchableOpacity 
                            className="rounded-r-2xl bg-[#d7d7d7] py-2 px-3" 
                            onPress={increaseQuantity}
                        >
                            <Text className="text-main-blue text-lg">+</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={styles.carrito}
                        onPress={handleAddToCart}
                    >
                        <Text className="text-lg font-bold text-main-blue">Agregar al carrito</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    carrito: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
