import { useEffect, useState } from 'react';
import { Button, Image, View, Text, Pressable, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from "nativewind";
import { DropDown } from '../components/DropDown';
import Feather from '@expo/vector-icons/Feather';
import useGetUser from '../hooks/useGetUser';

export function DeliveryFormScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';


    const cantones = [
        { label: 'Puntarenas', value: 'Puntarenas' },
        { label: 'Esparza', value: 'Esparza' },
        { label: 'Miramar', value: 'Miramar' },
    ];

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // const [selectedCategoryIds, setSelectedCategoryIds] = useState(formData.store_type);
    // const [selectedValue, setSelectedValue] = useState(formData.canton);
    // const [selectedValue2, setSelectedValue2] = useState(formData.district);
    // const { location, openLocationPicker, LocationPickerComponent } = useSelectLocation();
    // const [imagePerfil, setimagePerfil] = useState(formData.picture);
    // const [imagePortada, setimagePortada] = useState(formData.banner);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
    });

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

    const [time, setTime] = useState('');

    const handleTimeChange = (text) => {
        // Remover cualquier carácter que no sea un número
        const cleaned = text.replace(/[^0-9]/g, '');

        // Formatear la entrada como HH:MM
        let formatted = cleaned;
        if (cleaned.length >= 3) {
            formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        } else if (cleaned.length >= 1) {
            formatted = `${cleaned.slice(0, 2)}`;
        }

        setTime(formatted);
    };

    return (
        <View>


            <View className="h-full dark:bg-black bg-white ">
                <ScrollView className="w-full "
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    <Text className="font-Excon_regular mt-4 text-main-blue dark:text-white text-[24px] text-center" >Formulario de inscripción para repartidor</Text>

                    <View className="mt-4 items-center p-4 ">
                        <Pressable
                            className="mt-1 h-44 w-44 bg-[#C4C4C4]  p-1 rounded-full relative"
                            onPress={pickImage}
                        >

                            <View className="absolute h-14 w-14 rounded-full bg-[#D9D9D9] dark:bg-dk-main-bg bottom-0 right-0 items-center justify-center">
                                <Feather name="camera" size={28} color="#015DEC" />
                            </View>
                        </Pressable>
                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">Datos personales</Text>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-4">Nombre</Text>
                        <TextInput
                            className="w-full border-2 border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2"
                            value={formData.firstName}
                            onChangeText={(value) => handleInputChange('firstName', value)}
                            placeholder="Digita tu nombre"
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">Apellidos</Text>
                        <TextInput
                            className="w-full border-2 border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2"

                            placeholder="Digita tus apellidos"
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">Número de teléfono</Text>
                        <TextInput
                            className="w-full border-2 border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-1"
                            keyboardType="numeric"
                            placeholder="Digita tu número de teléfono"
                        />

                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">Área y horario de reparto</Text>


                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">Canton a repartir</Text>

                        <View className="border-2 px-2 py-2 rounded-lg my-2 w-full border-light-blue dark:border-main-blue">
                            <DropDown
                                title="Selecciona el cantón donde se ubica tu emprendimiento:"
                                place="Cantón"
                                options={cantones}
                                // selectedValue={selectedValue}
                                onValueChange={(value) => setSelectedValue(value)}
                            />
                        </View>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">Horario de trabajo</Text>

                        <TextInput
                            className="w-full border-2 px-2 border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md  py-1"
                            keyboardType="numeric"
                            placeholder="HH:MM"
                            value={time}
                            onChangeText={handleTimeChange}
                            maxLength={5}
                        />
                        <View className="flex-row w-full ml-2 mt-4 items-center">
                            <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
                                <View className={`w-6 h-6 border-2 border-main-blue ${acceptedTerms ? 'bg-main-blue' : 'bg-white'}`} />
                            </TouchableOpacity>
                            {/* corregir la ruta para mostrar los terminos y condiciones */}
                            <Text className="ml-2 text-main-blue text-xs font-Excon_thin">He leído y acepto los <Text onPress={() => navigation.navigate("TerminosCondiciones")} className="text-main-blue text-xs font-Excon_bold">términos y condiciones</Text> </Text>
                        </View>


                        <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg w-full items-center justify-center"
                            onPress={() => navigation.replace('thirdScreen')}>
                            <Text className="text-white font-bold ml-2">Continuar</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

        </View>
    );
}