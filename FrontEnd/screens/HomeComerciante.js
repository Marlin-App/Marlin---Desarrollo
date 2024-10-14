
import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';

export function HomeComercianteScreen({ navigation }) {
    const { colorScheme } = useColorScheme();


    function onPressFunction(pedido) {
        switch (pedido) {
            case 1:
               
                break;
            case 2:
               
                break;
            case 3:
               
                break;
            default:
                console.log("Opción no válida");
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-main-bg py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-light-blue text-2xl font-Excon_bold w-[80vw]">
                            ¡Bienvenido a Marlin comerciante Luis!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 mr-2">
                        <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"}/>
                    </View>
                </View>
            </View>
            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4 dark:text-light-blue">Tus pedidos</Text>
            <View className="flex-row justify-center gap-x-5 p-4 mt-4">
                <Pressable className="border-2 px-4 py-2 rounded-xl dark:border-light-blue" onPress={onPressFunction(1)}>
                    <Text className="font-Erode_regular text-sm dark:text-white">Completados</Text>
                </Pressable>
                <Pressable className="border-2 px-4 py-2 rounded-xl dark:border-light-blue" onPress={onPressFunction(1)}>
                    <Text className="font-Erode_regular text-sm dark:text-white">Pendientes</Text>
                </Pressable>
                <Pressable className="border-2 px-4 py-2 rounded-xl dark:border-light-blue" onPress={onPressFunction(1)}>
                    <Text className="font-Erode_regular text-sm dark:text-white">Cancelados</Text>
                </Pressable>
            </View>

            <ScrollView className="flex-col p-4 mx-5 mb-5">
                <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido")}>
                    {/* Foto con imnformacion */}
                    <View className="flex-row justify-between m-2 px-4 py-4 border-[0.5px] border-[#D6D6D6] dark:border-light-blue w-full items-center rounded-md ">
                        <View className="flex-row">
                        <View className=" justify-center item-center bg-red-600 rounded-lg dark:bg-neutral-900">
                            <Image source={require('../assets/img/marlin.png')} style={{ width: 100, height: 100, resizeMode: "contain" }} />
                        </View>
                        <View className="px-6">
                            <Text className="font-Excon_bold text-sm dark:text-white">Entregado: <Text className="font-Excon_thin text-sm">02/10/24</Text></Text>
                            <Text className="font-Excon_bold text-sm dark:text-white">Estado: <Text className="font-Excon_thin text-sm">Completado</Text></Text>
                            <Text className="font-Excon_bold text-sm dark:text-white">Recibo: <Text className="font-Excon_thin text-sm">12454</Text></Text>
                            <Text className="font-Excon_thin text-sm dark:text-white">₡12 000 - 2 productos</Text>
                        </View>
                        </View>
                        {/* 3Puntos */}
                        <View className="flex-col gap-y-1 h-full">
                            <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                            <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                            <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                        </View>
                        
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    );
}