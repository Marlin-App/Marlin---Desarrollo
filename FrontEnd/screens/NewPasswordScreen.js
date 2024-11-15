import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export function NewPasswordScreen({ navigation }) {
    const route = useRoute();
    const { uid, token } = route.params;
    const [password, setPassword] = useState("");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisible = () => {
        setpasswordVisible(!passwordVisible);
    };
    // ------------------------------------------------------------------------

    // Función para restablecer la contraseña
    const changePassword = async () => {
        if (password === confirmPassword) {
            try {
                const response = await fetch(`https://marlin-backend.vercel.app/api/reset-password/${uid}/${token}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        new_password: password
                    }),
                });

                if (response.ok) {
                    navigation.navigate('Login');
                    Alert.alert('Perfecto', 'La contraseña ha sido cambiada exitosamente');
                } else {
                    console.log('Error al restablecer la contraseña');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }

        } else {
            Alert.alert('Atención', 'La contraseña y su confirmación no coinciden.');
        }

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
                <Text className="text-lg text-center font-Excon_bold my-4 ml-4">Digite su nueva contraseña</Text>
                <View className="flex-col px-5 mb-10">
                    <TextInput
                        className="text-center border-b-[1px] border-main-blue px-4 my-2 font-Excon_regular"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity className="absolute right-4 text-[16px] font-Excon_regular text-main-blue" onPress={togglePasswordVisible}>
                        <MaterialIcons
                            name={passwordVisible ? 'visibility' : 'visibility-off'}
                            size={24}
                            color="#1952BE"
                        />
                    </TouchableOpacity>
                </View>
                <Text className="text-lg text-center font-Excon_bold my-4 ml-4">Confirme su contraseña</Text>
                <View className="flex-col px-5 mb-10">
                    <TextInput
                        className="text-center border-b-[1px] border-main-blue px-4 my-2 font-Excon_regular"
                        placeholder="Confirme nueva contraseña"
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        secureTextEntry={!passwordVisible}
                    />
                </View>
                <TouchableOpacity
                    className="bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2"
                    onPress={() => changePassword()}
                >
                    <Text className="text-white font-Excon_bold text-lg ml-2">Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};