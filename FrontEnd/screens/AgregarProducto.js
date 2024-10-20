import { Text, View, TextInput, Pressable, Image, ScrollView, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from "nativewind";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import { useCRUDProductos } from '../hooks/useCRUDProductos';
import { useRoute } from '@react-navigation/native';


export function AgregarProducto({ navigation }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        pictures: '',
        store_id: 1, // Por ejemplo, un valor por defecto
        item_type: 1, // Por ejemplo, un valor por defecto
        variations: [],
    });


    const { addProduct } = useCRUDProductos();
    const route = useRoute();
    const storeId = route.params || {};
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';
    const [row, setRow] = useState(1);
    const [variations, setVariations] = useState([]);
    const [images, setImages] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

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

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];
        updatedVariations[index] = {
            ...updatedVariations[index],
            [field]: value,
        };
        setVariations(updatedVariations);
    };

    const addRow = () => {
        setVariations(prevVariations => [
            ...prevVariations,
            { color: '', size: '', quantity: 0 },
        ]);
    };

    const removeRow = () => {
        setVariations(prevVariations => {
            if (prevVariations.length > 1) {
                return prevVariations.slice(0, -1);
            }
            return prevVariations;
        });
    };

    useEffect(() => {
        if (isEnabled || isEnabled2) {
            if (variations.length === 0) {
                setVariations([{ color: '', size: '', quantity: 0 }]);
            }
        } else {
            setVariations([]);
        }
    }, [isEnabled, isEnabled2]);

    const AddProductos = () => {
        const productVariations = variations.map((variation, index) => {
            const attributes = [];
    
            if (isEnabled) {
                attributes.push({name: 'Color', value: variation.color });
            }
    
            if (isEnabled2) {
                attributes.push({name: 'Talla', value: variation.size });
            }
    
            return {
                stock: parseInt(variation.quantity, 10),
                attribute_values: attributes
            };
        });
    
        const newProduct = {
            attributes: productVariations,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: productVariations.length > 0 ?productVariations.reduce((total, variation) => total + variation.stock, 0):formData.stock, // Suma de las cantidades de las variantes
            pictures: images.length > 0 ? images : '', // Ajusta según cómo manejas las imágenes
            store_id: storeId.store,
            item_type: 1,
        };
        addProduct(newProduct);
        navigation.goBack();
    };



    return (
        <ScrollView className="bg-white dark:bg-neutral-950">
            <View className="flex-1 justify-center items-center bg-opacity-50">
                <View className=" p-5 w-full h-full">
                    <View className="flex-col px-5">
                        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Nombre del producto</Text>
                        <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue" value={formData.name} onChangeText={(value) => handleInputChange('name', value)} placeholder="Nombre de la tienda" placeholderTextColor={placeholderTextColor} />
                    </View>
                    <View className="flex-col px-5">
                        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Descripción</Text>
                        <TextInput className="border-[0.5px] border-main-blue rounded-lg px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue"
                            value={formData.description} onChangeText={(value) => handleInputChange('description', value)}
                            multiline
                            numberOfLines={4}
                            maxLength={120}
                            placeholder="Brinda direcciones, calles, avenidas o puntos de referencia para que tu negocio pueda ser ubicado."
                            placeholderTextColor={placeholderTextColor}
                        />
                    </View>

                    <View className="flex-row justify-between items-center px-5">
                        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿Necesita añadir color?</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#015DEC' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <View className="flex-row justify-between items-center px-5 mb-2">
                        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿Necesita añadir Talla?</Text>
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
                                <ScrollView>
                                    <View className="flex-row justify-between border-b-2 border-main-blue dark:border-light-blue p-[10px]">
                                        <Text className="text-main-blue text-md font-Excon_bold dark:text-white">Color</Text>
                                        <Text className="text-main-blue text-md font-Excon_bold dark:text-white">Talla</Text>
                                        <Text className="text-main-blue text-md font-Excon_bold dark:text-white">Cantidad</Text>
                                    </View>
                                    <View>
                                        {variations.map((variation, index) => (
                                            <View key={index} className="relative flex-row py-[10px] border-b-2 border-main-blue dark:border-light-blue justify-between mb-2">
                                                <TextInput
                                                    className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue"
                                                    editable={isEnabled}
                                                    value={variation.color}
                                                    onChangeText={(value) => handleVariationChange(index,'color', value)}
                                                />
                                                <TextInput
                                                    className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue"
                                                    editable={isEnabled2}
                                                    value={variation.size}
                                                    onChangeText={(value) => handleVariationChange(index, 'size', value)}
                                                />
                                                <TextInput
                                                    keyboardType="numeric"
                                                    className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue"
                                                    value={variation.quantity.toString()}
                                                    onChangeText={(value) => handleVariationChange(index, 'quantity', value)}
                                                />
                                            </View>
                                        ))}
                                        <View className="flex-row justify-between">
                                            <Pressable className="flex-row justify-center mb-1 gap-x-4 items-center" onPress={removeRow}>
                                                <View className="rounded-full border-[1.5px] border-main-blue w-8 h-8 justify-center items-center dark:border-light-blue">
                                                    <Ionicons name="remove-sharp" size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#015DEC'} />
                                                </View>
                                                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">filas</Text>
                                            </Pressable>
                                            <Pressable className="flex-row justify-center mb-1 gap-x-4 items-center" onPress={addRow}>
                                                <View className="rounded-full border-[1.5px] border-main-blue w-8 h-8 justify-center items-center dark:border-light-blue">
                                                    <Ionicons name="add" size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#015DEC'} />
                                                </View>
                                                <Text className="text-main-blue text-md font-Excon_boldb dark:text-light-blue">filas</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>) :
                            (<View className="relative flex-row py-[10px] justify-between items-center mb-2">
                                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Cantidad en inventario</Text>
                                <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue" value={formData.stock} onChangeText={(value) => handleInputChange('stock', value)} />
                            </View>)}

                        <View className="relative flex-row py-[10px] justify-between items-center mb-2">
                            <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Precio</Text>
                            <View className="flex-row items-center">
                                <Text className="text-main-blue text-md font-Excon_regular dark:text-light-blue">₡ </Text>
                                <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue dark:border-light-blue px-4 my-2 font-Excon_thin dark:text-white" value={formData.price} onChangeText={(value) => handleInputChange('price', value)} />
                            </View>
                        </View>

                        <View className="flex-col my-4">
                            <Text className="text-main-blue text-md font-Excon_bold mb-2 dark:text-light-blue">Foto de producto</Text>

                            <Pressable className="justify-center items-center mb-4" onPress={pickImages}>
                                {images.length === 0 ? (
                                    <View className="justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full dark:border-light-blue">
                                        <Feather name="upload" size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#015DEC'} />
                                        <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">
                                            Haz click para subir imágenes
                                        </Text>
                                    </View>
                                ) : (
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
                            </Pressable>

                        </View>
                    </View>

                    <View className="flex-row justify-center gap-x-2 px-5">
                        <Pressable className="bg-main-blue w-[45%] rounded-lg py-2 justify-center items-center mx-2 flex-row gap-x-2" onPress={() => AddProductos()}>
                            <Feather name="check" size={24} color="white" />
                            <Text className="text-white text-md font-Excon_bold">Agregar</Text>
                        </Pressable>
                        <Pressable className="border-[0.5px] w-[45%] rounded-lg py-2 justify-center items-cente flex-row gap-x-2 bg-red-500" onPress={""}>
                            <Entypo name="cross" size={24} color="white" />
                            <Text className=" text-md font-Excon_regular text-white">Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </ScrollView>

    );

}