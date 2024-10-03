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

    useEffect(() => {
        const selectedStore = () => {
            const formattedData2 = allStores.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                picture: item.picture,
                type: item.store_type,
            }));

            setStoreSelected(formattedData2);
            console.log(formattedData2);
        };

        selectedStore();
    }, [allStores]);


    const searchStore = (text) => {
        const filteredData = storeSelected.filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );

        const formattedData2 = filteredData.map(item => ({
            id: item.id,
            name: item.name,
            location: item.location,
            picture: item.picture,
            type: item.store_type,
        }));

        setStoreSelected(formattedData2);
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
                type: item.store_type,
            }));
            setStoreSelected(formattedData2);
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

    /* useEffect(() => {
        const scrollToSectionItem = (sectionIndex, itemIndex) => {
            sectionListRef.current?.scrollToLocation({
                sectionIndex,
                itemIndex,
                animated: true,
            });
        };
        scrollToSectionItem(1, 2);
    }, [loading==true]); */

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

            <View className="flex-row text-center mt-5 mb-2 bg-grey-light rounded-lg mx-2">
                <Pressable className="bg-light-blue rounded-l-lg px-2 flex justify-center"
                    onPress={() => searchStore(search)}
                >
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </Pressable>
                <TextInput
                    className="ml-2 py-4 w-full text-md text-light-blue font-Excon_regular"
                    placeholder='Buscar Tiendas'
                    onChangeText={setSearch}
                />
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
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => navigation.navigate('Store', { id: item.id, store: item })}>
                                <View className="my-4 mx-2">
                                    <View className="border-[0.5px] border-black rounded-lg w-[40vw] h-[40vw]">
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
                                    <Text className="text-lg text-light-blue">{item.location}</Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}
