import { Text, View, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useCallback, useState } from 'react';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function MisTiendas({navigation}) {

    function onPressFunction(pedido) {
        switch (pedido) {
            case 1:
                console.log("Completados");
                break;
            case 2:
                console.log("Pendientes");
                break;
            case 3:
                console.log("Cancelados");
                break;
            default:
                console.log("Opción no válida");
        }
    }

    return (
        <View className="flex-1 bg-white">
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Aquí inicia el camino al emprendimiento!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>
                </View>
            </View>

            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4">Tus tiendas</Text>

            <ScrollView >

                <View className="flex-col justify-center gap-x-5 bg-white p-4 mt-4">

                    <Pressable className="flex-row justify-center mb-5" onPress={onPressFunction(1)}>
                        <View className="flex-col">
                            <Image className="rounded-xl" source={require('../assets/boysurf.png')} style={{resizeMode: "contain" }} />
                        <Text className="text-black text-lg font-Excon_bold">The Fresh Market</Text>
                        <Text className="text-black text-md font-Excon_thin">Puntarenas, El Roble</Text>
                        </View>
                    </Pressable>

                    <Pressable className="flex-row justify-center mb-5" onPress={onPressFunction(1)}>
                        <View className="flex-col">
                            <Image className="rounded-xl" source={require('../assets/boysurf.png')} style={{resizeMode: "contain" }} />
                        <Text className="text-black text-lg font-Excon_bold">The Fresh Market</Text>
                        <Text className="text-black text-md font-Excon_thin">Puntarenas, El Roble</Text>
                        </View>
                    </Pressable>

                    <Pressable className="flex-row justify-center mb-5" onPress={onPressFunction(1)}>
                        <View className="flex-col">
                            <Image className="rounded-xl" source={require('../assets/boysurf.png')} style={{resizeMode: "contain" }} />
                        <Text className="text-black text-lg font-Excon_bold">The Fresh Market</Text>
                        <Text className="text-black text-md font-Excon_thin">Puntarenas, El Roble</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>

            <TouchableOpacity className="bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2" onPress={() => navigation.navigate("NuevaTienda")}>
            <MaterialIcons name="store-mall-directory" size={30} color="white" />
            <Text className="text-white font-Excon_bold text-lg ml-2">Agregar nueva tienda</Text>
          </TouchableOpacity>

        </View>
    );
}