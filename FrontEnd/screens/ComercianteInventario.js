import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';





export function ComercianteInventario({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const longpress = () => {

        setModalVisible(true);
    }
    return (
        <View className="bg-white h-full">
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Rellená tu inventario con más mercadería!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>
                </View>
            </View>
            <Text className="text-2xl text-main-blue font-Excon_bold mt-4 ml-4">Productos de tus tiendas</Text>
            <ScrollView horizontal={true}>
                <View className="flex-col p-4 w-[100vw]">
                    <Text className="text-lg text-main-blue font-Excon_bold">The Fresh Market</Text>
                    <Text className="text-md font-Excon_thin text-main-blue">Puntarenas, El roble</Text>
                    <View className="flex-col">
                        <View className="items-end mb-4">
                            <Pressable className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center" onPress={() => navigation.navigate("AgregarProducto")}>
                                <Ionicons name="add" size={24} color="#015DEC" />
                            </Pressable>
                        </View>
                        <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2">
                            <ScrollView className="h-[50vh]">
                                <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("EditarProducto")} onLongPress={longpress}>
                                    {/* Foto con imnformacion */}
                                    <View className="flex-row justify-between m-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">
                                        {/* Contenedor de la imagen y la información del producto */}
                                        <View className="flex-row w-[95%] max-w-full">
                                            {/* Imagen del producto */}
                                            <View className="justify-center items-center bg-red-600 rounded-lg">
                                                <Image
                                                    source={require('../assets/img/marlin.png')}
                                                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                                                />
                                            </View>

                                            {/* Información del producto */}
                                            <View className="px-6 flex-shrink">
                                                <Text className="font-Excon_bold text-sm">Titulo del producto</Text>
                                                <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                    Este es un producto de la mejor calidad y alta resistencia a golpes
                                                </Text>
                                                <View className="justify-between flex-row">
                                                    <Text className="font-Excon_thin text-sm">₡12 000</Text>
                                                    <Text className="font-Excon_bold text-sm">Inventario: <Text className="font-Excon_thin text-sm">30</Text></Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* 3 Puntos (opciones adicionales) */}
                                        <View className="flex-col gap-y-1 h-full items-center">
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        </View>
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex-1 justify-center items-center">
                        <View className="bg-white border-[1.5px]  rounded-lg p-6 shadow-lg w-[80vw]">
                            <View className="justify-center items-center">
                            <AntDesign name="warning" size={70} color="black" />
                            <Text className="text-lg text-main-blue font-Excon_bold mb-4">¿Deseas eliminar este producto?</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 "
                                    onPress={() => {
                                        // Lógica para eliminar el producto
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text className="text-main-blue font-Excon_regular">Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-white font-Excon_regular">Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>)}

        </View>
    );
}

