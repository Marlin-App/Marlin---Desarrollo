import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Keyboard, Platform, useColorScheme, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useCart from '../hooks/useCart';

export function ItemPage({ navigation }) {
    const { addToCart, isSameStore, clearCart, cart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);  
    const [modalVisible2, setModalVisible2] = useState(false);  
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



    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
   
    const vericarCarrito = () => {

        console.log(isSameStore(product.store_id));
        if(isSameStore(product.store_id)){
            handleAddToCart();

        }else{
            setModalVisible2(!modalVisible2);
        }
       
    }

    const  handleAddToCart = () => { 
        setModalVisible(!modalVisible);
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
        <View className="flex-grow-1 bg-white dark:bg-neutral-950 h-full" onLayout={onLayout}>
            <ScrollView className="mb-20">

            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg p-6 shadow-lg w-[80vw]">
                            <View className="justify-center items-center">
                                <View className="border-b-[0.5px] w-full mb-4">
                                    <Text className="text-lg text-center font-Excon_bold mb-2">Producto Agregado!</Text>
                                </View>
                                <Text className="text-md font-Excon_regular mb-4">Se agrego el {product.name} al carrito.</Text>
                            </View>
                            <View className="flex-row justify-center">
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
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
                                    <Text className="text-lg text-center font-Excon_bold mb-2">Atencion!</Text>
                                </View>
                                <Text className="text-md font-Excon_regular mb-4">Este producto pertenece a una tienda distinta. Si diceas crear un nuevo carrito perderas los productos guardados hasta ahora!</Text>
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
                                        setModalVisible2(!modalVisible2); 
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
                {/* **4. Mostrar el Precio Total Formateado** */}
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
                            className="rounded-r-2xl bg-[#d7d7d7] py-2 px-3 dark:bg-dk-blue" 
                            onPress={increaseQuantity}
                        >
                            <Text className="text-main-blue dark:text-white text-lg">+</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable 
                        style={styles.carrito}
                        onPress={() =>vericarCarrito()}
                       
                    > 
                    <Text className="text-lg font-bold text-main-blue dark:text-white">Agregar al carrito</Text>
                    </Pressable> 
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    carrito: {
        backgroundColor: 'white',
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
