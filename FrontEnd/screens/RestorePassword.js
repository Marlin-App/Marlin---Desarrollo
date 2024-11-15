import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

export function RestorePasswordScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [correo, setCorreo] = useState("");

    // Función para abrir el modal
    const openModal = () => {
        setModalVisible(true);
    }
    // ------------------------------------------------------------------------

    // Función para enviar el correo
    const sendEmail = () => {
        fetch('https://marlin-backend.vercel.app/api/password-reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: correo }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.message != '') {
                    openModal();
                } else {
                    alert('Error al enviar el correo. Por favor, inténtelo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el correo. Por favor, inténtelo de nuevo.');
            });
    };
    // ------------------------------------------------------------------------

    return (
        <View className="bg-white w-full h-full">
            <View className="w-full flex-col px-4 bg-main-blue py-8  mb-20">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Reestablescamos tu contraseña juntos!
                        </Text>
                    </View>
                </View>
            </View>
            <View className="px-4 h-full">
                <Text className="text-lg text-center font-Excon_bold my-4 ml-4">Digite su correo electrónico</Text>
                <View className="flex-col px-5 mb-10">
                    <TextInput className="text-center border-b-[1px] border-main-blue px-4 my-2 font-Excon_regular" placeholder="ejem: marlinpescador@gmail.com" value={correo} onChangeText={(value) => setCorreo(value)} />
                </View>
                <TouchableOpacity className="bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2" onPress={() => sendEmail()}>
                    <Text className="text-white font-Excon_bold text-lg ml-2">Enviar</Text>
                </TouchableOpacity>
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
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg p-6 shadow-lg w-[80vw]">
                            <View className="justify-center items-center">
                                <View className="border-b-[0.5px] w-full mb-4">
                                    <Text className="text-lg text-center font-Excon_bold mb-2">Reestablecer contraseña</Text>
                                </View>
                                <Text className="text-md font-Excon_regular mb-4">Si el correo está asociado alguna de nuestras cuentas recibirás un correo electrónico para reestablecer la contraseña de manera segura.</Text>
                                <Text className="text-md font-Excon_bold mb-4">Gracias por usar Marlin</Text>
                            </View>
                            <View className="flex-row justify-center">
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("Login")
                                    }}
                                >
                                    <Text className="text-white font-Excon_regular">Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>)}
        </View>
    )
}