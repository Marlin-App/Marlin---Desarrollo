import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useCart from "../hooks/useCart";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import useGetUser from "../hooks/useGetUser";

export function PayScreen({ navigation }) {
    const route = useRoute();
    const { totales } = route.params;
    const { addToCart, isSameStore, cart } = useCart();
    const { fetchData, user, token } = useGetUser();
    const [randomCode, setRandomCode] = useState();
    const [loading, setLoading] = useState(false);

    const [infoStore, setInfoStore] = useState(null);

    // funcion que obtiene la tienda
    useEffect(() => {
        async function prepare() {
            response = await fetch(
                `https://marlin-backend.vercel.app/api/stores/${route.params.idTienda}/`
            ).then((response) => response.json());
            setInfoStore({
                sinpeNumber: response.num_sinpe,
                storeName: response.name,
            });

            await fetchData();
            setRandomCode(generateRandomCode());
        }
        prepare();
    }, []);
    // ------------------------------------------------------------------------

    const { colorScheme } = useColorScheme();
    const { clearCart, total } = useCart();

    // carga de fuentes
    const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });
    // ------------------------------------------------------------------------

    // pantalla de carga
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

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentReceipt, setPaymentReceipt] = useState(null);

    // metodos de pago
    const methods = [
        { id: 1, type: "SinpeMovil" },
        { id: 2, type: "PayPal" },
    ];
    // ------------------------------------------------------------------------

    // Función para formatear el precio
    const formatCurrency = (value) => {
        return value.toLocaleString("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0,
        });
    };
    // ------------------------------------------------------------------------

    // Función para generar un código aleatorio
    const generateRandomCode = () => {
        return Math.random().toString(36).substring(7).toUpperCase();
    };
    // ------------------------------------------------------------------------

    // Función para realizar el pedido
    const postOrder = async () => {
        setLoading(true);
        // crea el pedido
        const order = {
            products: cart.map((product) => ({
                item_id: product.id,
                quantity: product.cantidad,
            })),
            store_id: route.params.idTienda,
            order_num: randomCode,
            status: "Pendiente",
            direction: !route.params.direction
                ? "Recoger en el lugar"
                : `canton: ${route.params.direction.canton}, distrito: ${route.params.direction.district}, coordenadas: ${route.params.direction.coodernates.latitude}, ${route.params.direction.coodernates.longitude}, referencias: ${route.params.direction.referencias}`,
            user_id: user.user_id,
            delivery_distance:'1', //cambiar por el valor de la distancia
            user_coordinates: !route.params.direction
            ? "Recoger en el lugar": `${route.params.direction.coodernates.latitude},${route.params.direction.coodernates.longitude}`,
            references:  !route.params.direction
            ? "Recoger en el lugar": `${route.params.direction.referencias}`,
        };
  
        try {
           
            const response = await fetch("https://marlin-backend.vercel.app/api/orders/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error ${response.status}: ${errorText}`);
                setLoading(false);
                return;
            }
    
           
            const createdOrder = await response.json();
            const orderId = createdOrder.id;  
    
          
            if (paymentReceipt) {
                const formData = new FormData();
                const uriParts = paymentReceipt.split(".");
                const fileType = uriParts[uriParts.length - 1];
                formData.append("voucher", {
                    uri: paymentReceipt,
                    name: `voucher.${fileType}`,
                    type: `image/${fileType}`,
                });
    
                const patchResponse = await fetch(`https://marlin-backend.vercel.app/api/orders/${orderId}/`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
    
                if (!patchResponse.ok) {
                    const errorText = await patchResponse.text();
                    console.error(`Error ${patchResponse.status}: ${errorText}`);
                    setLoading(false);
                    return;
                }
            }
    
            setLoading(false);
            Alert.alert(
                "Compra Exitosa",
                "La compra se ha realizado con éxito.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            clearCart();
                            navigation.navigate("Home");
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Network or other error:", error);
            setLoading(false);
        }
    };
    // ------------------------------------------------------------------------

    // Función para finalizar el pedido
    const handleFinalize = () => {
        if (selectedMethod === null) {
            Alert.alert(
                "Selecciona un método de pago",
                "Por favor, selecciona un método de pago antes de finalizar."
            );
            return;
        }
        postOrder();
    };
    // ------------------------------------------------------------------------

    // Función para seleccionar la imagen
    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permiso de acceso a la galería requerido");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            setPaymentReceipt(result.assets[0].uri);
        }
    };
    // ------------------------------------------------------------------------

    return (
        <View
            className="flex-1 bg-white dark:bg-neutral-950 p-4"
            onLayout={onLayoutRootView}
        >
            {loading ? (
                <View className={`w-full h-full justify-center items-center absolute z-10  `}>
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            ) : null}
            <Text className="text-2xl mb-6 text-center font-Excon_bold text-main-blue dark:text-white">
                Métodos de pago
            </Text>
            <ScrollView className="space-y-4">
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        onPress={() => setSelectedMethod(method.id)}
                        className={`flex-row items-center justify-between p-4 border rounded-lg ${selectedMethod === method.id
                            ? "border-main-blue dark:border-light-blue"
                            : "border-gray-300 dark:border-white"
                            }`}
                    >
                        <View className="flex-row items-center">
                            <View
                                className={`w-4 h-4 mr-4 rounded-full border justify-center items-center ${selectedMethod === method.id
                                    ? "bg-main-blue border-0 dark:bg-light-blue"
                                    : "border-gray-300 dark:border-white"
                                    }`}
                            >
                                {selectedMethod === method.id && (
                                    <View className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </View>

                            <View className="flex-row items-center gap-2">
                                {method.type === "SinpeMovil" ? (
                                    <MaterialCommunityIcons
                                        name="cellphone-wireless"
                                        size={24}
                                        color="#25D366"
                                    />
                                ) : (
                                    <FontAwesome5
                                        name="paypal"
                                        size={24}
                                        color="#003087"
                                        className="mr-2"
                                    />
                                )}
                                <Text className="font-Erode_regular text-gray-800 dark:text-white text-lg">
                                    {method.type === "SinpeMovil" ? "Sinpe Móvil" : "PayPal"}
                                </Text>
                            </View>
                        </View>

                        <Feather
                            name="check-circle"
                            size={24}
                            color={selectedMethod === method.id ? "#015DEC" : "gray"}
                        />
                    </TouchableOpacity>
                ))}

                {selectedMethod === 1 && (
                    <View className="p-4 mt-4 border rounded-lg border-gray-300 dark:border-light-blue">
                        <Text className="font-Erode_bold text-gray-800 dark:text-white text-xl">
                            Nombre: {infoStore.storeName}
                        </Text>
                        <Text className="font-Erode_bold text-gray-800 dark:text-white text-xl">
                            Número: <Text className="font-Erode_regular text-lg">{infoStore.sinpeNumber}{" "}</Text>
                        </Text>
                        <Text className="font-Erode_bold text-gray-800 dark:text-white text-xl">
                            Detalle de compra: <Text className="font-Erode_regular text-lg">{generateRandomCode()}</Text>
                        </Text>
                        <Text className="font-Erode_bold text-gray-800 dark:text-white text-xl">
                            Total a pagar: <Text className="font-Erode_regular text-lg">{formatCurrency(totales)}</Text>
                        </Text>
                    </View>
                )}

                {selectedMethod === 1 && (
                    <View className="mt-4 p-4 border rounded-lg border-gray-300 dark:border-light-blue">
                        <Text className="font-Erode_regular text-gray-800 text-lg dark:text-white">
                            Cargar el comprobante de pago:
                        </Text>
                        <View className="justify-center items-center">
                            {paymentReceipt && (
                                <Image
                                    className="w-full h-[20vh] my-4 object-cover rounded-lg"
                                    source={{ uri: paymentReceipt }}
                                />
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={pickImage}
                            className="bg-main-blue p-2 mt-2 rounded-lg"
                        >
                            <Text className="text-white text-center">Seleccionar imagen</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity
                onPress={handleFinalize}
                className="bg-main-blue p-4 mt-6 rounded-lg flex-row items-center justify-center"
            >
                <MaterialIcons name="check-circle" size={30} color="white" />
                <Text className="text-white font-bold ml-2 text-lg">Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
}
