import React, { useEffect, useCallback, useState } from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreItem from '../hooks/useStoreItem';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";


export function Store({ navigation }) {
    const route = useRoute();
    console.log(route.params.store);
    const { data, loading, setData } = useStoreItem(route.params.id);
    const dataArray = Array.isArray(data) ? data : [data];
    const [formattedData, setFormattedData] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';

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
        <View className="bg-white dark:bg-neutral-950 flex-1 w-full" onLayout={onLayout}>

            <View className="h-[200px] items-center justify-center">

                <Image
                    source={{ uri: route.params.store.banner }}
                    className="w-full h-full absolute "
                />
                <View className="absolute bg-black opacity-50 w-full h-full"></View>
                <View className="mt-5">
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="w-[70%]">
                            <Text className="text-[22px] font-Excon_bold text-white text-start w-full">
                                {route.params.store.name}
                            </Text>
                            <Text className="text-[15px] font-Excon_bold text-white mt-2">
                                Ubicacion: <Text className="font-Excon_regular">{route.params.store.canton} {route.params.store.district}</Text>
                            </Text> 
                            <Text className="text-[15px] font-Excon_bold text-white ">Numero sinpe:<Text className="font-Excon_regular"> {route.params.store.num_sinpe}</Text></Text>
                            <Text className="text-[15px] font-Excon_bold text-white ">Nombre sinpe: <Text className="font-Excon_regular"> { route.params.store.owner_sinpe}</Text></Text>
                        </View>
                        <Image
                            source={{ uri: route.params.store.picture }}
                            className="h-20 w-20 rounded-lg"
                        />
                    </View>

                    <View className="flex-row text-center  bg-grey-light rounded-lg  dark:bg-dk-input mt-2  ">
                        <Pressable className="bg-light-blue dark:bg-main-blue rounded-l-lg px-2 flex justify-center"
                            onPress={() => {
                                searchProduct(search);
                                setIsSearch(true);
                            }}
                        >
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </Pressable>
                        <TextInput
                            className="ml-2 py-2  text-md text-light-blue dark:text-white  font-Excon_regular w-[70%] "
                            placeholder='Buscar Productos'
                            placeholderTextColor={placeholderTextColor}
                            value={search}
                            onChangeText={(text) => {
                                setSearch(text);
                                searchProduct(search);
                            }}
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
                                <Ionicons name="close-sharp" size={35} color={placeholderTextColor} />
                            </Pressable>
                        ) : null}
                    </View>
                </View>
            </View>

            {isSearch ? (
                <View className="flex-row items-center justify-between px-4">
                    <Text className="text-lg mt-2 font-Excon_regular dark:text-white">Resultados de la búsqueda</Text>
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
                                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] dark:bg-neutral-900 p-[2px]">
                                    <Image
                                        source={{ uri: item.item_images.length >0 ? item.item_images[0].picture : 'https://via.placeholder.com/150', }}
                                        className="rounded-lg w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text
                                    className="text-lg font-Excon_bold text-light-blue w-40 dark:text-white"
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.name}
                                </Text>
                                <Text className="text-base font-Erode_bold text-light-blue text-start w-full dark:text-white">
                                    {item.price}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }} // Añade espacio al final
                />




            ) : (
                <ActivityIndicator size="large" color="#3498db" />
            )}
        </View>
    );
}


