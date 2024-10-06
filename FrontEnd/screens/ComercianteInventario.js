import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";



export function ComercianteInventario({ navigation }) {
    return (
        <ScrollView className="bg-white">
            <View className="w-full flex-col px-4 bg-main-blue py-8 pt-16">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw]">
                            ¡Rellená tu inventario con más mercadería!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>
                </View>
            </View>
            <Text className="text-2xl font-Excon_bold mt-4 ml-4">Tus tiendas</Text>
            <View className="flex-col p-4">
                <Text className="text-lg text-main-blue font-Excon_bold">The Fresh Market</Text>
                <Text className="text-md font-Excon_thin text-main-blue">Puntarenas, El roble</Text>
                <View className="flex-col">
                    <View className="items-end mb-4">
                        <Pressable className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center" onPress={""}>
                            <Ionicons name="add" size={24} color="#015DEC" />
                        </Pressable>
                    </View>
                    <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 h-[30vh]">
                        <ScrollView className="h-[40vh]">
                            <View>
                            <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido")}>
                                {/* Foto con imnformacion */}
                                <View className="flex-row justify-between m-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">
                                    {/* Contenedor de la imagen y la información del producto */}
                                    <View className="flex-row w-[95%] max-w-full">
                                        {/* Imagen del producto */}
                                        <View className="justify-center items-center bg-red-600 rounded-lg">
                                            <Image
                                                source={require('../assets/img/marlin.png')}
                                                style={{ width: 100, height: 100, resizeMode: "contain" }}
                                            />
                                        </View>

                                        {/* Información del producto */}
                                        <View className="px-6 flex-shrink">
                                            <Text className="font-Excon_bold text-sm">Titulo del producto</Text>
                                            <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                Este es un producto de la mejor calidad y alta resistencia a golpes
                                            </Text>
                                            <View className="justify-between flex-row">
                                                <Text className="font-Excon_thin text-sm">₡12 000</Text>
                                                <Text className="font-Excon_bold text-sm">Inventario: <Text className="font-Excon_thin text-sm">30</Text></Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* 3 Puntos (opciones adicionales) */}
                                    <View className="flex-col gap-y-1 h-full items-center">
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                    </View>
                                </View>
                            </Pressable>
                            </View>

                            <View>
                            <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido")}>
                                {/* Foto con imnformacion */}
                                <View className="flex-row justify-between m-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">
                                    {/* Contenedor de la imagen y la información del producto */}
                                    <View className="flex-row w-[95%] max-w-full">
                                        {/* Imagen del producto */}
                                        <View className="justify-center items-center bg-red-600 rounded-lg">
                                            <Image
                                                source={require('../assets/img/marlin.png')}
                                                style={{ width: 100, height: 100, resizeMode: "contain" }}
                                            />
                                        </View>

                                        {/* Información del producto */}
                                        <View className="px-6 flex-shrink">
                                            <Text className="font-Excon_bold text-sm">Titulo del producto</Text>
                                            <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                Este es un producto de la mejor calidad y alta resistencia a golpes
                                            </Text>
                                            <View className="justify-between flex-row">
                                                <Text className="font-Excon_thin text-sm">₡12 000</Text>
                                                <Text className="font-Excon_bold text-sm">Inventario: <Text className="font-Excon_thin text-sm">30</Text></Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* 3 Puntos (opciones adicionales) */}
                                    <View className="flex-col gap-y-1 h-full items-center">
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                    </View>
                                </View>
                            </Pressable>
                            </View>

                            
                            
                        </ScrollView>
                    </View>
                </View>
            </View>

            <View className="flex-col p-4 mb-5">
                <Text className="text-lg text-main-blue font-Excon_bold">The Fresh Market</Text>
                <Text className="text-md font-Excon_thin text-main-blue">Puntarenas, El roble</Text>
                <View className="flex-col">
                    <View className="items-end mb-4">
                        <Pressable className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center" onPress={""}>
                            <Ionicons name="add" size={24} color="#015DEC" />
                        </Pressable>
                    </View>
                    <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 h-[30vh]">
                        <ScrollView className="h-[40vh]">
                            <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido")}>
                                {/* Foto con imnformacion */}
                                <View className="flex-row justify-between m-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md">
                                    {/* Contenedor de la imagen y la información del producto */}
                                    <View className="flex-row w-[95%] max-w-full">
                                        {/* Imagen del producto */}
                                        <View className="justify-center items-center bg-red-600 rounded-lg">
                                            <Image
                                                source={require('../assets/img/marlin.png')}
                                                style={{ width: 100, height: 100, resizeMode: "contain" }}
                                            />
                                        </View>

                                        {/* Información del producto */}
                                        <View className="px-6 flex-shrink">
                                            <Text className="font-Excon_bold text-sm">Titulo del producto</Text>
                                            <Text className="font-Excon_thin text-sm" numberOfLines={3}>
                                                Este es un producto de la mejor calidad y alta resistencia a golpes
                                            </Text>
                                            <View className="justify-between flex-row">
                                                <Text className="font-Excon_thin text-sm">₡12 000</Text>
                                                <Text className="font-Excon_bold text-sm">Inventario: <Text className="font-Excon_thin text-sm">30</Text></Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* 3 Puntos (opciones adicionales) */}
                                    <View className="flex-col gap-y-1 h-full items-center">
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                    </View>
                                </View>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </View>

        </ScrollView>
    );
}