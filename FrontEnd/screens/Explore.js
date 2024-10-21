import React, { useEffect, useCallback, useState } from 'react';
import { Button, Text, TextInput, View, FlatList, Image, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";
import useCart from '../hooks/useCart';
import useItems from '../hooks/useItems';
import debounce from 'lodash.debounce';

export function ExploreScreen({ navigation }) {
    const { cart, addToCart } = useCart();
    const { data: items, loading, error, refetch } = useItems();  // refetch for pull-to-refresh
    const [verticalData, setVerticalData] = useState([]);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [refreshing, setRefreshing] = useState(false);  // for pull-to-refresh

    /*   const [fontsLoaded] = useFonts({
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
  
      useEffect(() => {
          if (fontsLoaded) {
              SplashScreen.hideAsync();
          }
      }, [fontsLoaded]); */

    useEffect(() => {
        if (items) {
            setVerticalData(formatItems(items));
        }
    }, [items]);

    const formatItems = (data) => data.map(item => ({
        id: item.id.toString(),
                name: item.name,
                description: item.description,
                baseprice: item.price,
                variation: item.variations,
                price: `${Number(item.price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })}`,
                stock: item.stock,
                picture: item.item_images[0]?.picture,
                pictures: item.item_images,
                store_id: item.store_id,
                item_type: item.item_type
    }));
    /* console.log(items[3].item_images[0].picture); */

    const handleSearch = debounce((text) => {
        if (items) {
            const filteredData = items.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setVerticalData(formatItems(filteredData));
            setIsSearch(!!text);
        }
    }, 300);

    const onRefresh = async () => {
        if (isSearch) {
            return;
        }
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const renderHorizontalItem = useCallback(({ item }) => (
        <Pressable onPress={() => navigation.navigate('Item', { product: item })}>
            <View className="mt-4 items-center">
                <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px] ">
                    <Image
                        source={{ uri: item.picture }}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text className="text-lg font-Excon_bold text-left text-light-blue dark:text-white w-40"
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{item.name}</Text>
                <Text className="text-sm text-start w-full  text-light-blue dark:text-white font-Erode_bold">{item.price}</Text>
            </View>
        </Pressable>
    ), [navigation]);

    const getItemLayout = (data, index) => (
        { length: 100, offset: 100 * index, index }
    );

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-tab py-8">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-dk-blue text-lg font-Excon_regular">
                            Carr. Interamericana Norte
                        </Text>
                        <AntDesign name="down" size={18} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={() => navigation.navigate("Cart")}>
                                <Feather name="shopping-cart" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            {loading && (
                <View className="w-full h-full justify-center items-center absolute z-10">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            <View className="flex-row text-center mt-5 mb-5 bg-grey-light dark:bg-dk-input rounded-lg mx-2">
                <Pressable className="bg-light-blue dark:bg-main-blue rounded-l-lg px-2 flex justify-center"
                    onPress={() => handleSearch(search)}
                >
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </Pressable>
                <TextInput
                    className="ml-2 py-4 text-md text-light-blue dark:text-white font-Excon_regular w-[70%]"
                    placeholder='Buscar Productos'
                    placeholderTextColor={placeholderTextColor}
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                        handleSearch(text);
                    }}
                />
                {search ? (
                    <Pressable className="flex-1 items-end mr-4 justify-center"
                        onPress={() => {
                            setSearch('');
                            setIsSearch(false);
                            setVerticalData(formatItems(items));
                        }}

                    >
                        <Ionicons name="close-sharp" size={35} color={placeholderTextColor} />
                    </Pressable>
                ) : null

                }
            </View>

            {isSearch ? (
                <View className="flex-row items-center justify-between px-4">
                    <Text className="text-lg font-Excon_regular text-main-blue dark:text-dk-blue">Resultados</Text>
                </View>
            ) : null

            }

            {isSearch && verticalData.length === 0 && (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">No se encontraron Productos</Text>
                </View>
            )}

            <FlatList
                data={verticalData}
                renderItem={renderHorizontalItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}
