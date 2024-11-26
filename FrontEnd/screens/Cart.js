import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable, FlatList, Image, Alert, Switch, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useCart from "../hooks/useCart";
import { useColorScheme } from "nativewind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useDirections from "../hooks/useDirection";
import { useTransportFee } from "../hooks/useTransportFee";
import useStoreCordenates from "../hooks/useStoreCoordenates";

export function CartScreen({ navigation }) {

    const { getStoreCordenates, storeLatitude, storeLongitude } = useStoreCordenates();
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        total: cartTotal,
    } = useCart();
    const { direction, reLoadDirections } = useDirections(navigation);
    const directionSelected = direction.find((item) => item.isSelected === true);

    // Recargar las direcciones
    useEffect(() => {
        const reload = async () => {
            await reLoadDirections();
        };
        const focusListener = navigation.addListener("focus", reload);
    }, [navigation]);
    // ------------------------------------------------------------------------

    const { colorScheme } = useColorScheme();

    // carga de fuentes
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

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    // ------------------------------------------------------------------------

    const [distance, setDistance] = useState(null);
    const [transportFee, setTransportFee] = useState(0);

    // Calcular el costo de transporte
    useEffect(() => {
        const calculateDistanceAndRoute = async () => {
            const startCoords = { latitude: 9.984033, longitude: -84.717067 };
            const endCoords = { latitude: directionSelected.coodernates.latitude, longitude: directionSelected.coodernates.longitude };

            const result = await useTransportFee(startCoords, endCoords);
            if (result) {
                if (result.distanceValue < 1000) {
                    setTransportFee(700);
                } else if (result.distanceValue < 5000) {
                    setTransportFee(1500);
                } else {
                    setTransportFee(2500);
                }
                setDistance(result.distanceValue);
            }
        };

        calculateDistanceAndRoute();
    }, [directionSelected]);
    // ------------------------------------------------------------------------

    const deliveryFee = 250; //comision de la aplicacion
    const [isPickUp, setIsPickUp] = useState(false);
    const total = isPickUp ? cartTotal + deliveryFee : deliveryFee + transportFee + cartTotal;

    // Funcion para formatear el precio
    const formatCurrency = (value) => {
        return value.toLocaleString("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0,
        });
    };
    // ------------------------------------------------------------------------

    // Funcion para renderizar el item del carrito
    const CartItem = ({ item }) => {
        // Funcion para eliminar un producto
        const handleDelete = () => {
            Alert.alert(
                "Eliminar producto",
                `¿Estás seguro de que deseas eliminar ${item.name} del carrito?`,
                [
                    { text: "Cancelar" },
                    {
                        text: "Eliminar",
                        onPress: () => removeFromCart(item.id, item.color, item.size),
                    },
                ],
                { cancelable: false }
            );
        };
        // ------------------------------------------------------------------------

        const itemTotal = item.price * item.cantidad;

        return (
            <View className="mx-4 my-2 rounded-lg border-2 border-main-blue dark:border-light-blue p-2">
                <View className="items-end justify-end mt-2">
                    <Pressable onPress={handleDelete}>
                        <MaterialIcons
                            name="delete-outline"
                            size={20}
                            color={colorScheme === "dark" ? "#BB2626" : "#DB2B2B"}
                        />
                    </Pressable>
                </View>

                <View className="flex-row">
                    <View className="rounded-lg shadow-lg p-[2px] dark:bg-neutral-900">
                        {item.item_images && (
                            <Image
                                source={{ uri: item.item_images[0].picture }}
                                style={{ width: 90, height: 90 }}
                                className="w-full h-full rounded-lg"
                            />
                        )}
                    </View>
                    <View className="ml-2 flex-1">
                        <Text className="text-[16px] ml-2 font-Excon_regular dark:text-white">
                            {item.name}
                        </Text>
                        <View className="flex-row justify-between mt-4 flex-1 dark:text-white">
                            <View className="items-center">
                                <View className="rounded-md items-center justify-center dark:bg-light-blue">
                                    <Text className="font-Excon_bold text-[12px] text-black dark:text-[#171717]">
                                        Color
                                    </Text>
                                </View>
                                <Text className="mt-2 font-Excon_regular text-gray-600 ml-2 dark:text-[#d2d2d2]">
                                    {item.color ? item.color : "N/T"}
                                </Text>
                            </View>

                            <View className="items-center">
                                <View className="rounded-md items-center justify-center dark:bg-light-blue">
                                    <Text className="font-Excon_bold text-[12px] text-black dark:text-[#171717]">
                                        Talla
                                    </Text>
                                </View>
                                <Text className="mt-2 font-Excon_regular text-gray-600 ml-2 dark:text-[#d2d2d2]">
                                    {item.size ? item.size : "N/T"}
                                </Text>
                            </View>

                            <View className="items-center">
                                <View className="rounded-md h-6 w-20 bg-main-blue items-center flex-row dark:bg-light-blue">
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => {
                                            if (item.cantidad > 1) {
                                                decreaseQuantity(item.id);
                                            }
                                        }}
                                    >
                                        <Text className="text-white dark:text-[#171717]">-</Text>
                                    </Pressable>
                                    <Text className="font-Excon_bold text-[12px] text-white dark:text-[#171717]">
                                        {item.cantidad}
                                    </Text>
                                    <Pressable
                                        className="flex-1 items-center justify-center"
                                        onPress={() => increaseQuantity(item.id)}
                                    >
                                        <Text className="text-white dark:text-[#171717]">+</Text>
                                    </Pressable>
                                </View>
                                <Text className="mt-2 font-Excon_regular text-gray-600 dark:text-[#d2d2d2]">
                                    Cantidad
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="items-end justify-end mt-2">
                    <Text className="font-Excon_regular">
                        {formatCurrency(itemTotal)} CRC
                    </Text>
                </View>
            </View>
        );
    };
    // ------------------------------------------------------------------------

    return (
        <View
            className="flex-1 bg-white dark:bg-neutral-950"
            onLayout={onLayoutRootView}
        >
            <ScrollView className="flex-1 bg-white dark:bg-neutral-950">
                <Text className="text-2xl font-Excon_regular text-main-blue dark:text-[#ededed] mt-4 text-center">
                    Carrito
                </Text>

                {cart.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-[20px] font-Excon_regular text-main-blue dark:text-white">
                            No hay productos en el carrito
                        </Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cart}
                            renderItem={CartItem}
                            keyExtractor={(item) => `${item.id}-${item.color}-${item.size}`}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            scrollEnabled={false}
                        />

                        <View className="px-4 pt-2 rounded-lg mx-4 border-t-2 border-slate-200 dark:border-light-blue">
                            <Text className="text-[18px] font-Excon_regular text-main-blue mb-2 dark:text-white">
                                Datos de entrega
                            </Text>

                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="font-Excon_regular text-gray-800 dark:text-[#d2d2d2]">
                                    Recoger en el lugar
                                </Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isPickUp ? "#1952BE" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={setIsPickUp}
                                    value={isPickUp}
                                />
                            </View>

                            {!isPickUp && (
                                <>
                                    <View className="flex-row gap-x-[22px] items-center mb-4">
                                        <MaterialCommunityIcons name="map-marker-account-outline" size={24} color="black" />
                                        <View className="flex-1">
                                            <Text className="font-Excon_bold text-gray-800 text-[14px] dark:text-[#e1e1e1]">
                                                Ubicación de entrega
                                            </Text>
                                            <Text className="font-Excon_regular text-gray-800 text-[13px] dark:text-[#e1e1e1]">
                                                {directionSelected
                                                    ? directionSelected.name
                                                    : "Debe seleccionar una dirección"}
                                            </Text>
                                        </View>
                                        <Pressable
                                            onPress={() => navigation.navigate("DirectionScreen")}
                                        >
                                            <Text className="font-Excon_regular text-main-blue dark:text-light-blue">
                                                Selecionar
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <View className="flex-row gap-x-6 items-center">
                                        <MaterialCommunityIcons name="map-marker-question-outline" size={22} color="black" />
                                        <View className="flex-1">
                                            <Text className="font-Excon_bold text-gray-800 text-[14px] dark:text-[#e1e1e1]">
                                                Indicaciones para la entrega
                                            </Text>
                                            <Text className="font-Excon_regular text-gray-800 text-[13px] dark:text-[#e1e1e1]">
                                                {" "}
                                                {directionSelected
                                                    ? directionSelected.referencias
                                                    : "Debe seleccionar una dirección"}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        </View>

                        <View className="mt-6 p-4 bg-gray-100 dark:bg-dk-main-bg rounded-lg mx-4 mb-2">
                            <Text className="text-[18px] font-Excon_bold text-main-blue mb-4 dark:text-white">
                                Resumen
                            </Text>
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Excon_bold text-gray-800 dark:text-white">
                                    Precio de productos:
                                </Text>
                                <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">
                                    {formatCurrency(cartTotal)}
                                </Text>
                            </View>

                            <View className="flex-row justify-between mb-2">
                                <Text className="font-Excon_bold text-gray-800 dark:text-white">
                                    Tarifa de Servicio:
                                </Text>
                                <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">
                                    {formatCurrency(deliveryFee)}
                                </Text>
                            </View>

                            {!isPickUp && (
                                <>


                                    <View className="flex-row justify-between mb-2">
                                        <Text className="font-Excon_bold text-gray-800 dark:text-white">
                                            Tarifa de transporte:
                                        </Text>
                                        <Text className="font-Excon_regular text-gray-800 dark:text-[#d0d0d0]">
                                            {formatCurrency(transportFee)}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </>
                )}
            </ScrollView>

            {cart.length > 0 && (
                <View className="bg-main-blue p-4 dark:bg-dk-tab">
                    <View className="flex-row justify-between mb-4">
                        <Text className="font-Excon_bold text-[20px] text-white dark:text-light-blue">
                            Total a pagar:
                        </Text>
                        <Text className="font-Excon_regular text-[20px] text-white dark:text-light-blue">
                            {formatCurrency(total)}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            if (isPickUp || directionSelected) {
                                navigation.navigate("Pay", {
                                    totales: total,
                                    idTienda: cart[0].store_id,
                                    direction: isPickUp ? null : directionSelected,
                                });
                            } else {
                                Alert.alert(
                                    "Atención!",
                                    "Debe seleccionar una dirección de entrega"
                                );
                            }
                        }}
                        className="bg-white dark:bg-[#1952BE] p-4 rounded-md mb-2"
                        android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                    >
                        <Text className="text-main-blue font-Excon_regular text-[20px] text-center dark:text-white">
                            Pagar
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}