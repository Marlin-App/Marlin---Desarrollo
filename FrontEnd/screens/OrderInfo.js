
import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, Image, TouchableOpacity, Route, Alert, Navigation, Navigate
} from 'react-native';
export function OrderInfo({ navigation }) {

    return (
        <View className="flex-1 bg-white dark:bg-black py-4 px-8">
            <Text className="text-xl mb-2 font-Excon_regular text-main-blue dark:text-white">Detalles del pedido:</Text>

            <Text className="text-xl my-2 font-Excon_regular text-main-blue dark:text-[#e6e6e6]">Tienda:</Text>
            {/* <Text className="text-2xl mt-1 mb-3 font-Excon_bold text-main-blue dark:text-white">{compra.tienda}</Text> */}

            <View className="mb-4">
                <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Código: </Text>
                <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">Usuario: </Text>
            </View>

            <View className="border-b border-main-blue dark:border-light-blue mb-4" />

            <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">Detalles de la orden realizada:</Text>

            <View className="flex-row justify-between mb-3 ">
                <Text className="font-Erode_bold w-1/3 text-main-blue text-lg dark:text-[#e6e6e6]">Producto</Text>
                <Text className="font-Erode_bold w-1/5 text-main-blue text-lg dark:text-[#e6e6e6]">Precio</Text>
                <Text className="font-Erode_bold w-1/6 text-main-blue text-lg dark:text-[#e6e6e6]">Cant.</Text>
            </View>
            {/*   
        <FlatList
          data={compra.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        /> */}



            <View className="border-b border-main-blue dark:border-light-blue mb-4" />

            <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">Dirección de entrega:</Text>

            <Text className="text-gray-600 dark:text-white font-Erode_regular mb-2 dark:text-[#e6e6e6d0]">Ejemplo de direccion uwu</Text>
{/* 
            <View className="flex-row justify-evenly mt-4 mb-20">
                <TouchableOpacity
                    className="bg-main-blue px-4 py-2 rounded-lg"
                    // onPress={handleDownload}
                >
                    <Text className="text-white font-Excon_bold">Descargar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-red-500 px-4 py-2 rounded-lg"
                    // onPress={handleNotifyProblem}
                >
                    <Text className="text-white font-Excon_bold">Notificar Problema</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}