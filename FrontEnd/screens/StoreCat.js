import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button, Item, FlatList, SafeAreaView, SectionList, Pressable, Image } from 'react-native';
import useStoreType from '../hooks/useStoreType';
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

    return (
        <View className="p-2 bg-white">
            <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Categorias</Text>

            <SafeAreaView>
                <SectionList
                    className="flex-1"
                    sections={allCategories}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => handleCategorySelect(item.id)}>
                                <View className="my-4 mx-2 items-center">
                                    <View className={`bg-gray-200 p-5 rounded-lg w-20 h-20 ${selectedCategoryId === item.id ? 'bg-main-blue' : ''}`}>
                                        <Image
                                            source={image}
                                            className="w-full h-12 rounded-lg"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text className="text-lg text-center text-light-blue">{item.name}</Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                />
            </SafeAreaView>

            <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Tiendas de esta categoría</Text>
            <SafeAreaView  className="flex-1 items-center">
                <FlatList
                    data={storeSelected}
                    numColumns={2}
                    renderItem={({ item }) => <View>
                        <Pressable onPress={() => navigation.navigate('Store')}>
                            <View className="my-4 mx-2">
                                <View className="border-[0.5px] border-black rounded-lg w-[40vw] h-[40vw]">
                                    <Image
                                        source={item.picture}
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

    );
}