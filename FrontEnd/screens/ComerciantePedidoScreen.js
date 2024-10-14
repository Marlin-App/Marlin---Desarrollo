import { View, Text, Image, Pressable, Button, Modal, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

export function ComerciantePedidoScreen() {
    const { colorScheme } = useColorScheme();

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView className="bg-white dark:bg-neutral-950 h-full px-5">
            <View className="flex-col border-b-[0.5px] pb-3 dark:border-light-blue">

                <Text className="text-md font-Excon_regular text-main-blue mt-8 ml-4 dark:text-light-blue">Cliente</Text>
                <Text className="text-xl font-Excon_bold text-main-blue ml-4 dark:text-light-blue">Gustavo Acosta Fernandez</Text>
                <Text className="text-md font-Excon_thin mt-4 ml-4 dark:text-white">Fecha: 05/10/24</Text>
                <Text className="text-md font-Excon_thin mt-2 ml-4 dark:text-white">Recibo:215415</Text>
                <Text className="text-lg font-Excon_regular mt-2 ml-4 dark:text-white">Total: ₡215.415</Text>
                {/* <Image className="bg-red-200" source={require('../assets/img/marlin.png')} style={{ width: 100, height: 100, resizeMode: "contain" }} /> */}
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
                    <View className="flex-row justify-between mt-2">
                        <Pressable onPress={() => setModalVisible(true)}>
                            <Text className="text-md font-Excon_thin dark:text-white">Producto 1</Text>
                        </Pressable>
                        <Text className="text-md font-Excon_thin dark:text-white">₡100</Text>
                        <Text className="text-md font-Excon_thin dark:text-white">2</Text>
                        <Text className="text-md font-Excon_thin dark:text-white">₡200</Text>
                    </View>
                    
                </View>

                {/* <Image className="bg-red-200" source={require('../assets/img/marlin.png')} style={{ width: 100, height: 100, resizeMode: "contain" }} /> */}
            </View>
            <Text className="text-xs font-Excon_thin mt-5 ml-4 dark:text-white">* Puedes hacer click en el nombre del producto para mayor información.</Text>

            <View className="flex-col mt-5 pb-6">

                <Text className="text-xl font-Excon_bold text-main-blue ml-4 dark:text-light-blue">Entrega:</Text>

                <View className="flex-col mt-5 ml-4">
                    <Text className="text-main-blue text-md font-Excon_bold">Referencias</Text>
                    <Text className="my-2 font-Excon_thin dark:text-white">Lorem ipsum dolor sit amet consectetur. Nec sed vel phasellus tincidunt dignissim consectetur. Sed imperdiet purus ultricies in faucibus non cursus blandit pellentesque. Et integer sollicitudin aliquam dictumst. Hac facilisis ac gravida ut porttitor pretium dui tristique et.</Text>
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
                            source={{ uri: 'https://via.placeholder.com/150' }} 
                            style={{ width: 200, height: 200, resizeMode: 'contain' }} 
                        />
                        <Text className="text-main-blue text-2xl font-Excon_bold mt-4 dark:text-light-blue">Producto 1</Text>
                        <Text className="text-md font-Excon_thin mt-2 mb-10 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )
            }
        </ScrollView>
    );


}