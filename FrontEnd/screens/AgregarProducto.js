import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Switch } from 'react-native';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCRUDProductos } from '../hooks/useCRUDProductos';
import { useRoute } from '@react-navigation/native';


export function AgregarProducto({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [imagePerfil, setimagePerfil] = useState(null);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const {addProduct} = useCRUDProductos();
    const route = useRoute();
    const storeId = route.params || {};
    console.log(route.params);


    const [formData, setFormData] = useState({
        name: "a",
        description: "a",
        price: 0,
        stock: 0,
        picture: "a",
        store_id: storeId.store,
        item_type: 3
    });


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);


    const AddProductos = () => {
        addProduct(formData, imagePerfil);
    };

    const [row, setRow] = useState(1);

    const addrow = () => {

        setRow(row + 1);
    }

    const removeRow = () => {
        if (row > 1) {

            setRow(row - 1);
        }
    }

    const pickImage = async (pic) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            switch (pic) {
                case 'perfil':
                    setimagePerfil(result.assets[0].uri);
                    break;
                case 'portada':
                    setimagePortada(result.assets[0].uri);
                    break;
                default:
                    console.warn('Tipo de imagen no soportado');
            }
        }
    };

    //fetch para agregar producto a la base de datos

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {

        console.log(formData);

    }, [formData]);

    useEffect(() => {
        handleInputChange('picture', imagePerfil);
    }, [imagePerfil]);



    return (
        <ScrollView className="bg-white">
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-5 w-full h-full">
                    <View className="flex-col px-5">
                        <Text className="text-main-blue text-md font-Excon_bold">Nombre del producto</Text>
                        <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin" value={formData.name} onChangeText={(value) => handleInputChange('name', value)} placeholder="Nombre de la tienda" />
                    </View>
                    <View className="flex-col px-5">
                        <Text className="text-main-blue text-md font-Excon_bold">Descripción</Text>
                        <TextInput className="border-[0.5px] border-main-blue rounded-lg px-4 my-2 font-Excon_thin"
                        value={formData.description} onChangeText={(value) => handleInputChange('description', value)}
                            multiline
                            numberOfLines={4}
                            maxLength={120}
                            placeholder="Brinda direcciones, calles, avenidas o puntos de referencia para que tu negocio pueda ser ubicado."
                        />
                    </View>

                    <View className="flex-row justify-between items-center px-5">
                        <Text className="text-main-blue text-md font-Excon_bold">¿Necesita añadir tallas?</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#015DEC' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <View className="flex-row justify-between items-center px-5 mb-2">
                        <Text className="text-main-blue text-md font-Excon_bold">¿Necesita añadir color?</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled2 ? '#015DEC' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                        />
                    </View>

                    <View className="px-5">

                        {isEnabled || isEnabled2 ?
                            (
                                <ScrollView className="">
                                    {/* Header de la tabla */}
                                    <View className="flex-row justify-between border-b-2 border-main-blue p-[10px]">
                                        <Text className="text-main-blue text-md font-Excon_bold" >Color</Text>
                                        <Text className="text-main-blue text-md font-Excon_bold" >Talla</Text>
                                        <Text className="text-main-blue text-md font-Excon_bold" >Cantidad</Text>
                                    </View>

                                    {/* Filas de la tabla */}
                                    <View>
                                        {Array.from({ length: row }).map((_, index) => (
                                            <View key={index} className="relative flex-row py-[10px] border-b-[0.5px] border-main-blue flex-row justify-between mb-2">
                                                <TextInput className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" editable={isEnabled} value={isEnabled ? undefined : ""} />
                                                <TextInput className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" editable={isEnabled2} value={isEnabled2 ? undefined : ""} />
                                                <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" />

                                            </View>
                                        ))}
                                        <View className="flex-row justify-between">
                                            <Pressable className="flex-row justify-center mb-1 gap-x-4 items-center" onPress={removeRow}>
                                                <View className="rounded-full border-[1.5px] border-main-blue w-8 h-8 justify-center items-center">
                                                    <Ionicons name="remove-sharp" size={24} color="#015DEC" />
                                                </View>
                                                <Text className="text-main-blue text-md font-Excon_bold">filas</Text>
                                            </Pressable>
                                            <Pressable className="flex-row justify-center mb-1 gap-x-4 items-center" onPress={addrow}>
                                                <View className="rounded-full border-[1.5px] border-main-blue w-8 h-8 justify-center items-center">
                                                    <Ionicons name="add" size={24} color="#015DEC" />
                                                </View>
                                                <Text className="text-main-blue text-md font-Excon_bold">filas</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>) :
                            (<View className="relative flex-row py-[10px] flex-row justify-between items-center mb-2">
                                <Text className="text-main-blue text-md font-Excon_bold">Cantidad en inventario</Text>
                                <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" value={formData.stock} onChangeText={(value) => handleInputChange('stock', value)} />
                            </View>)}

                        <View className="relative flex-row py-[10px] flex-row justify-between items-center mb-2">
                            <Text className="text-main-blue text-md font-Excon_bold">Precio</Text>
                            <View className="flex-row items-center">
                                <Text className="text-main-blue text-md font-Excon_regular">₡ </Text>
                                <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" value={formData.price} onChangeText={(value) => handleInputChange('price', value)}/>
                            </View>
                        </View>

                        <View className="flex-col my-4">
                            <Text className="text-main-blue text-md font-Excon_bold mb-2">Foto de producto</Text>
                            <View className=" my-2 font-Excon_thin">
                                <Pressable className="justify-center items-center" onPress={() => pickImage("perfil")}>
                                    {imagePerfil ? (<Image className="rounded-full w-52 h-52" source={{ uri: imagePerfil }} />) : (
                                        <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                            <Feather name="upload" size={24} color="#015DEC" />
                                            <Text className="text-main-blue text-md font-Excon_thin">Haz click para subir una imagen</Text>
                                        </View>)}
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row justify-center gap-x-2 px-5">
                        <Pressable className="bg-main-blue w-[45%] rounded-lg py-2 justify-center items-center mx-2 flex-row gap-x-2" onPress={()=>AddProductos()}>
                        <Feather name="check" size={24} color="white" />
                            <Text className="text-white text-md font-Excon_bold">Agregar</Text>
                        </Pressable>
                        <Pressable className="border-[0.5px] w-[45%] rounded-lg py-2 justify-center items-cente flex-row gap-x-2" onPress={""}>
                            <Entypo name="cross" size={24} color="black" />
                            <Text className=" text-md font-Excon_thin">Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </ScrollView>

    );

}