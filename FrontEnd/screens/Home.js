import * as React from "react";
import {
    Button,
    Text,
    TextInput,
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useEffect, useCallback } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCart from "../hooks/useCart";

export function HomeScreen({ navigation }) {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addToCart,
        total,
    } = useCart();

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

    const verticalData = [
        {
            id: "1",
            title: "Categorias",
            type: "category",
            horizontalData: [
                {
                    id: "1a",
                    title: "Cat 1",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1b",
                    title: "Cat 2",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1c",
                    title: "Cat 3",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
                {
                    id: "1d",
                    title: "Cat 4",
                    image: require("../../FrontEnd/assets/img/fondoLanding.png"),
                },
            ],
        },
        {
            id: "2",
            title: "Productos para ti",
            type: "product",
            horizontalData: [
                {
                    id: "2a",
                    title: "Producto 1",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2b",
                    title: "Producto 2",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2c",
                    title: "Producto 3",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2d",
                    title: "Producto 4",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2e",
                    title: "Producto 5",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2f",
                    title: "Producto 6",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2g",
                    title: "Producto 7",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2h",
                    title: "Producto 8",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2i",
                    title: "Producto 9",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2j",
                    title: "Producto 10",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2k",
                    title: "Producto 11",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "2l",
                    title: "Producto 12",
                    subtitle: "$0",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
            ],
        },
        {
            id: "3",
            title: "Tiendas destacadas",
            type: "store",
            horizontalData: [
                {
                    id: "3a",
                    title: "Tienda 1",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "3b",
                    title: "Tienda 2",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
                {
                    id: "3c",
                    title: "Tienda 3",
                    image: require("../../FrontEnd/assets/img/marlin.png"),
                },
            ],
        },
    ];

    const renderHorizontalItem = ({ item }) => (
        <TouchableOpacity
            to={{ screen: "Item" }}
            onPress={() => navigation.navigate("Item")}
        >
            <View className="my-2 mx-2 items-start">
                <View className="bg-cyan-600 rounded-lg w-40 h-40 p-1">
                    <Image
                        source={item.image}
                        className="w-full h-full rounded-lg"
                        resizeMode="stretch"
                    />
                </View>
                <Text className="text-lg font-bold text-left text-light-blue">
                    {item.title}
                </Text>
                <Text className="text-sm text-left text-light-blue font-thin">
                    {item.subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderHorizontalC = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('StoreCat')}>
            <View className="my-2 mx-2 items-center">
                <View className="bg-gray-200 p-5 rounded-lg w-20 h-20">
                    <Image
                        source={item.image}
                        className="w-full h-12 rounded-lg"
                        resizeMode="cover"
                        />
                </View>
                <Text className="text-lg text-center text-light-blue">{item.title}</Text>
                <Text className="text-sm text-center text-light-blue">{item.subtitle}</Text>
            </View>
        </Pressable>
    );

    const renderVerticalItem = ({ item }) => {
        if (item.id === "2") {
            const firstHalf = item.horizontalData.slice(
                0,
                Math.ceil(item.horizontalData.length / 2)
            );
            const secondHalf = item.horizontalData.slice(
                Math.ceil(item.horizontalData.length / 2)
            );

            return (
                <View className="p-2 my-2" onLayout={onLayout}>
                    <Text className="ml-2 mt-2 text-2xl font-Excon_bold text-main-blue">
                        {item.title}
                    </Text>
                    <FlatList
                        data={firstHalf}
                        renderItem={renderHorizontalItem}
                        keyExtractor={(horizontalItem) => horizontalItem.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <FlatList
                        data={secondHalf}
                        renderItem={renderHorizontalItem}
                        keyExtractor={(horizontalItem) => horizontalItem.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            );
        }

        return (
            <View className="p-2 my-2 mt-0 bg-white" onLayout={onLayout}>
                <Text className="ml-2 mt-2 text-2xl font-Excon_bold text-main-blue">
                    {item.title}
                </Text>
                <FlatList
                    data={item.horizontalData}
                    renderItem={
                        item.type === "category" ? renderHorizontalC : renderHorizontalItem
                    }
                    keyExtractor={(horizontalItem) => horizontalItem.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <View className="w-full flex-col pl-8 pr-8 bg-main-blue py-12">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-Excon_regular">
                            Carr. Interamericana Norte
                        </Text>
                        <AntDesign name="down" size={18} color="white" />
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 ">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={() => navigation.navigate("Cart")}>
                                <Feather name="shopping-bag" size={24} color="white" />
                            </Pressable>
                            <Text
                                className={`absolute left-4 w-3 h-3 rounded-full mb-5 text-white ${cart.length > 1 ? "bg-red-600" : ""
                                    }`}
                            >
                                {" "}
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
            <ScrollView>
                <FlatList
                    data={verticalData}
                    renderItem={renderVerticalItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            </ScrollView>
        </View>
    );
}
