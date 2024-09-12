import * as React from 'react';
import { Button, Text, TextInput, View, StatusBar, FlatList, RefreshControl } from 'react-native';
import { useEffect } from 'react';
import { styled } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function HomeScreen({ navigation }) {

    const verticalData = [
        {
            id: '1',
            title: 'Categorias',
            type: 'category',
            horizontalData: [
                { id: '1a', title: '' },
                { id: '1b', title: '' },
                { id: '1c', title: '' },
                { id: '1d', title: '' }
            ]
        },
        {
            id: '2',
            title: 'Productos para ti',
            type: 'product',
            horizontalData: [
                { id: '2a', title: '' },
                { id: '2b', title: '' },
                { id: '2c', title: '' }
            ]
        },
        {
            id: '3',
            title: 'Tiendas destacadas',
            type: 'store',
            horizontalData: [
                { id: '3a', title: '' },
                { id: '3b', title: '' },
                { id: '3c', title: '' }
            ]
        }
    ];

    const renderHorizontalItem = ({ item }) => (
        <View className="bg-gray-200 p-5 my-2 mx-2 rounded-lg w-40 h-40">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    const renderHorizontalC = ({ item }) => (
        <View className="bg-gray-200 p-5 my-2 mx-2 rounded-lg w-20 h-20">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    const renderVerticalItem = ({ item }) => (
        <View className="p-2 my-2">
            <Text className="ml-8 mt-2 text-[28px] font-extrabold text-main-blue">{item.title}</Text>
            <FlatList
                data={item.horizontalData}
                renderItem={item.type === 'category' ? renderHorizontalC : renderHorizontalItem}
                keyExtractor={horizontalItem => horizontalItem.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <View className="flex-1">
            <View className="w-full flex-col pl-8 pr-8 bg-main-blue pt-14 pb-4">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg">Carr. Interamericana Norte</Text>
                        <AntDesign name="down" size={18} color="white" />
                    </View>
                    <Feather name="shopping-bag" size={24} color="white" />
                </View>
                <View className="flex-row mt-9 rounded-lg">
                    <View className="bg-light-blue rounded-l-lg p-2">
                        <MaterialCommunityIcons name="magnify" size={30} color="white" />
                    </View>
                    <TextInput
                        className="mr-2 bg-white w-64 rounded-r-lg pl-4"
                        placeholder='Buscar'
                        placeholderTextColor={"#88B1FF"}
                    />
                    <View className="bg-white rounded-lg p-2">
                        <AntDesign name="filter" size={28} color="#60a5fa" />
                    </View>
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
