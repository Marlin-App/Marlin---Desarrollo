import * as React from 'react';
import { Text, View, Button, Item, FlatList, SafeAreaView, SectionList, Pressable, Image } from 'react-native';
import useStoreType from '../hooks/useStoreType';
import  image  from '../assets/img/fondoLanding.png';

export function StoreCat({ navigation }) {

    const{categories} = useStoreType();
   

    return (
        <View className="p-2 my-2 mt-0 bg-white">
            <Text className="ml-2 mt-2 text-2xl font-Excon_bold text-main-blue">Categorias</Text>
            <SafeAreaView>
                <SectionList className="flex-1"
                    sections={categories}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => navigation.navigate('')}>
                                <View className="my-2 mx-2 items-center">
                                    <View className="bg-gray-200 p-5 rounded-lg w-20 h-20">
                                        <Image
                                            source={image}
                                            className="w-full h-12 rounded-lg"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text className="text-lg text-center text-light-blue">{item}</Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}