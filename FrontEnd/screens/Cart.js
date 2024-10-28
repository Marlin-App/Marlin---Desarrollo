import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable, FlatList, Image, Alert, Switch, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useCart from '../hooks/useCart';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function CartScreen({ navigation }) {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, total: cartTotal } = useCart();

    const { colorScheme } = useColorScheme();

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

    const deliveryFee = 250;
    const transportFee = 750;

    const [isPickUp, setIsPickUp] = useState(false);

    const total = isPickUp ? cartTotal : (deliveryFee + transportFee) + cartTotal;

    const formatCurrency = (value) => {
        return value.toLocaleString('es-CR', {
            style: 'currency',
            currency: 'CRC',
            maximumFractionDigits: 0
        });
    };

    const CartItem = ({ item }) => {
        const handleDelete = () => {
            Alert.alert(
                'Eliminar producto',
                `¿Estás seguro de que deseas eliminar ${item.name} del carrito?`,
                [
                    { text: 'Cancelar' },
                    { text: 'Eliminar', onPress: () => removeFromCart(item.id) },
                ],
                { cancelable: false }
            );
        };
    
        const selectedVariations = item.variations || []; 
    
        return (
            <View className="mx-4 my-2 rounded-lg border-2 border-main-blue dark:border-light-blue p-2">
                <View className="items-end justify-end mt-2">
                    <Pressable onPress={handleDelete}>
                        <MaterialIcons name="delete-outline" size={20} color={colorScheme === 'dark' ? '#BB2626' : '#DB2B2B'} />
                    </Pressable>
                </View>
                <View className="flex-row">
                    <View className="rounded-lg shadow-lg p-[2px] dark:bg-neutral-900">
                        {item.item_images && (
                            <Image
                                source={{ uri: item.item_images[0].picture }}
                                style={{ width: 90, height: 90 }}
                                className="w-full h-full rounded-lg"
                            />
                        )}
                    </View>
                    <View className="ml-2 flex-1">
                        <Text className="text-[16px] ml-2 font-Excon_regular">{item.name}</Text>
                        <View className="flex-row justify-between mt-4 flex-1">
                            {selectedVariations.map((variation, index) => (
                                <View key={index} className="items-center pt-2">
                                    <View className="rounded-md items-center justify-center dark:bg-light-blue">
                                        <Text className="font-Excon_bold text-[12px] text-black dark:text-[#171717]">{variation.attribute_name}</Text>
                                    </View>
                                    <Text className="mt-2 font-Excon_regular text-gray-600 ml-2 dark:text-[#d2d2d2]">{variation.value}</Text>
                                </View>
                            ))}
                            <View className="items-center">
                                <View className="rounded-md h-6 w-20 bg-main-blue items-center flex-row dark:bg-light-blue">
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => {
                                            if (item.cantidad > 1) {
                                                decreaseQuantity(item.id);
                                            }
                                        }}
                                    >
                                        <Text className="text-white dark:text-[#171717]">-</Text>
                                    </Pressable>
                                    <Text className="font-Excon_bold text-[12px] text-white dark:text-[#171717]">{item.cantidad}</Text>
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => increaseQuantity(item.id)}
                                    >
                                        <Text className="text-white dark:text-[#171717]">+</Text>
                                    </Pressable>
                                </View>
                                <Text className="mt-2 font-Excon_regular text-gray-600 dark:text-[#d2d2d2]">Cantidad</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="items-end justify-end mt-2">
                    <Text className="font-Excon_regular">{formatCurrency(cartTotal)} CRC</Text>
                </View>
            </View>
        );
    };
    
    
    
      
    




    return (
        <View className="flex-1 bg-white dark:bg-neutral-950" onLayout={onLayoutRootView}>
            <ScrollView className="flex-1 bg-white dark:bg-neutral-950">
                <Text className="text-2xl font-Excon_regular text-main-blue dark:text-[#ededed] mt-4 text-center">Carrito</Text>

                {cart.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-[20px] font-Excon_regular text-main-blue dark:text-white">No hay productos en el carrito</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cart}
                            renderItem={CartItem}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 50 }}
                        />

                        <View className="px-4 pt-2 rounded-lg mx-4 border-t-2 border-slate-200 dark:border-light-blue">
                            <Text className="text-[18px] font-Excon_regular text-main-blue mb-2 dark:text-white">Datos de entrega</Text>

                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="font-Excon_regular text-gray-800 dark:text-[#d2d2d2]">Recoger en el lugar</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isPickUp ? "#1952BE" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={setIsPickUp}
                                    value={isPickUp}
                                />
                            </View>

                            {!isPickUp && (
                                <>
                                    <View className="flex-row gap-x-6 items-center mb-4">
                                        <EvilIcons name="location" size={24} color="black" />
                                        <View className="flex-1">
                                            <Text className="font-Excon_bold text-gray-800 text-[14px] dark:text-[#e1e1e1]">Ubicación de entrega</Text>
                                            <Text className="font-Erode_regular text-gray-800 text-[13px] dark:text-[#e1e1e1]">
                                                Direccion ramdom, por puntarenas, Costa Rica
                                            </Text>
                                        </View>
                                        <Pressable onPress={() => {
                                            Alert.alert('Cambiar ubicación', 'Implementa la lógica para cambiar la ubicación.');
                                        }}>
                                            <Text className="font-Excon_regular text-main-blue dark:text-light-blue">Cambiar</Text>
                                        </Pressable>
                                    </View>

                                    <View className="flex-row gap-x-6 items-center">
                                        <FontAwesome5 name="search-location" size={20} color="black" />
                                        <View className="flex-1">
                                            <Text className="font-Excon_bold text-gray-800 text-[14px] dark:text-[#e1e1e1]">Indicaciones para la entrega</Text>
                                            <Text className="font-Excon_regular text-gray-800 text-[13px] dark:text-[#e1e1e1]">Casa de latas de zinc color rosado, junto a un palo de mango</Text>
                                        </View>
                                        <Pressable onPress={() => {
                                            Alert.alert('Cambiar indicaciones', 'Implementa la lógica para cambiar las indicaciones.');
                                        }}>
                                            <Text className="font-Excon_regular text-main-blue dark:text-light-blue">Cambiar</Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </View>

                        <View className="mt-6 p-4 bg-gray-100 dark:bg-dk-main-bg rounded-lg mx-4 mb-2">
                            <Text className="text-[18px] font-Excon_bold text-main-blue mb-4 dark:text-white">Resumen</Text>
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Excon_bold text-gray-800 dark:text-white">Precio de productos:</Text>
                                <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">{formatCurrency(cartTotal)}</Text>
                            </View>

                            {!isPickUp && (
                                <>
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="font-Excon_bold text-gray-800 dark:text-white">Tarifa de entrega:</Text>
                                        <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">{formatCurrency(deliveryFee)}</Text>
                                    </View>

                                    <View className="flex-row justify-between mb-2">
                                        <Text className="font-Excon_bold text-gray-800 dark:text-white">Tarifa de transporte:</Text>
                                        <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">{formatCurrency(transportFee)}</Text>
                                    </View>
                                </>

                            )}
                        </View>
                    </>
                )}
            </ScrollView>

            {cart.length > 0 && (
                <View className="bg-main-blue p-4 dark:bg-dk-tab">
                    <View className="flex-row justify-between mb-4">
                        <Text className="font-Excon_bold text-[20px] text-white dark:text-light-blue">Total a pagar:</Text>
                        <Text className="font-Excon_regular text-[20px] text-white dark:text-light-blue">{formatCurrency(total)}</Text>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('Pay', { totales: total })} // Pasar el total aquí
                        className="bg-white dark:bg-[#1952BE] p-4 rounded-md mb-2"
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Text className="text-main-blue font-Excon_regular text-[20px] text-center dark:text-white">Pagar</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
