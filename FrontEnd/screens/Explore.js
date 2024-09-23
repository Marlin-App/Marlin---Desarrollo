import React, { useEffect, useCallback } from 'react';
import { Button, Text, TextInput, View, FlatList, Image, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useCart from '../hooks/useCart';
import useItems from '../hooks/useItems';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

    const verticalData = items.map(item => ({

        id: item.id.toString(),
        name: item.name,
        description: item.description,
        price: `$${item.price}`,
        stock: item.stock,
        picture: { uri: item.picture },
        storeId: item.storeId,
        item_type: item.item_type

    }));



    const renderHorizontalItem = ({ item }) => (

        <TouchableOpacity to={{ screen: 'Item' }} onPress={() => navigation.navigate('Item', { product: item })}>
            <View className="mt-4 mr-4 ml-5 items-start">
                <View className="bg-cyan-600 rounded-lg w-40 h-40 p-1">
                    <Image
                        source={item.picture}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text className="text-lg font-bold text-left text-light-blue">{item.name}</Text>
                <Text className="text-sm text-left text-light-blue font-thin">{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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

            <View className="flex-row text-center mt-5 mb-5 bg-grey-light rounded-lg mx-2">
                <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </View>
                <TextInput className="ml-2 py-4 w-full text-md text-light-blue font-Excon_regular"
                    placeholder='Buscar Producto'
                />
            </View>

            <Text style={{
                borderBottomColor: '#015DEC',
                borderBottomWidth: 2,
                opacity: 0.2,
                marginBottom: 10
            }}>

            </Text>
            <ScrollView>
                <FlatList
                    data={verticalData}
                    renderItem={renderHorizontalItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
        </View>
    );
}
