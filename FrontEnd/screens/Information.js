import { useEffect, useState } from 'react';
import { Button, Image, View, Text, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import useGetUser from '../hooks/useGetUser';

export function InformationScreen() {
    const [image, setImage] = useState(null);
    const { fetchData, user, updateUser } = useGetUser();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
    });

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

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                email: user.email,
                phone: user.phone
            });
        }
    }, [user]);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const updatedUser = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            email: formData.email,
            phone: formData.phone
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
                <Text className="font-Excon_regular text-main-blue text-[20px] w-full  mt-8">Datos personales</Text>

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-4">Nombre</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    placeholder="Digita tu nombre"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3">Apellidos</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    placeholder="Digita tus apellidos"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3">Nombre de usuario</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                    placeholder="Digita tu nombre de usuario"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3">Correo Electrónico</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    placeholder="Digita tu correo electrónico"
                />

                <Text className="font-Erode_regular text-main-blue text-[15px] w-full  mt-3">Número de teléfono</Text>
                <TextInput
                    className="w-full border-2 border-light-blue mt-2 rounded-md px-2"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
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
