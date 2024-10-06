import React, { useEffect, useCallback } from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import fusion from '../assets/fusion.png';
import surf from '../assets/boysurf.png';
import pant from '../assets/pant.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreItem from '../hooks/useStoreItem';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export function Store({ navigation }) {

    const route = useRoute();
    console.log(route.params);
    const { data, loading } = useStoreItem(route.params.id);
    const dataArray = Array.isArray(data) ? data : [data];

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

   

    return (
        <View className=" bg-white flex-1 w-full">
            <Image
                source={fusion}
                className="w-full h-28"
            />
           
                <View className="px-4 mb-4">
                    <View className="flex-row  ">
                        <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">{route.params.store.name} </Text>
                    </View>
                    <View className="flex-row text-center mt-5 bg-grey-light rounded-lg">
                        <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </View>
                        <TextInput
                            className="ml-2 py-4 w-full text-md text-light-blue font-Excon_regular"
                            placeholder='Buscar'
                        />
                    </View>
                </View>
             
                    {!loading  ? (
                     
                     
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
