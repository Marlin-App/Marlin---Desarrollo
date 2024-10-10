import { React, useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import useStoreType from '../hooks/useStoreType';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import image from '../assets/img/fondoLanding.png';

export function StoreCat({ navigation }) {
    const { allCategories, allStores, loading } = useStoreType();
    const [categoryId, setCategoryId] = useState(null);
    const [storeSelected, setStoreSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [originalStoreSelected, setOriginalStoreSelected] = useState([]);

    useEffect(() => {
        const selectedStore = () => {
            const formattedData = allStores.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                picture: item.picture,
                type: item.store_type,
                banner: item.banner,
            }));

            setOriginalStoreSelected(formattedData);  // Guardar el estado inicial completo
            setStoreSelected(formattedData);
        };

        selectedStore();
    }, [allStores]);


    const searchStore = (text) => {
        const filteredData = originalStoreSelected.filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setStoreSelected(filteredData);
    };

    // Para limpiar la búsqueda
    const clearSearch = () => {
        setSearch('');
        setStoreSelected(originalStoreSelected);  // Restablecer la lista original
    };
    useEffect(() => {
        if (categoryId === null) {
            setStoreSelected(allStores);
            return;
        }
        const selectedStoreType = () => {
            const filteredData = allStores.filter(item => item.store_type.includes(categoryId));
            const formattedData2 = filteredData.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                picture: item.picture,
                banner: item.banner,
                type: item.store_type,
            }));
            clearSearch();
            setStoreSelected(formattedData2);
            setOriginalStoreSelected(formattedData2);  
        };

        selectedStoreType();
    }, [categoryId]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const handleCategorySelect = (categoryId) => {
        setCategoryId(categoryId);
        setSelectedCategoryId(categoryId);
    };

    const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    const sectionListRef = useRef(null);



    return (
        <View className="bg-white flex-1 " onLayout={onLayout}>
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-Excon_regular">
                            Carr. Interamericana Norte
                        </Text>
                        <AntDesign name="down" size={18} color="white" />
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={() => navigation.navigate("Cart")}>
                                <Feather name="shopping-bag" size={24} color="white" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>


            <View className="flex-row text-center mt-5 mb-5 bg-grey-light rounded-lg mx-2 ">
                <Pressable className="bg-light-blue rounded-l-lg px-2 flex justify-center"
                    onPress={() => {
                        searchStore(search);
                    }}
                >
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </Pressable>
                <TextInput
                    className="ml-2 py-4  text-md text-light-blue font-Excon_regular w-[70%] "
                    placeholder='Buscar Productos'
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={() => {
                        searchStore(search);
                        /* setIsSearch(!isSearch); */
                    }}
                />
                {search ? (
                    <Pressable
                        className="flex-1 items-end mr-4 justify-center"
                        onPress={() => {
                            clearSearch(); // Usar la función que restablece el estado original
                        }}
                    >
                        <Ionicons name="close-sharp" size={35} color="black" />
                    </Pressable>
                ) : null}
            </View>


            <View className="px-2 flex-1">
                {loading ? (
                    <View className={`w-full h-full justify-center items-center  bg-white ${loading ? 'blur-sm' : 'blur-0'}`}>
                        <ActivityIndicator size="large" color="#3498db" />
                    </View>
                ) : null}

                <View className="">
                    <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Categorias</Text>

                    <SectionList
                        sections={allCategories}
                        horizontal={true}
                        ref={sectionListRef}
                        renderItem={({ item }) => (
                            <View>
                                <Pressable onPress={() => handleCategorySelect(item.id)}>
                                    <View className="my-4 mx-2 items-center">
                                        <View className={`bg-gray-200 p-5 rounded-lg w-20 h-20 ${selectedCategoryId == item.id ? 'bg-main-blue' : ''}`}>
                                            <AntDesign name="CodeSandbox" size={40} color={selectedCategoryId == item.id ? "white" : "black"} />
                                        </View>
                                        <Text className="text-lg text-center text-light-blue">{item.name}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        )}
                    />
                </View>

                <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue ">Tiendas de esta categoría</Text>
                {storeSelected.length == 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-red-500">No se encontraron tiendas</Text>
                    </View>
                ) : null}

                <FlatList
                    data={storeSelected}
                    numColumns={2}
                    className="flex  "
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    renderItem={({ item }) => (

                        <Pressable onPress={() => navigation.navigate('Store', { id: item.id, store: item })} className=" mt-4">
                            <View className="items-center ">
                                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px] ">
                                    <Image
                                        source={{ uri: item.picture }}
                                        className="rounded-lg w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text className="text-lg text-light-blue w-40"
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >{item.name}</Text>
                                <Text className="text-lg text-light-blue text-start w-full ml-12">{item.location}</Text>
                            </View>
                        </Pressable>

                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}
