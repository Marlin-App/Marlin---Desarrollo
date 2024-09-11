import * as React from 'react';
import { Button, Text, TextInput, View, StatusBar, FlatList, RefreshControl } from 'react-native';
import { useEffect, useCallback } from 'react';
import { styled } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export function HomeScreen({ navigation }) {



    const [fontsLoaded] = useFonts({
        'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
        'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
        'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
        'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
        'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
    });


    

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded)
        return null;



    const verticalData = [
        {
            id: '1', title: 'Categorias', horizontalData: [
                { id: '1a', title: '' },
                { id: '1b', title: '' },
                { id: '1c', title: '' }
            ]
        },
        {
            id: '2', title: 'Productos para ti', horizontalData: [
                { id: '2a', title: '' },
                { id: '2b', title: '' },
                { id: '2c', title: '' }
            ]
        },
        {
            id: '3', title: 'Tiendas destacadas', horizontalData: [
                { id: '2a', title: '' },
                { id: '2b', title: '' },
                { id: '2c', title: '' }
            ]
        },

    ];


    const renderHorizontalItem = ({ item }) => (
        <View className="bg-gray-200 p-5 my-2 mx-2 rounded-lg w-40 h-40">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    const renderVerticalItem = ({ item }) => (
        <View className=" p-2 my-2" onLayout={onLayout}>
            <Text className="ml-2 mt-2 text-2xl font-Excon_bold">{item.title}</Text>
            <FlatList
                data={item.horizontalData}
                renderItem={renderHorizontalItem}
                keyExtractor={horizontalItem => horizontalItem.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
    /* useEffect(() => {
        navigation.setOptions({


            headerSearchBarOptions: {
                headerShown: true,
                placeholder: 'Buscar',
                styles: {
                    backgroundColor: '#0038A2',
                    color: 'white',
                    height: 50,
                    borderRadius: 10,
                    fontSize: 20,
                    width: 300,
                    margin: 10,
                    padding: 10,
                },
            },
            headerSearchBarStyle: {
                backgroundColor: '#0038A2',
                color: 'white',
                height: 50,
                borderRadius: 10, 
                fontSize: 20,
                width: 300,
                margin: 10,
                padding: 10,
            },
        });
    }, []); */

    return (
        <View className="flex-1">
            <View className=" w-full flex-col pl-8 pr-8 bg-main-blue pt-8 pb-6 " >
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-Excon_regular">Carr. Interamericana Norte</Text>
                        <AntDesign name="down" size={18} color="white" />
                    </View>
                    <Feather name="shopping-bag" size={24} color="white" />
                </View>
                <View className="flex-row text-center mt-5 bg-white rounded-lg">
                    <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                        <MaterialCommunityIcons name="magnify" size={30} color="white" />
                    </View>
                    <TextInput className="ml-2 py-4 w-full text-md font-Erode_regular"
                        placeholder='Buscar'
                    />
                </View>
            </View>
            <View>
                <FlatList
                    data={verticalData}
                    renderItem={renderVerticalItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            </View>
        </View>
    );
}
