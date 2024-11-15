import { Text, View, TextInput, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useColorScheme } from "nativewind";
import React, { useEffect, useState, useRef } from 'react';
import { DropDown } from '../components/DropDown';
import useSelectLocation from '../hooks/useSelectLocation';
import useStoreType from '../hooks/useStoreType';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useCRUDTiendas from '../hooks/useCRUDTiendas';
import { useRoute } from '@react-navigation/native';

export function NuevaTienda({ navigation }) {

    //categorias
    const { allCategories, allStores } = useStoreType();
    const sectionListRef = useRef(null);
    const { createShop, loading, deleteShop, updateShop } = useCRUDTiendas(navigation);
    const route = useRoute();
    const { store } = route.params || {};

    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';

    // funciones que agrega las categorias
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
    // ------------------------------------------------------------------------

    // Opciones de cantones
    const cantones = [
        { label: 'Puntarenas', value: 'Puntarenas' },
        { label: 'Esparza', value: 'Esparza' },
        { label: 'Montes de Oro', value: 'Montes de Oro' },
    ];
    // ------------------------------------------------------------------------

    // Opciones de distritos
    const getDistrictsByCanton = (canton) => {
        switch (canton) {
            case 'Puntarenas':
                return [
                    { label: 'Puntarenas', value: 'Puntarenas' },
                    { label: 'Chacarita', value: 'Chacarita' },
                    { label: 'El Roble', value: 'El Roble' },
                    { label: 'Barranca', value: 'Barranca' },
                ];
            case 'Esparza':
                return [
                    { label: 'Espíritu Santo', value: 'Espítiru Santo' },
                    { label: 'Macacona', value: 'Macacona' },
                    { label: 'San Jerónimo', value: 'San Jerónimo' },
                ];
            case 'Montes de Oro':
                return [
                    { label: 'La Unión', value: 'La Unión' },
                    { label: 'San Isidro', value: 'San Isidro' },
                    { label: 'Miramar', value: 'Miramar' },
                ];
            default:
                return [];
        }
    };
    // ------------------------------------------------------------------------

    // Funcion para seleccionar la imagen
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
    // ------------------------------------------------------------------------

    // terminos y condiciones
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    // ------------------------------------------------------------------------

    // Datos de la tienda
    const [formData, setFormData] = useState({
        name: store ? store.name : "",
        description: store ? store.description : "",
        canton: store ? store.canton : "",
        district: store ? store.district : "",
        coodernates: store ? store.coodernates : "",
        picture: store ? store.picture : "",
        user_id: "",
        sinpe: store ? store.num_sinpe : "",
        banner: store ? store.banner : "",
        sinpe_name: store ? store.owner_sinpe : "",
        opening_hour: "09:00:00",
        closing_hour: "18:00:00",
        store_type: store ? store.store_type : [],
    });
    // ------------------------------------------------------------------------

    const [selectedCategoryIds, setSelectedCategoryIds] = useState(formData.store_type);
    const [selectedValue, setSelectedValue] = useState(formData.canton);
    const [selectedValue2, setSelectedValue2] = useState(formData.district);
    const { location, setModalVisible, LocationPickerComponent, isModalVisible } = useSelectLocation();
    const [imagePerfil, setimagePerfil] = useState(formData.picture);
    const [imagePortada, setimagePortada] = useState(formData.banner);

    // Función para manejar el cambio en los campos
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    // ------------------------------------------------------------------------

    // Funcion para manejar el cambio en los campos en distritos
    useEffect(() => {
        handleInputChange('district', selectedValue2);
    }, [selectedValue2]);
    // ------------------------------------------------------------------------

    // Funcion para manejar el cambio en los campos en cantones
    useEffect(() => {
        handleInputChange('canton', selectedValue);
    }, [selectedValue]);
    // ------------------------------------------------------------------------

    // Funcion para manejar las coordenadas
    useEffect(() => {
        handleInputChange('coodernates', location);
    }, [location]);
    // ------------------------------------------------------------------------

    // Funcion para el cambio en las categorias
    useEffect(() => {
        handleInputChange('store_type', selectedCategoryIds);
        console.log(selectedCategoryIds);
    }, [selectedCategoryIds]);
    // ------------------------------------------------------------------------

    // Funcion para manejar las imagenes
    useEffect(() => {
        handleInputChange('picture', imagePerfil);
    }, [imagePerfil]);
    // ------------------------------------------------------------------------

    // Funcion para manejar las imagenes de la portada
    useEffect(() => {
        handleInputChange('banner', imagePortada);
    }, [imagePortada]);
    // ------------------------------------------------------------------------

    // Funcion para crear la tienda
    const handleShop = async () => {
        await createShop(formData, imagePerfil, imagePortada, acceptedTerms);
        if (createShop.ok) {
            navigation.navigate('Home');

        }
    };
    // ------------------------------------------------------------------------

    // Funcion para eliminar la tienda
    const handledeleteShop = async () => {
        await deleteShop(store.id);
    };
    // ------------------------------------------------------------------------

    // Funcion para actualizar la tienda
    const handleUpdateShop = async () => {
        await updateShop(formData, imagePerfil, imagePortada, store.id);
    };
    // ------------------------------------------------------------------------

    const [districts, setDistricts] = useState([]);

    // Funcion para manejar los distritos
    useEffect(() => {
        setDistricts(getDistrictsByCanton(selectedValue));

    }, [selectedValue]);
    // ------------------------------------------------------------------------

    return (
        <ScrollView className="bg-white dark:bg-neutral-950 px-5">
            {loading ? (
                <View className={`w-full h-full justify-center items-center absolute z-10  `}>
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            ) : null}
            <View className="w-full flex-col px-4 py-8">
                {store ? (
                    <Text className="text-main-blue text-3xl font-Excon_bold">
                        ¡Edita tu tienda!

                    </Text>
                ) : (
                    <Text className="text-main-blue text-3xl font-Excon_bold dark:text-light-blue">
                        ¡Aquí inicia el camino al emprendimiento!
                    </Text>
                )
                }
            </View>

            <View className="flex-col px-5">
                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿Cómo se llama tu negocio?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Nombre de la tienda"
                    placeholderTextColor={placeholderTextColor}
                />
            </View>

            <View className="flex-col px-5 mb-4">
                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Ubicación</Text>
                <View className="border-[0.5px] px-4 py-2 rounded-lg my-2 dark:border-main-blue">
                    <DropDown
                        title="Selecciona el cantón donde se ubica tu emprendimiento:"
                        active={true}
                        place="Cantón"
                        options={cantones}
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    />
                </View>
                <View className="border-[0.5px] px-4 py-2 rounded-lg my-2 dark:border-main-blue">
                    <DropDown
                        title="Selecciona el distrito donde se ubica tu emprendimiento:"
                        place="Distrito"
                        active={selectedValue ? true : false}
                        options={districts}
                        selectedValue={selectedValue2}
                        onValueChange={(value) => setSelectedValue2(value)}
                    />
                </View>
                <View className="flex-row justify-between items-center my-4">
                    {location ? (
                        <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin dark:border-main-blue dark:text-white" >{location.latitude.toString().slice(0, 8)},{location.longitude.toString().slice(0, 8)}</Text>

                    ) : (
                        <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin dark:border-main-blue dark:text-white">Coordenadas</Text>
                    )}
                    <Pressable onPress={() => setModalVisible(true)}>
                        <Image className="" source={require('../assets/img/location.png')} />
                    </Pressable>
                    {isModalVisible && <LocationPickerComponent />}
                </View>
            </View>

            <View className="flex-col px-5">
                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Referencias</Text>
                <TextInput className="border-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white"
                    multiline
                    numberOfLines={4}
                    maxLength={120}
                    placeholderTextColor={placeholderTextColor}
                    placeholder="Brinda direcciones, calles, avenidas o puntos de referencia para que tu negocio pueda ser ubicado."
                    value={formData.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                />
            </View>

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿Numero para recibir Sinpe Movil?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white" placeholder="Número de teléfono"
                    value={formData.sinpe}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={(value) => handleInputChange('sinpe', value)}
                    keyboardType='numeric'
                    maxLength={10}
                />
            </View>

            <View className="flex-col px-5 my-4">
                <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">¿A nombre de quien está el Sinpe Movil?</Text>
                <TextInput className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white" placeholder="Digitale el nombre del titular de la cuenta"
                    value={formData.sinpe_name}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={(value) => handleInputChange('sinpe_name', value)}
                />
            </View>

            <View className="w-full flex-col px-4 py-8">
                <Text className="text-main-blue text-3xl font-Excon_bold dark:text-light-blue">
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
                            <Pressable onPress={() => addCategoryList(item.id)}

                            >
                                <View className="my-4 mx-2 items-center">
                                    <View
                                        className={`bg-gray-200 p-5 rounded-lg w-20 h-20 ${selectedCategoryIds.includes(item.id) ? 'bg-main-blue' : ''}`}>
                                        {selectedCategoryIds.includes(item.id) ? (
                                            <Image source={{ uri: item.image_selected.replace("image/upload/", "") }} className="w-full h-full " resizeMode="cover" />
                                        ) : (
                                            <Image source={{ uri: item.image.replace("image/upload/", "") }} className="w-full h-full" resizeMode="cover" />
                                        )}
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
                                <Feather name="upload" size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#015DEC'} />
                                <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">Haz click para subir una imagen</Text>
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
                                <Feather name="upload" size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#015DEC'} />
                                <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">Haz click para subir una imagen</Text>
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
                    <Text className="ml-2 text-main-blue text-xs font-Excon_thin dark:text-light-blue">He leído y acepto los <Text onPress={() => navigation.navigate("TerminosCondiciones")} className="text-main-blue text-xs font-Excon_bold">términos y condiciones</Text> </Text>
                </View>
            </View>

            {store ? (
                <TouchableOpacity
                    className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? '' : 'opacity-50'}`}
                    onPress={handleUpdateShop}
                >
                    <FontAwesome5 name="upload" size={24} color="white" />
                    <Text className="text-white font-Excon_bold text-lg ml-2">Actualizar</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? '' : 'opacity-50'}`}
                    onPress={acceptedTerms && selectedValue && selectedValue2 && imagePerfil && imagePortada && selectedCategoryIds.length > 0 ? handleShop : null}
                    disabled={!acceptedTerms || !selectedValue || !selectedValue2 || !imagePerfil || !imagePortada || selectedCategoryIds.length === 0}

                >
                    <FontAwesome5 name="upload" size={24} color="white" />

                    <Text className="text-white font-Excon_bold text-lg ml-2">Guardar</Text>
                </TouchableOpacity>
            )
            }

            {store ? (
                <TouchableOpacity className="bg-red-500 py-4 mb-4 rounded-lg flex-row items-center justify-center mx-2"
                    onPress={handledeleteShop}
                >
                    <FontAwesome5 name="times" size={24} color="white" />
                    <Text className="text-white font-Excon_bold text-lg ml-2">Eliminar</Text>
                </TouchableOpacity>
            ) : null}
        </ScrollView>
    );
}