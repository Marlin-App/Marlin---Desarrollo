import { Text, View, TextInput, Pressable, Image, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import React, { useState, useRef } from 'react';
import { useColorScheme } from "nativewind";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function NuevoProducto({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [imagePerfil, setimagePerfil] = useState(null);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const { colorScheme } = useColorScheme();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    // Función para abrir el modal
    const AddProduct = () => {
        setModalVisible(true);
    };
    // ------------------------------------------------------------------------

    const [row, setRow] = useState(1);

    // Función para agregar una nueva variación
    const addrow = () => {
        setRow(row + 1);
    }
    // ------------------------------------------------------------------------

    // Función para eliminar una variación
    const removeRow = () => {
        if (row > 1) {

            setRow(row - 1);
        }
    }
    // ------------------------------------------------------------------------

    // State para almacenar las imagenes
    const [images, setImages] = useState([]);
    // ------------------------------------------------------------------------

    // Función para manejar la selección de imágenes
    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages(result.assets);
        }
    };
    // ------------------------------------------------------------------------

    return (
        <View className="flex-1 bg-white">
            <View className="w-full flex-col px-4 bg-main-blue pb-8 pt-16 mb-5">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Muestrenos tus maravillosos productos!
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 bg-white">
                <View className="flex-col px-5">
                    <Text className="text-main-blue text-lg font-Excon_bold">Agrega nuevos productos para que nuevos clientes los vean:</Text>
                    <View className="flex-col mt-4">
                        <View className="items-end mb-4">
                            <Pressable className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center" onPress={AddProduct}>
                                <Ionicons name="add" size={24} color="#015DEC" />
                            </Pressable>
                        </View>
                        <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 h-[45vh]">
                            <ScrollView>
                                <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido")}>
                                    {/* Foto con informacion */}
                                    <View className="flex-row justify-between m-2 px-2 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">
                                        {/* Contenedor de la imagen y la información del producto */}
                                        <View className="flex-row w-[95%] max-w-full">
                                            {/* Imagen del producto */}
                                            <View className="justify-center items-center bg-red-600 rounded-lg">
                                                <Image
                                                    source={require('../assets/img/marlin.png')}
                                                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                                                />
                                            </View>

                                            {/* Información del producto */}
                                            <View className="px-6 flex-shrink">
                                                <Text className="font-Excon_bold text-sm">Titulo del producto</Text>
                                                <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                    Este es un producto de la mejor calidad y alta resistencia a golpes
                                                </Text>
                                                <View className="justify-between flex-row">
                                                    <Text className="font-Excon_thin text-sm">₡12 000</Text>
                                                    <Text className="font-Excon_bold text-sm">Inventario: <Text className="font-Excon_thin text-sm">30</Text></Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* 3 Puntos (opciones adicionales) */}
                                        <View className="flex-col gap-y-1 h-full items-center">
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                            <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        </View>
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View className="flex-col px-5 mt-4">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
                            <View className={`w-6 h-6 border-2 border-main-blue ${acceptedTerms ? 'bg-main-blue' : 'bg-white'}`} />
                        </TouchableOpacity>
                        {/* corregir la ruta para mostrar los terminos y condiciones */}
                        <Text className="ml-2 text-main-blue text-xs font-Excon_thin">He leído y acepto los <Text onPress={() => navigation.navigate("Pedido")} className="text-main-blue text-xs font-Excon_bold">términos y condiciones</Text> </Text>
                    </View>
                </View>
                <TouchableOpacity
                    className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms ? '' : 'opacity-50'}`}
                    onPress={"createShop"}
                >
                    <FontAwesome5 name="upload" size={24} color="white" />
                    <Text className="text-white font-Excon_bold text-lg ml-2">Guardar</Text>
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
                    <ScrollView>


                        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                            <View className="bg-white p-5 w-full h-full">
                                <View className="flex-row mb-5 ">
                                    <Pressable className=" rounded-full px-4 py-2" onPress={() => setModalVisible(!modalVisible)}>
                                        <Text className="text-main-blue text-lg font-Excon_bold">X</Text>
                                    </Pressable>
                                </View>
                                <View className="flex-col px-5">
                                    <Text className="text-main-blue text-md font-Excon_bold">Nombre del producto</Text>
                                    <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin" placeholder="Nombre de la tienda" />
                                </View>
                                <View className="flex-col px-5">
                                    <Text className="text-main-blue text-md font-Excon_bold">Descripción</Text>
                                    <TextInput className="border-[0.5px] border-main-blue rounded-lg px-4 my-2 font-Excon_thin"
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
                                                        <View key={index} className="relative py-[10px] border-b-[0.5px] border-main-blue flex-row justify-between mb-2">
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
                                        (<View className="relative flex-row py-[10px]  justify-between items-center mb-2">
                                            <Text className="text-main-blue text-md font-Excon_bold">Cantidad en inventario</Text>
                                            <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" />
                                        </View>)}

                                    <View className="relative flex-row py-[10px] justify-between items-center mb-2">
                                        <Text className="text-main-blue text-md font-Excon_bold">Precio</Text>
                                        <View className="flex-row items-center">
                                            <Text className="text-main-blue text-md font-Excon_regular">₡ </Text>
                                            <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin" />
                                        </View>
                                    </View>

                                    <View className="flex-col my-4">
                                        <Text className="text-main-blue text-md font-Excon_bold mb-2">Foto de producto</Text>
                                        <View className="flex-1 justify-center items-center">
                                            <Pressable className="justify-center items-center mb-4" onPress={pickImages}>
                                                <View className="justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                                    <Feather name="upload" size={24} color="#015DEC" />
                                                    <Text className="text-main-blue text-md font-Excon_thin">
                                                        Haz click para subir imágenes
                                                    </Text>
                                                </View>
                                            </Pressable>
                                            {images.length > 0 && (
                                                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                    {images.map((image, index) => (
                                                        <Image
                                                            key={index}
                                                            source={{ uri: image.uri }}
                                                            style={{ width: 80, height: 80, margin: 5, borderRadius: 8 }}
                                                        />
                                                    ))}
                                                </ScrollView>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                <View className="flex-row justify-center gap-x-2 px-5">
                                    <Pressable className="bg-main-blue w-[45%] rounded-lg py-2 justify-center items-center mx-2 flex-row gap-x-2" onPress={""}>
                                        <Feather name="check" size={24} color="white" />
                                        <Text className="text-white text-md font-Excon_bold">Agregar</Text>
                                    </Pressable>
                                    <Pressable className="border-[0.5px] w-[45%] rounded-lg py-2 justify-center items-center flex-row gap-x-2" onPress={""}>
                                        <Entypo name="cross" size={24} color="black" />
                                        <Text className=" text-md font-Excon_thin">Cancelar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            )
            }
        </View >
    );
}