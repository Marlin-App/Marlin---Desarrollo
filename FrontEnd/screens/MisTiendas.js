import { Text, View, Pressable, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from 'react';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useCRUDTiendas from '../hooks/useCRUDTiendas';

export function MisTiendas({ navigation }) {
    const { allStores, loading, getUserStores, setAllStores } = useCRUDTiendas();

    useEffect(() => {
        const fetchStores = async () => {
            await getUserStores(1);
           /*  console.log(allStores) */
        };
        fetchStores();
    }, [navigation]);
    

   /*  useEffect(() => {
        console.log(allStores);
    }, [allStores]); */


    const renderStoreItem = ({ item }) => (
        <Pressable className="flex-row justify-center px-4 mb-5" 
          onPress={() => navigation.navigate("NuevaTienda", { store: item })}
        >
            <View className="flex-col w-full">
                <Image className="rounded-xl  h-[150] " source={{uri: item.picture }} style={{ resizeMode: "stretch" }} />
                <Text className="text-black text-lg font-Excon_bold">{item.name}</Text>
                <Text className="text-black text-md font-Excon_thin">{item.location}</Text> 
            </View>
        </Pressable>
    );

    return (
        <View className="flex-1 bg-white">
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Aquí inicia el camino al emprendimiento!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>
                </View>
            </View>

            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4">Tus tiendas</Text>

            <FlatList
                data={allStores}
                renderItem={renderStoreItem}
                keyExtractor={(item) => item.id} 
                contentContainerStyle={{ padding: 4, backgroundColor: 'white', marginTop: 4 }}
            />

            <TouchableOpacity className="bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2" onPress={() => navigation.navigate("NuevaTienda")}>
                <MaterialIcons name="store-mall-directory" size={30} color="white" />
                <Text className="text-white font-Excon_bold text-lg ml-2">Agregar nueva tienda</Text>
            </TouchableOpacity>
        </View>
    );
}
