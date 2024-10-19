import { View, Text, Image, Pressable, Button, Modal, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

export function ComerciantePedidoScreen() {
    const { colorScheme } = useColorScheme();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const {order} = useRoute().params;
    console.log(order);

    return (
        <ScrollView className="bg-white dark:bg-neutral-950 h-full px-5">
            <View className="flex-col border-b-[0.5px] pb-3 dark:border-light-blue ">

                <View className="flex-row mt-8 ml-4 justify-between" >
                    <View className="justify-end">
                        <Text className="text-md font-Excon_regular text-main-blue   dark:text-light-blue">Cliente</Text>
                        <Text className="text-xl font-Excon_bold text-main-blue  dark:text-light-blue">{order.customer.name} </Text>
                    </View>
                    <Image className="bg-red-200" source={{uri: order.logo }} style={{ width: 70, height: 70, resizeMode: "cover" }} />

                </View>
                <Text className="text-md font-Excon_thin mt-4 ml-4 dark:text-white">Fecha: {order.customer.date} </Text>
                <Text className="text-md font-Excon_thin mt-2 ml-4 dark:text-white">Recibo: {order.receipt}</Text>
                <Text className="text-lg font-Excon_regular mt-2 ml-4 dark:text-white">Total: {order.total}</Text>
            </View>

            <View className="flex-col mt-5 border-b-[0.5px] pb-6 dark:border-light-blue">

                <Text className="text-xl font-Excon_bold text-main-blue ml-4 dark:text-light-blue">Detalles de la orden:</Text>

                <View className="flex-col mt-5 ml-4">
                    <View className="flex-row justify-between pb-2">
                        <Text className="text-md font-Excon_bold text-main-blue">Producto *</Text>
                        <Text className="text-md font-Excon_bold text-main-blue">Precio</Text>
                        <Text className="text-md font-Excon_bold text-main-blue">Cant.</Text>
                        <Text className="text-md font-Excon_bold text-main-blue">Subtotal</Text>
                    </View>

                        {order.orderDetails.map((product, index) => (
                            <View className="flex-row justify-between w-full mt-2">
                            <Pressable onPress={() =>{setModalVisible(true); setModalProduct(product)}
                                
                            }>
                            <Text className="text-md font-Excon_thin dark:text-white">{product.productName}</Text>
                            </Pressable>
                            <Text className="text-md font-Excon_thin dark:text-white">₡{product.price}</Text>
                            <Text className="text-md font-Excon_thin dark:text-white">{product.quantity}</Text>
                            <Text className="text-md font-Excon_thin dark:text-white">₡{product.price * product.quantity}</Text>
                            </View>
                            ))
                            
                            }
                  
                    
                </View>

            </View>
            <Text className="text-xs font-Excon_thin mt-5 ml-4 dark:text-white">* Puedes hacer click en el nombre del producto para mayor información.</Text>

            <View className="flex-col mt-5 pb-6">


                <View className="flex-col mt-5 ml-4">
                    <Text className="text-xl font-Excon_bold text-main-blue dark:text-light-blue">Referencias para la entrega</Text>
                    <Text className="my-2 font-Excon_thin dark:text-white">{order.deliveryInfo.references} </Text>
                </View>

                {/* <Image className="bg-red-200" source={require('../assets/img/marlin.png')} style={{ width: 100, height: 100, resizeMode: "contain" }} /> */}
            </View>

            <View className="flex-col mt-5 pb-6 justify-between px-5 gap-y-2">
                <Pressable className="bg-main-blue rounded-lg py-2 justify-center items-center flex-row gap-x-2" onPress={""}>
                    <Feather name="check" size={24} color="white" />
                    <Text className="text-white text-md font-Excon_regular">Confirmar</Text>
                </Pressable>
                <Pressable className="border-[0.5px] rounded-lg py-2 justify-center items-cente flex-row gap-x-2 dark:border-light-blue" onPress={""}>
                    <AntDesign name="warning" size={24} color={colorScheme === 'dark' ? "#5186EC" : "black"} />
                    <Text className=" text-md font-Excon_thin dark:text-light-blue">Notificar problema</Text>
                </Pressable>
            </View>

            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex-1 justify-center items-center bg-white dark:bg-neutral-950 p-10">
                    <Text className="text-main-blue text-2xl font-Excon_bold mb-10 dark:text-light-blue">Información del producto</Text>
                        <Image 
                            source={{ uri: modalProduct.productPicture }} 
                            style={{ width: 200, height: 200, resizeMode: 'contain' }} 
                        />
                        <Text className="text-main-blue text-2xl font-Excon_bold mt-4 dark:text-light-blue">{modalProduct.productName}</Text>
                        <Text className="text-md font-Excon_thin mt-2 mb-10 dark:text-white">{modalProduct.description}</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )
            }
        </ScrollView>
    );


}