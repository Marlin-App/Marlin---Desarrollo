import { View, Text, Image, Pressable, Button, Modal, ScrollView, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import useDecodeJWT from "../hooks/useDecodeJWT";

export function ComerciantePedidoScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const { getToken, isTokenExpired, refreshToken } = useDecodeJWT();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const { order } = useRoute().params;
    const dateForm = (order_date) => {
        const date = new Date(order_date);

        // Opciones de formato para mostrar mes, día y hora
        const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };

        // Formatear la fecha
        const formattedDate = date.toLocaleString('es-ES', options);
        return formattedDate;
    }

    // Funcion para marcar el pedido como listo
    const handleReady = async () => {
        // Verificar si el token ha expirado
        if (await isTokenExpired()) {
            await refreshToken();
        }
        let token = await getToken();
        try {
            const response = await fetch(
                `https://marlin-backend.vercel.app/api/accept-order/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access}`, 
                    },
                    body: JSON.stringify({
                        order_id: order.id,
                    }),
                }
            );
            
                Alert.alert(
                    "Perfecto",
                    "Próximamente vendrá un repartidor a recoger el pedido",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate("Inicio");
                            },
                        },
                    ],
                    { cancelable: false }
                );
            
        } catch (error) {
            console.error("Error en handleReady:", error);
            Alert.alert("Error", "Hubo un problema al procesar el pedido.");
        }
    };
    // ------------------------------------------------------------------------

    return (
        <ScrollView className="bg-white dark:bg-neutral-950 h-full px-5">
            <View className="flex-col border-b-[0.5px] pb-3 dark:border-light-blue ">

                <View className="flex-row mt-8 ml-4 justify-between" >
                    <View className="justify-end">
                        <Text className="text-md font-Excon_regular text-main-blue   dark:text-light-blue">Cliente</Text>
                        <Text className="text-xl font-Excon_bold text-main-blue  dark:text-light-blue">{order.user_name} </Text>
                    </View>
                    <Image className="bg-red-200 rounded-lg" source={{ uri: order.user_picture }} style={{ width: 70, height: 70, resizeMode: "cover" }} />
                </View>
                <Text className="text-md font-Excon_regular mt-4 ml-4 dark:text-white">Fecha: <Text className=" text-md font-Excon_thin">{dateForm(order.order_date)}</Text> </Text>
                <Text className="text-md font-Excon_regular mt-2 ml-4 dark:text-white">Total a pagar: <Text className=" text-md font-Excon_thin">₡{order.total_price}</Text></Text>
                <Text className="text-md font-Excon_regular mt-2 ml-4 dark:text-white">Recibo: <Text className=" text-md font-Excon_thin">{order.order_num}</Text></Text>
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

                    {order.products.map((product, index) => (
                        <View key={index} className="flex-row justify-between w-full mt-2">
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true);
                                    setModalProduct(product);
                                }}
                            >
                                <Text className="text-md font-Excon_thin dark:text-white">
                                    {product.item_name.split(' ').slice(0, 2).join(' ')}
                                </Text>
                            </Pressable>
                            <Text className="text-md font-Excon_thin dark:text-white">
                                ₡{product.total_price / product.quantity}
                            </Text>
                            <Text className="text-md font-Excon_thin dark:text-white">
                                {product.quantity}
                            </Text>
                            <Text className="text-md font-Excon_thin dark:text-white">
                                ₡{product.total_price}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            <Text className="text-xs font-Excon_thin mt-5 ml-4 dark:text-white">* Puedes hacer click en el nombre del producto para mayor información.</Text>

            <View className="flex-col mt-5 pb-6">
                <View className="flex-col mt-5 ml-4">
                    <Text className="text-xl font-Excon_bold text-main-blue dark:text-light-blue">Referencias para la entrega</Text>
                    <Text className="my-2 font-Excon_thin dark:text-white">{order.direction} </Text>
                </View>
            </View>

            <View className="flex-col mt-5 pb-6 justify-between px-5 gap-y-2">
                {order.status == "Pendiente" ? (
                    <Pressable className="bg-main-blue rounded-lg py-2 justify-center items-center flex-row gap-x-2" onPress={handleReady} >
                        <Feather name="check" size={24} color="white" />
                        <Text className="text-white text-md font-Excon_regular">Listo para recoger</Text>
                    </Pressable>
                ) : null}

                <Pressable className="border-[0.5px] rounded-lg py-2 justify-center items-cente flex-row gap-x-2 dark:border-light-blue" >
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
                            source={{ uri: modalProduct.item_image }}
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