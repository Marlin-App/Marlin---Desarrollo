import React, { useEffect, useCallback, useState } from 'react';
import { Button, Text, TextInput, View, FlatList, Image, ScrollView, TouchableOpacity, Pressable, ActivityIndicator, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useCart from '../hooks/useCart';
import useItems from '../hooks/useItems';

import Ionicons from "@expo/vector-icons/Ionicons";




export function ExploreScreen({ navigation }) {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addToCart,
        total,
    } = useCart();

    const { data: items, loading, error } = useItems();
    const [verticalData, setverticalData] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);



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
        if (items) {
            const data = items.map(item => ({
                id: item.id.toString(),
                name: item.name,
                description: item.description,
                price: `$${item.price}`,
                stock: item.stock,
                picture: item.picture,
                storeId: item.storeId,
                item_type: item.item_type
            }));
            setverticalData(data);
        }
    }, [items]);


    const searchProduct = (text) => {
        const filteredData = items.filter(item =>
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

        setverticalData(verticalData);
    };



    const renderHorizontalItem = ({ item }) => (

        <TouchableOpacity to={{ screen: 'Item' }} onPress={() => navigation.navigate('Item', { product: item })}
            
        >
            <View className="mt-4 items-center">
                <View className=" rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px] ">
                    <Image
                        source={{ uri: item.picture }}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text className="text-lg font-bold text-left text-light-blue w-40"
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{item.name}</Text>
                <Text className="text-sm text-start w-full  text-light-blue font-thin">{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
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

            {loading ? (
                <View className={`w-full h-full justify-center items-center absolute z-10 `}>
                     <Image
                        source={require('../../FrontEnd/assets/img/loading.gif')}
                        className="h-36 w-36 rounded-lg"
                        resizeMode="center"
                    />
                 
                </View>
            ) : null}

            <View className="flex-row text-center mt-5 mb-5 bg-grey-light rounded-lg mx-2 ">
                <Pressable className="bg-light-blue rounded-l-lg px-2 flex justify-center"
                        onPress={() => {
                            searchProduct(search);
                            setIsSearch(true);
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
                            searchProduct(search);
                            setIsSearch(!isSearch);
                        }}
                    />
                    { search ? (
                        <Pressable className="flex-1 items-end mr-4 justify-center"
                        onPress={() => {
                            setSearch('');
                            searchProduct('');
                            setIsSearch(false);
                        }}
                        
                        >
                            <Ionicons  name="close-sharp" size={35} color="black" />
                        </Pressable>
                    ) : null

                    }
            </View>
            {isSearch ? (
                <View className="flex-row items-center justify-between px-4">
                    <Text className="text-lg font-Excon_regular">Resultados de la busqueda</Text>
                </View>
            ) : null

            }

            {verticalData.length == 0 && isSearch ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">No se encontraron Productos</Text>
                </View>
            ) : null}
          
            <FlatList
                data={verticalData}
                className="px-4 flex"
                renderItem={renderHorizontalItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

           

        </View>
    );
}
