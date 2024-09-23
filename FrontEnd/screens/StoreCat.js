import { React, useState, useEffect, useCallback } from 'react';
import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image } from 'react-native';
import useStoreType from '../hooks/useStoreType';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


import image from '../assets/img/fondoLanding.png';

export function StoreCat({ navigation }) {

    const { allCategories, allStores } = useStoreType();
    const [categoryId, setCategoryId] = useState(null);
    const [storeSelected, setStoreSelected] = useState([]);

    useEffect(() => {
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

    return (
        <View className=" bg-white">
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-Excon_regular">
                            Carr. Interamericana Norte
                        </Text>
                        <AntDesign name="down" size={18} color="white" />
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
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
                <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </View>
                <TextInput className="ml-2 py-4 w-full text-md text-light-blue font-Excon_regular"
                    placeholder='Buscar Tiendas'
                />
            </View>

            <View className="px-2">

            
            <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Categorias</Text>

            <SafeAreaView>
                <SectionList
                    sections={allCategories}
                    horizontal={true}
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
            </SafeAreaView>

            <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Tiendas de esta categoría</Text>
            <SafeAreaView  className="items-center">
                <FlatList
                    data={storeSelected}
                    numColumns={2}
                    renderItem={({ item }) => <View>
                        <Pressable
                            onPress={() => navigation.navigate('Store', { id: item.id, store: item })}
                        >
                            <View className="my-4 mx-2">
                                <View className="border-[0.5px] border-black rounded-lg w-[40vw] h-[40vw]">
                                    <Image
                                        source={{ uri: item.picture }}
                                        className="rounded-lg w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text className="text-lg text-light-blue">{item.name}</Text>
                                <Text className="text-lg text-light-blue">{item.location}</Text>
                            </View>
                        </Pressable>
                    </View>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
        </View>
    );
}