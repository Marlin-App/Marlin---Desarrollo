import React, { useState, useEffect } from 'react';

import { Button, Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';

export function ItemPage({ navigation }) {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                backgroundColor: '#0038A2',
                display: 'none',
                height: 80,
                justifyContent: 'center',
                paddingBottom: 10,
            }

        });

        return () => {

            navigation.getParent().setOptions({
                tabBarStyle: {
                    backgroundColor: '#015DEC',
                    display: 'flex',
                    height: 80,
                    justifyContent: 'center',
                    paddingBottom: 10,
                }

            });
        }


    }, []);

    return (
        <View className="flex-grow-1 bg-white h-full">
            <View className="px-8">
                <Image
                    className="w-full h-[400] rounded-3xl bg-black mt-10 mb-3"
                    source={require('../../FrontEnd/assets/img/item.png')}
                />
                <Text className="text-xl font-bold pl-1">Camiseta Volcom YEWBISU CREW</Text>
                <Text className="text-sm pl-1">Disfruta de las rayas de barril con la camiseta
                    de hombre Yewbisu. Un corte moderno viene
                    confeccionado...</Text>

                <Text className="text-base font-bold pl-1 mt-3">Color</Text>
                <View className="flex-row">
                    <TouchableOpacity className="rounded-full w-6 h-6 bg-black mx-1" />
                    <TouchableOpacity className="rounded-full w-6 h-6 bg-red-600 mx-1" />
                    <TouchableOpacity className="rounded-full w-6 h-6 bg-blue-700 mx-1" />
                </View>
            </View>

            <View className="absolute bg-[#89cefc] p-5 w-full bottom-0">
                <Text className="text-xl font-bold text-white mb-4">Precio: ₡  29.900</Text>

                <View className="flex-row justify-between pb-3">
                    <View className="flex-row ">
                        <TouchableOpacity className="rounded-l-2xl bg-[#d7d7d7] py-1 px-3" onPress={decreaseQuantity}>
                            <Text className="text-main-blue text-3xl">-</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="w-16 text-center text-lg bg-white text-main-blue"
                            keyboardType="numeric"
                            value={String(quantity)}
                            onChangeText={(value) => setQuantity(Number(value))}
                        />
                        <TouchableOpacity className="rounded-r-2xl bg-[#d7d7d7] py-2 px-3" onPress={increaseQuantity}>
                            <Text className="text-main-blue text-lg">+</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={styles.carrito}
                        onPress={() => alert(`Agregado ${quantity} al carrito`)}
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
    }
});
