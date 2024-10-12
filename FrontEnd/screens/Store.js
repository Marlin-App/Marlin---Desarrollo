import React, { useEffect, useCallback, useState } from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import fusion from '../assets/fusion.png';
import surf from '../assets/boysurf.png';
import pant from '../assets/pant.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreItem from '../hooks/useStoreItem';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";

export function Store({ navigation }) {

    const route = useRoute();
    const { data, loading, setData } = useStoreItem(route.params.id);
    const dataArray = Array.isArray(data) ? data : [data];
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
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

    const searchProduct = (text) => {
        const filteredData = data.filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())

        );
        const verticalData = filteredData.map(item => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            price: `$${item.price}`,
            stock: item.stock,
            picture: item.picture,
            storeId: item.storeId,
            item_type: item.item_type
        }));

        setData(verticalData);
    };

    return (
        <View className=" bg-white flex-1 w-full">

            <View className=" h-[200px] items-center justify-center">

                <Image
                    source={{ uri: route.params.store.picture}}
                    className="w-full h-full absolute "
                />
                <View className="absolute bg-black opacity-50 w-full h-full "></View>
                <View className="mt-5" >

                    <View className="flex-row mb-2 justify-between items-center ">
                        <Text className="text-[22px] font-Excon_bold text-white text-start w-[70%] " >{route.params.store.name}</Text>
                        <Image
                            source={{ uri: route.params.store.banner }}
                            className="h-20 w-20 rounded-lg "
                        />

                    </View>

                    <View className="flex-row text-center  bg-grey-light rounded-lg ">
                        <Pressable className="bg-main-blue rounded-l-lg px-2 flex justify-center"
                            onPress={() => {
                                searchProduct(search);
                                setIsSearch(true);
                            }}
                        >
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </Pressable>
                        <TextInput
                            className="ml-2 py-2  text-md text-black font-Excon_regular w-[70%] "
                            placeholder='Buscar Productos'
                            placeholderTextColor={'#3498db'}
                            value={search}
                            onChangeText={setSearch}
                            onSubmitEditing={() => {
                                searchProduct(search);
                                setIsSearch(!isSearch);
                            }}
                        />
                        {search ? (
                            <Pressable className="flex-1 items-end mr-4 justify-center"
                                onPress={() => {
                                    setSearch('');
                                     searchProduct('');
                                    setIsSearch(false);
                                }}

                            >
                                <Ionicons name="close-sharp" size={35} color="black" />
                            </Pressable>
                        ) : null

                        }
                    </View>


                </View>


            </View>
            {isSearch ? (
                <View className="flex-row items-center justify-between px-4">
                    <Text className="text-lg font-Excon_regular">Resultados de la busqueda</Text>
                </View>
            ) : null

            }


            {!loading ? (


                <FlatList
                    data={dataArray}
                    className="flex px-4  "
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => navigation.navigate('Item', { product: item })} className=" mt-4">
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
                                <Text className="text-lg text-light-blue text-start w-full ">{item.price}</Text>
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
