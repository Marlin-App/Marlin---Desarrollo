import { Text, View, TextInput, Pressable, Image, ScrollView, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from "nativewind";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import useCRUDProductos from '../hooks/useCRUDProductos';
import { useRoute } from '@react-navigation/native';
import loaderGif from '../assets/loader.gif';

export function EditarProducto({ navigation }) {

    // Datos del producto
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        stock: 0,
        pictures: [],
        store_id: 1, // Por ejemplo, un valor por defecto
        item_type: 1, // Por ejemplo, un valor por defecto
        variations: [],
    });
    // ------------------------------------------------------------------------

    const { getProduct, deleteProduct, editProduct } = useCRUDProductos(navigation);
    const route = useRoute();
    const storeId = route.params || {};
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';
    const [variations, setVariations] = useState([]);
    const [images, setImages] = useState([]);
    const [oldPictures, setOldPictures] = useState([]);
    const [newPictures, setNewPictures] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [product, setProduct] = useState(null);
    const [isloading, setIsLoading] = useState(true);

    // funcion que obtiene el producto
    useEffect(() => {
        // fetch para obtener el producto
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(storeId.product);
            setIsLoading(false);
            setProduct(fetchedProduct);
            // Enable switches based on fetched product attributes //revisar que no viene la informacion
            setImages(fetchedProduct.item_images);

            // verificar si el producto tiene variaciones
            if (fetchedProduct.variations.length > 0) {
                const hasColorAttribute = fetchedProduct.variations[0].item_variations.some(attr => attr.attribute_name == 'Color');
                const hasSizeAttribute = fetchedProduct.variations[0].item_variations.some(attr => attr.attribute_name == 'Talla');
                setFormData({
                    id: fetchedProduct.id,
                    name: fetchedProduct.name,
                    description: fetchedProduct.description,
                    price: fetchedProduct.price,
                    stock: fetchedProduct.stock,
                    pictures: fetchedProduct.item_images,
                    store_id: fetchedProduct.store_id,
                    item_type: fetchedProduct.item_type,
                    variations: fetchedProduct.variations,
                });

                if (hasColorAttribute || hasSizeAttribute) {
                    const populatedVariations = fetchedProduct.variations.map(attr => {
                        const variation = { color: '', size: '', quantity: 0 };
                        attr.item_variations.forEach(value => {
                            if (value.attribute_name === 'Color') {
                                variation.color = value.value;
                            } else if (value.attribute_name === 'Talla') {
                                variation.size = value.value;
                            }
                        });
                        variation.quantity = attr.stock;
                        return variation;
                    });

                    setVariations(populatedVariations);
                    setIsEnabled(hasColorAttribute);
                    setIsEnabled2(hasSizeAttribute);
                } else {

                }

            } else {
                setFormData({
                    id: fetchedProduct.id,
                    name: fetchedProduct.name,
                    description: fetchedProduct.description,
                    price: fetchedProduct.price,
                    stock: fetchedProduct.stock,
                    pictures: fetchedProduct.item_images,
                    store_id: fetchedProduct.store_id,
                    item_type: fetchedProduct.item_type,
                    variations: fetchedProduct.variations,
                });
            }
        };

        fetchProduct();
        console.log(formData);
    }, [storeId.product]);
    // ------------------------------------------------------------------------

    // Función para seleccionar imágenes
    const pickImages = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true, // Activa selección múltiple
                quality: 1,
            });

            if (!result.canceled) {
                // Si permite selección múltiple, toma assets; si no, usa directamente el resultado
                const newImages = result.assets ? result.assets.map((asset) => ({
                    uri: asset.uri,
                    id: Math.random().toString(36).substring(7), // Genera un ID único
                })) : [{
                    uri: result.uri,
                    id: Math.random().toString(36).substring(7),
                }];

                setImages((prevImages) => [...prevImages, ...newImages]);
            }
        }
        catch (error) {
            console.log("Error al seleccionar imágenes: ", error);
        }
    };
    // ------------------------------------------------------------------------

    // Función para manejar la eliminación de imágenes
    const removeImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };
    // ------------------------------------------------------------------------

    // Función para manejar los cambios en el formulario
    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };
    // ------------------------------------------------------------------------

    // Función para manejar el cambio en las variaciones
    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];
        updatedVariations[index] = {
            ...updatedVariations[index],
            [field]: value,
        };
        setVariations(updatedVariations);
    };
    // ------------------------------------------------------------------------

    // Función para agregar una nueva variación
    const addRow = () => {
        setVariations(prevVariations => [
            ...prevVariations,
            { color: '', size: '', quantity: 0 },
        ]);
    };
    // ------------------------------------------------------------------------

    // Función para eliminar una variación
    const removeRow = () => {
        setVariations(prevVariations => {
            if (prevVariations.length > 1) {
                return prevVariations.slice(0, -1);
            }
            return prevVariations;
        });
    };
    // ------------------------------------------------------------------------

    // Función para manejar el cambio en las variaciones
    useEffect(() => {
        if (isEnabled || isEnabled2) {
            if (variations.length === 0) {
                setVariations([{ color: '', size: '', quantity: 0 }]);
            }
        } else {
            setVariations([]);
        }
    }, [isEnabled, isEnabled2]);
    // ------------------------------------------------------------------------

    // funcion que se ejecuta cuando cambian las imagenes
    useEffect(() => {
        const { newPictures, oldPictures } = images.reduce(
            (acc, image) => {
                if (typeof image.id === "number") {
                    acc.oldPictures.push(image);
                } else {
                    acc.newPictures.push(image);
                }
                return acc;
            },
            { newPictures: [], oldPictures: [] }
        );
        setNewPictures(newPictures);
        setOldPictures(oldPictures);
    }, [images]);
    // ------------------------------------------------------------------------

    // Función para editar el producto
    const editProducts = () => {
        const productVariations = variations.map((variation, index) => {
            const attributes = [];

            if (isEnabled) {
                attributes.push({ name: 'Color', value: variation.color });
            }

            if (isEnabled2) {
                attributes.push({ name: 'Talla', value: variation.size });
            }

            return {
                stock: parseInt(variation.quantity, 10),
                attribute_values: attributes
            };
        });

        const newProduct = {
            id: formData.id,
            attributes: productVariations,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: productVariations.length > 0 ? productVariations.reduce((total, variation) => total + variation.stock, 0) : formData.stock,
            pictures: oldPictures.length > 0 ? oldPictures : [],
            new_pictures: newPictures.length > 0 ? newPictures : [],
            store_id: storeId.store,
            item_type: 1,
        };
        editProduct(newProduct, storeId.product);
    };
    // ------------------------------------------------------------------------

    // Función para eliminar el producto
    const DeleteProduct = () => {
        deleteProduct(storeId.product);
        navigation.goBack();
    }
    // ------------------------------------------------------------------------

    if (isloading) {
        return (
            <View className="bg-main-blue w-full h-full justify-center items-center">
                <Image source={loaderGif} style={{ width: 300, height: 300 }} />
            </View>
        );
    } else {
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
                                                        onChangeText={(value) => handleVariationChange(index, 'color', value)}
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
                                            <View className="flex-row justify-between"></View>
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
                                                    <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">filas</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </ScrollView>) :
                                (<View className="relative flex-row py-[10px] justify-between items-center mb-2">
                                    <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Cantidad en inventario</Text>
                                    <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white" value={formData.stock.toString()} onChangeText={(value) => handleInputChange('stock', value)} />
                                </View>)}

                            <View className="relative flex-row py-[10px] justify-between items-center mb-2">
                                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Precio</Text>
                                <View className="flex-row items-center">
                                    <Text className="text-main-blue text-md font-Excon_regular dark:text-light-blue">₡ </Text>
                                    <TextInput keyboardType="numeric" className="border-[0.5px] rounded-lg w-[25vw] border-main-blue px-4 my-2 font-Excon_thin dark:text-white dark:border-light-blue" value={formData.price} onChangeText={(value) => handleInputChange('price', value)} />
                                </View>
                            </View>

                            <View className="flex-col my-4">
                                <Text className="text-main-blue text-md font-Excon_bold mb-2 dark:text-light-blue">Foto de producto</Text>

                                <Pressable className="justify-center items-center mb-4" onPress={pickImages}>
                                    {images.length === 0 ? (
                                        <View className="justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                            <Feather name="upload" size={24} color="#015DEC" />
                                            <Text className="text-main-blue text-md font-Excon_thin">
                                                Haz click para subir imágenes
                                            </Text>
                                        </View>
                                    ) : (
                                        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {images.map((image, index) => (
                                                <View key={index} style={{ position: 'relative', margin: 5 }}>
                                                    <Image
                                                        source={{ uri: image.picture ? image.picture : image.uri }}
                                                        style={{ width: 80, height: 80, borderRadius: 8 }}
                                                    />
                                                    <Pressable
                                                        onPress={() => removeImage(image.id)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: -5,
                                                            right: -5,
                                                            backgroundColor: 'red',
                                                            borderRadius: 12,
                                                            padding: 2,
                                                        }}
                                                    >
                                                        <Feather name="x" size={16} color="white" />
                                                    </Pressable>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    )}
                                </Pressable>
                            </View>
                        </View>

                        <View className="flex-row justify-center gap-x-2 px-5">
                            <Pressable className="bg-main-blue w-[45%] rounded-lg py-2 justify-center items-center mx-2 flex-row gap-x-2" onPress={() => editProducts()}>
                                <Feather name="check" size={24} color="white" />
                                <Text className="text-white text-md font-Excon_bold">Actualizar</Text>
                            </Pressable>
                            <Pressable className="border-[0.5px] w-[45%] rounded-lg py-2 justify-center items-cente flex-row gap-x-2 bg-red-500" onPress={() => DeleteProduct()}>
                                <Entypo name="cross" size={24} color="white" />
                                <Text className=" text-md font-Excon_regular text-white">Eliminar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}