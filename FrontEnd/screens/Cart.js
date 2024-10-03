import React from "react";
import { useEffect, useCallback } from "react";
import { View, Text, Button, Pressable, FlatList, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useCart from '../hooks/useCart'


export function CartScreen({ navigation }) {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, addToCart, total } = useCart();

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

    const onLayout = useCallback(async () => {
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


    const CartItem = ({ item }) => {
        console.log(item);
        return (
            <View className=" mx-4 my-2 rounded-lg border-2 border-main-blue p-2 " onLayout={onLayout}>
                <View className="items-end justify-end" >
                    <Entypo name="dots-three-vertical" size={15} color="#015DEC" />
                </View>
                <View className="flex-row" >
                    <View className=" rounded-lg"
                        style={{
                            shadowColor: '#C0C0C0',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.9,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={{uri:item.picture}}
                            className=" rounded-lg"
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <View className="ml-2 flex-1">
                        <Text className="text-[16px] ml-2 font-Excon_regular ">{item.name} </Text>
                        <View className="flex-row justify-between mt-4 flex-1 ">
                            <View className="items-center " >
                                <View className="rounded-lg h-6 w-7 items-center">
                                    <View className="rounded-full h-4 w-4 bg-black"></View>
                                </View>
                                <Text className="font-Erode_regular text-gray-600 ml-2" >Color</Text>
                            </View>
                            <View className="items-center">
                                <View className="rounded-md h-6 w-7 bg-main-blue items-center justify-center"><Text className="font-Excon_regular text-[12px] text-white " >M</Text></View>
                                <Text className="font-Erode_regular text-gray-600" >Talla</Text>
                            </View>
                            <View className="items-center">
                                <View className="rounded-md h-6 w-20 bg-main-blue items-center  flex-row ">
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => decreaseQuantity(item.id)}
                                    >
                                        <Text className="text-white w">-</Text>
                                    </Pressable>
                                    <Text className="font-Excon_regular text-[12px] text-white " >{item.cantidad} </Text>
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => increaseQuantity(item.id)}
                                    >

                                        <Text className="text-white ">+</Text>
                                    </Pressable>
                                </View>
                                <Text className="font-Erode_regular text-gray-600">Cantidad</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="items-end justify-end" >
                    <Text className="font-Excon_regular" >{item.price} CRC</Text>
                </View>
            </View>
        );
    }

    return (

        <View style={{ flex: 1 }} onLayout={onLayout}>
            <View style={{ flex: 1 }} className="bg-white">
                <Text className="text-[24px] font-Excon_regular text-main-blue mt-4 text-center">Carrito</Text>
                {
                    cart.length === 0 && (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-[20px] font-Excon_regular text-main-blue">No hay productos en el carrito</Text>
                        </View>
                    )
                }
                <FlatList
                    data={cart}
                    renderItem={CartItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>

            <View className=" bg-main-blue p-2 gap-2" >
                <View className="flex-row justify-between" >
                    <Text className="font-Excon_regular text-[20px] text-white">Total a pagar:</Text>
                    <Text className="font-Excon_regular text-[20px] text-white">₡{total}</Text>
                </View>
                <View>
                    <Pressable
                        onPress={() => clearCart()}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'white',
                                padding: 4,
                                borderRadius: 5,
                                marginBottom: 10,
                            },
                        ]}

                    >
                        <Text className="text-main-blue font-Excon_regular text-[20px] text-center">Pagar</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );

}