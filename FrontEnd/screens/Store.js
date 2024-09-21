import * as React from 'react';
import { Text, View, Image, Pressable, TextInput, ScrollView, FlatList, SafeAreaView, } from 'react-native';
import fusion from '../assets/fusion.png';
import surf from '../assets/boysurf.png';
import pant from '../assets/pant.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStoreType from '../hooks/useStoreType';


export function Store({ navigation }) {

    const { allCategories, allStores } = useStoreType();

    return (
        <View className="h-full bg-white">
            <Image
                source={fusion}
                className="w-full h-28">
            </Image>
            <ScrollView>
                <View className="px-4">
                    <View className="flex-row justify-center items-center">
                        <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">ARENAS SKATE AND SURF</Text>
                        <Pressable className="p-4 h-10 bg-main-blue flex justify-center items-center mr-2 rounded-md">
                            <Text className="text-white font-Excon_regular text-[20px] text-center">Catálogo</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row text-center mt-5 bg-grey-light rounded-lg">
                        <View className="bg-light-blue rounded-l-lg px-2 flex justify-center">
                            <MaterialCommunityIcons name="magnify" size={30} color="white" />
                        </View>
                        <TextInput className="ml-2 py-4 w-full text-md font-Erode_regular"
                            placeholder='Buscar'
                        />
                    </View>
                </View>
                <Image
                    source={surf}
                    className="w-full my-4  h-28">
                </Image>
                <View>
                    <SafeAreaView className="flex-1 items-center">
                        <FlatList
                            data={allStores}
                            numColumns={2}
                            renderItem={({ item }) => <View>
                                <Pressable>
                                    <View className="my-4 mx-2">
                                        <View className="border-[0.5px] border-black rounded-lg w-[40vw] h-[40vw]">
                                            <Image
                                                source={item.picture}
                                                className="rounded-lg w-full h-full"
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <Text className="text-lg text-light-blue">{item.name}</Text>
                                        <Text className="text-lg text-light-blue">Ubicacion</Text>
                                    </View>
                                </Pressable>
                            </View>}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
            </ScrollView>

        </View>
    );
}