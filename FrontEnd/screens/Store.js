import * as React from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import fusion from '../assets/fusion.png';
import surf from '../assets/boysurf.png';
import pant from '../assets/pant.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreItem from '../hooks/useStoreItem';
import { useRoute } from '@react-navigation/native';

export function Store({ navigation }) {

    const route = useRoute();
    console.log(route.params);
    const { data, loading } = useStoreItem(route.params.id);
    const dataArray = Array.isArray(data) ? data : [data];
    return (
        <View className="h-full bg-white">
            <Image
                source={fusion}
                className="w-full h-28"
            />
            <ScrollView>
                <View className="px-4">
                    <View className="flex-row justify-center items-center">
                        <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">{route.params.store.name} </Text>
                        <Pressable className="p-4 h-10 bg-main-blue flex justify-center items-center mr-2 rounded-md">
                            <Text className="text-white font-Excon_regular text-[20px] text-center">Catálogo</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row text-center mt-5 bg-grey-light rounded-lg">
                        <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </View>
                        <TextInput
                            className="ml-2 py-4 w-full text-md font-Erode_regular"
                            placeholder='Buscar'
                        />
                    </View>
                </View>
                <Image
                    source={{ uri: route.params.store.picture }} 
                    className="w-full my-4 h-28"
                    resizeMode="stretch"
                />
                <View>

                        {!loading ? (
                            <FlatList
                                data={dataArray}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <TouchableOpacity to={{ screen: 'Item' }} onPress={() => navigation.navigate('Item', { product: item })}>
                                        <View className="my-2 mx-4 items-start">
                                            <View className=" rounded-lg w-40 h-40 ">
                                                <Image
                                                    source={{ uri: item.picture }} // Suponiendo que sea una URL
                                                    className="w-full h-full rounded-lg"
                                                    resizeMode="stretch"
                                                />
                                            </View>
                                            <Text className="text-lg font-bold text-left text-light-blue">{item.name}</Text>
                                            <Text className="text-sm text-left text-light-blue font-thin">{item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                        ) : (
                           
                            <ActivityIndicator size="large" color="#3498db" />
                            
                        )}

                </View>
            </ScrollView>
        </View>
    );
}