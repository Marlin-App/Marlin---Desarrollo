import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { DropDown } from '../components/DropDown';
import useSelectLocation from '../hooks/useSelectLocation';
import AntDesign from '@expo/vector-icons/AntDesign';
import useStoreType from '../hooks/useStoreType';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function NuevaTienda({ navigation }) {

    //categorias
    const { allCategories, allStores, loading } = useStoreType();
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const sectionListRef = useRef(null);

    const addCategoryList = (id) => {
        setSelectedCategoryIds((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Si el id ya está seleccionado, lo quitamos
                return prevSelected.filter((categoryId) => categoryId !== id);
            } else {
                // Si el id no está seleccionado, lo agregamos
                return [...prevSelected, id];
            }
        });
    };

    //coordenadas escogidas
    const { location, openLocationPicker, LocationPickerComponent } = useSelectLocation();

    const cantones = [
        { label: 'Puntarenas', value: 'Puntarenas' },
        { label: 'Esparza', value: 'Esparza' },
        { label: 'Miramar', value: 'Miramar' },
    ];

    const options2 = [
        { label: 'Puntarenas', value: 'Puntarenas' },
        { label: 'Esparza', value: 'Esparza' },
        { label: 'Miramar', value: 'Miramar' },
    ];

    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);

    //selector de imagenes
    const [imagePerfil, setimagePerfil] = useState(null);
    const [imagePortada, setimagePortada] = useState(null);

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

    //aceptar terminos y condiciones
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    //desencriptar token
    const base64UrlDecode = (base64Url) => {
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const padding = base64.length % 4;
        if (padding) {
            base64 += '='.repeat(4 - padding);
        }
        return decodeURIComponent(escape(atob(base64)));
    };

    const decodeJWT = (token) => {
        const [header, payload, signature] = token.split('.');
        const decodedHeader = base64UrlDecode(header);
        const decodedPayload = base64UrlDecode(payload);

        const headerObj = JSON.parse(decodedHeader);
        const payloadObj = JSON.parse(decodedPayload);

        return {
            header: headerObj,
            payload: payloadObj,
            signature: signature
        };
    };

    //fetch para mandar a crear la tienda y redigir a la vista para añadir articulos
    const [modalVisible, setModalVisible] = useState(false);
    const createShop = async () => {
        if (acceptedTerms) {
            // const data = {
            //     user_id: "nombre",
            //     store_type: location,
            //     name: "referencias",
            //     description: "telefono",
            //     canton: "nombre",
            //     distrito: selectedCategoryIds,
            //     coordenates: imagePerfil,
            //     picture_profile: imagePortada,
            //     picture_portada: "nombre",
            //     sinpe_movil: "nombre",
            //     sinpe_movil_name: "nombre",
            // }
            // console.log(data);
            const jsonValue = await AsyncStorage.getItem('@userToken');
            const userData = JSON.parse(jsonValue);
            const token = userData.access;
            const decodedToken = decodeJWT(token);
            console.log(decodedToken.payload.user_id);

            // await fetch('https://your-api-endpoint.com/create-shop', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         user_id: decodedToken.payload.user_id,
            //         store_type: selectedCategoryIds,
            //         name: "nombre",
            //         description: "referencias",
            //         canton: selectedValue,
            //         distrito: selectedValue2,
            //         coordenates: location,
            //         picture_profile: imagePerfil,
            //         picture_portada: imagePortada,
            //         sinpe_movil: "telefono",
            //         sinpe_movil_name: "nombre"
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         navigation.navigate("NuevoProducto");
            //     } else {
            //         console.error('Error creating shop:', data.message);
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
            navigation.navigate("NuevoProducto");

        }




    }

    return (
        <ScrollView className="bg-white px-5">
            <View className="w-full flex-col px-4 py-8">
                <Text className="text-main-blue text-3xl font-Excon_bold">
                    ¡Aquí inicia el camino al emprendimiento!
                </Text>
            </View>

            <View className="flex-col px-5">
                <Text className="text-main-blue text-md font-Excon_bold">¿Cómo se llama tu negocio?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin" placeholder="Nombre de la tienda" />
            </View>

            <View className="flex-col px-5 mb-4">
                <Text className="text-main-blue text-md font-Excon_bold">Ubicación</Text>
                <View className="border-[0.5px] px-4 py-2 rounded-lg my-2">
                    <DropDown
                        title="Selecciona el cantón donde se ubica tu emprendimiento:"
                        place="Cantón"
                        options={cantones}
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    />
                </View>
                <View className="border-[0.5px] px-4 py-2 rounded-lg my-2">
                    <DropDown
                        title="Selecciona el distrito donde se ubica tu emprendimiento:"
                        place="Distrito"
                        options={cantones}
                        selectedValue={selectedValue2}
                        onValueChange={(value) => setSelectedValue2(value)}
                    />
                </View>
                <View className="flex-row justify-between items-center my-4">
                    {location ? (
                        <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin" >{location.latitude.toString().slice(0, 8)},{location.longitude.toString().slice(0, 8)}</Text>

                    ) : (
                        <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin">Coordenadas</Text>
                    )}
                    <Pressable onPress={openLocationPicker}>
                        <Image className="" source={require('../assets/img/location.png')} />
                    </Pressable>
                    <LocationPickerComponent />
                </View>
            </View>
            <View className="flex-col px-5">
                <Text className="text-main-blue text-md font-Excon_bold">Referencias</Text>
                <TextInput className="border-[0.5px] border-main-blue px-4 my-2 font-Excon_thin"
                    multiline
                    numberOfLines={4}
                    maxLength={120}
                    placeholder="Brinda direcciones, calles, avenidas o puntos de referencia para que tu negocio pueda ser ubicado."
                />
            </View>

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold">¿Numero para recibir Sinpe Movil?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin" placeholder="Número de teléfono" />
            </View>

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold">¿A nombre de quien está el Sinpe Movil?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin" placeholder="Nombre" />
            </View>

            <View className="w-full flex-col px-4 py-8">
                <Text className="text-main-blue text-3xl font-Excon_bold">
                    ¡Contanos más sobre tu emprendimiento!
                </Text>
            </View>

            <View className="flex-col px-5">
                <Text className="text-main-blue text-md font-Excon_bold">Escoge al menos una categoria que mejor se adapte a tu negocio.</Text>
                <SectionList
                    sections={allCategories}
                    horizontal={true}
                    ref={sectionListRef}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => addCategoryList(item.id)}>
                                <View className="my-4 mx-2 items-center">
                                    <View
                                        className={`bg-gray-200 p-5 rounded-lg w-20 h-20 ${selectedCategoryIds.includes(item.id) ? 'bg-main-blue' : ''}`}>
                                        <AntDesign name="CodeSandbox" size={40} color={selectedCategoryIds.includes(item.id) ? 'white' : 'black'} />
                                    </View>
                                    <Text className="text-lg text-center text-light-blue">{item.name}</Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                />
            </View>

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold mb-2">Foto de perfil para tu negocio</Text>
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

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold mb-2">Foto de portada para tu negocio</Text>
                <View className=" my-2 font-Excon_thin">
                    <Pressable className="justify-center items-center" onPress={() => pickImage("portada")}>
                        {imagePortada ? (<Image className="rounded-lg w-full h-52" source={{ uri: imagePortada }} />) : (
                            <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                <Feather name="upload" size={24} color="#015DEC" />
                                <Text className="text-main-blue text-md font-Excon_thin">Haz click para subir una imagen</Text>
                            </View>)}
                    </Pressable>
                </View>
            </View>



            <View className="flex-col px-5 my-4">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
                        <View className={`w-6 h-6 border-2 border-main-blue ${acceptedTerms ? 'bg-main-blue' : 'bg-white'}`} />
                    </TouchableOpacity>
                    {/* corregir la ruta para mostrar los terminos y condiciones */}
                    <Text className="ml-2 text-main-blue text-xs font-Excon_thin">He leído y acepto los <Text onPress={() => navigation.navigate("Pedido")} className="text-main-blue text-xs font-Excon_bold">términos y condiciones</Text> </Text>
                </View>
            </View>
            <TouchableOpacity
                // className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? '' : 'opacity-50'}`}
                // onPress={acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? createShop : null}
                // disabled={!acceptedTerms || !selectedValue || !selectedValue2 || !imagePerfil || !imagePortada || selectedCategoryIds.length === 0}
                className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? '' : 'opacity-50'}`}
                onPress={createShop}


            >
                <FontAwesome5 name="upload" size={24} color="white" />
                <Text className="text-white font-Excon_bold text-lg ml-2">Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );

}