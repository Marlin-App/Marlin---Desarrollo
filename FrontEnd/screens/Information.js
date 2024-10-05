import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';

export function InformationScreen() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (


        <ScrollView className="w-full ">
            <View className="mt-4 items-center p-4">
                <Text className="font-Excon_regular text-main-blue text-[24px] text-center " >Mi perfil</Text>


                <Pressable
                    className="mt-4 h-44 w-44 bg-[#C4C4C4] rounded-full relative"
                    onPress={pickImage}
                >
                    {image && <Image source={{ uri: image }} className="rounded-full w-full h-full" />}

                    <View className="absolute h-14 w-14 rounded-full bg-[#D9D9D9] bottom-0 right-0 items-center justify-center">
                        <Feather name="camera" size={28} color="#015DEC" />
                    </View>
                </Pressable>
                <Text className="font-Excon_regular text-main-blue text-[20px] w-full  mt-8" > Datos personales</Text>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-4" > Nombre</Text>
                <TextInput className="w-full border-2 border-light-blue mt-2 rounded-md px-2">
                </TextInput>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" > Apellidos</Text>
                <TextInput className="w-full border-2 border-light-blue mt-2 rounded-md px-2">
                </TextInput>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Nombre de usuario</Text>
                <TextInput className="w-full border-2 border-light-blue mt-2 rounded-md px-2">
                </TextInput>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Correo Electronico</Text>
                <TextInput className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    keyboardType="email-address"
                >
                </TextInput>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Número de telefono</Text>
                <TextInput className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    keyboardType="numeric"
                >
                </TextInput>
                <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg w-full items-center justify-center">
                    <Text className="text-white font-bold ml-2">Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});


