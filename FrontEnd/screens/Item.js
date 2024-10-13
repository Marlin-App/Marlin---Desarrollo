import React, { useState, useEffect, useCallback, } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Keyboard, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useCart from '../hooks/useCart'
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
    })
    
    
    
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    const [quantity, setQuantity] = useState(1);
    const route = useRoute();
    const { product } = route.params;



    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
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

    return (
        <View className="flex-grow-1 bg-white h-full">  
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
           {/*  <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2}
                >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Este producto pertenece a una tienda distinta. Si diceas crear un nuevo carrito perderas los productos guardados hasta ahora!</Text>
                    
                    <View className="flex-row gap-2">
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => {
                            await clearCart();  
                            handleAddToCart();
                            navigation.goBack();
                        }}
                        >
                        <Text style={styles.textStyle}> Nuevo Carrito</Text>
                        </Pressable>

                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible2(!modalVisible2); 
                        }}
                        >
                        <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>

                    </View>
                </View>
                </View>
            </Modal> */}


            <View className="px-8">
                <Image
                    className="w-full h-[400] rounded-3xl bg-black mt-10 mb-3"
                    source={{uri: product.picture} }
                    resizeMode="cover"
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

            <View className="absolute bg-main-blue p-5 w-full bottom-0">
                <Text className="text-xl font-bold text-white mb-4">Precio:{product.price}</Text>

                <View className="flex-row justify-between pb-3">
                    <View className="flex-row ">
                        <TouchableOpacity className="rounded-l-2xl bg-[#d7d7d7] py-1 px-3" onPress={decreaseQuantity}>
                            <Text className="text-main-blue text-3xl">-</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="w-16 text-center text-lg bg-white text-main-blue"
                            keyboardType="numeric"
                            value={String(quantity)}
                            onChangeText={(value) => setQuantity(Number(value.replace(/[^0-9]/g, '')))}                        
                        />
                        <TouchableOpacity className="rounded-r-2xl bg-[#d7d7d7] py-2 px-3" onPress={increaseQuantity}>
                            <Text className="text-main-blue text-lg">+</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={styles.carrito}
                        onPress={() =>vericarCarrito()}
                       
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
      buttonOpen: {
        backgroundColor: '#F194FF',
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
