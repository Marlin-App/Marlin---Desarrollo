import React, { useEffect, useCallback, useState } from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreItem from '../hooks/useStoreItem';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";

export function Store({ navigation }) {
    const route = useRoute();
    console.log(route.params);
    const { data, loading } = useStoreItem(route.params.id);
    const [formattedData, setFormattedData] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    console.log(data)
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

    useEffect(() => {
        if (data && data.length > 0) {
            const recontar = data.map(item => ({
                ...item,
                price: Number(item.price).toLocaleString('es-CR', { 
                    style: 'currency', 
                    currency: 'CRC', 
                    maximumFractionDigits: 0 
                })
            }));
            setFormattedData(recontar);
        }
    }, [data]);

    const searchProduct = (text) => {
        const filteredData = data.filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        const recontarFilteredData = filteredData.map(item => ({
            ...item,
            price: Number(item.price).toLocaleString('es-CR', { 
                style: 'currency', 
                currency: 'CRC', 
                maximumFractionDigits: 0 
            })
        }));
        setFormattedData(recontarFilteredData);
    };

    return (
        <View className="bg-white flex-1 w-full" onLayout={onLayout}>

            <View className="h-[200px] items-center justify-center">

                <Image
                    source={{ uri: route.params.store.picture }}
                    className="w-full h-full absolute"
                />
                <View className="absolute bg-black opacity-50 w-full h-full"></View>
                <View className="mt-5">
                    <View className="flex-row mb-2 justify-between items-center">
                        <Text className="text-[22px] font-Excon_bold text-white text-start w-[70%]">
                            {route.params.store.name}
                        </Text>
                        <Image
                            source={{ uri: route.params.store.banner }}
                            className="h-20 w-20 rounded-lg"
                        />
                    </View>

                    <View className="flex-row text-center bg-grey-light rounded-lg">
                        <Pressable
                            className="bg-light-blue rounded-l-lg px-2 flex justify-center"
                            onPress={() => {
                                searchProduct(search);
                                setIsSearch(true);
                            }}
                        >
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </Pressable>
                        <TextInput
                            className="ml-2 py-3 text-md text-light-blue font-Excon_regular w-[70%]"
                            placeholder='Buscar Productos'
                            placeholderTextColor={'#3498db'}
                            value={search}
                            onChangeText={setSearch}
                            onSubmitEditing={() => {
                                searchProduct(search);
                                setIsSearch(true);
                            }}
                        />
                        {search ? (
                            <Pressable
                                className="flex-1 items-end mr-4 justify-center"
                                onPress={() => {
                                    setSearch('');
                                    searchProduct('');
                                    setIsSearch(false);
                                }}
                            >
                                <Ionicons name="close-sharp" size={35} color="black" />
                            </Pressable>
                        ) : null}
                    </View>
                </View>
            </View>

            {isSearch ? (
                <View className="flex-row items-center justify-between px-4">
                    <Text className="text-lg font-Excon_regular">Resultados de la búsqueda</Text>
                </View>
            ) : null}

            {!loading ? (
                <FlatList
                    data={formattedData}
                    className="flex px-4"
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate('Item', { product: item })}
                            className="mt-4"
                        >
                            <View className="items-center">
                                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px]">
                                    <Image
                                        source={{ uri: item.picture }}
                                        className="rounded-lg w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text
                                    className="text-lg text-light-blue w-40"
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {item.name}
                                </Text>
                                <Text className="text-lg text-light-blue text-start w-full">
                                    {item.price}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <ActivityIndicator size="large" color="#3498db" />
            )}
        </View>
    );
}


