import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCRUDProductos } from '../hooks/useCRUDProductos';


export function ComercianteInventario({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const {deleteProduct, fetchStoresWithProducts, storesWithProducts } = useCRUDProductos();
    const [longPressProduct, setLongPressProduct] = useState(null);


    useEffect(() => {
        fetchStoresWithProducts();
    }, []);

    const longpress = (id) => {
        setLongPressProduct(id);
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
                {storesWithProducts.map((store, storeIndex) => (
                    <View key={storeIndex} className="flex-col p-4 w-[100vw]">
                        <Text className="text-lg text-main-blue font-Excon_bold">{store.name}</Text>
                        <Text className="text-md font-Excon_thin text-main-blue">{store.canton}, {store.district}</Text>
                        <View className="flex-col">
                            <View className="items-end mb-4">
                                <Pressable className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center" onPress={() => navigation.navigate("AgregarProducto", { store: store.id })}>
                                    <Ionicons name="add" size={24} color="#015DEC" />
                                </Pressable>
                            </View>
                            <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2">
                                <FlatList className="h-[50vh]"
                                    data={store.products}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Pressable
                                            key={index}
                                            className="flex-col justify-center mb-1"
                                            onPress={() => navigation.navigate("EditarProducto")}
                                            onLongPress={() => longpress(index)}
                                        >
                                            <View className="flex-row justify-between mt-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">

                                                <View className="flex-row w-[95%] max-w-full">

                                                    <View className="justify-center items-center">
                                                        <Image
                                                            className="rounded-lg"
                                                            source={{ uri: item.picture }}
                                                            style={{ width: 100, height: 100 }}
                                                        />
                                                    </View>

                                                    <View className="px-6 flex-shrink">
                                                        <Text className="font-Excon_bold text-sm">{item.name}</Text>
                                                        <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                            {item.description}
                                                        </Text>
                                                        <View className="justify-between flex-row">
                                                            <Text className="font-Excon_thin text-sm">₡{item.price}</Text>
                                                            <Text className="font-Excon_bold text-sm">
                                                                Inventario: <Text className="font-Excon_thin text-sm">{item.inventory}</Text>
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View className="flex-col gap-y-1 h-full items-center">
                                                    <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                    <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                    <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
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
                                        deleteProduct(longPressProduct);
                                        setLongPressProduct(null);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text className="text-main-blue font-Excon_regular">Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={() => {
                                        setLongPressProduct(null)
                                        setModalVisible(false);
                                    }}
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

