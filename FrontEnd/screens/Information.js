import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import useGetUser from '../hooks/useGetUser';

export function InformationScreen() {
    const [image, setImage] = useState(null);
    const { fetchData, user, updateUser } = useGetUser();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

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

    useEffect(() => {
        // Si los datos del usuario están disponibles, inicializa los estados locales
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setUsername(user.username);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user]);

     const handleSave = () => {
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            phone: phone,
        };
        updateUser(updatedUser);
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
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={firstName}
                    onChangeText={setFirstName} // Actualiza el estado a medida que el usuario digita
                    placeholder="Digita tu nombre"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" > Apellidos</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Digita tus apellidos"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Nombre de usuario</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Digita tu numbre de usuario"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Correo Electronico</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Digita tu correo electrónico"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3" >Número de telefono</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="numeric"
                    placeholder="Digita tu número de teléfono"
                />
                <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg w-full items-center justify-center"
                    onPress={handleSave}
                >
                    <Text className="text-white font-bold ml-2">Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}




