import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import useCart from '../hooks/useCart';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { useColorScheme } from "nativewind";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';

export function PayScreen({ navigation }) {

    const route = useRoute(); 
    const { totales } = route.params;

    const { colorScheme } = useColorScheme();

    const { clearCart, total } = useCart();

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

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentReceipt, setPaymentReceipt] = useState(null);

    const methods = [
        { id: 1, type: 'SinpeMovil' },
        { id: 2, type: 'PayPal' },
    ];

    const formatCurrency = (value) => {
        return value.toLocaleString('es-CR', {
            style: 'currency',
            currency: 'CRC',
            maximumFractionDigits: 0
        });
    };

    const deliveryFee = 250;
    const transportFee = 750;

    const storeName = "Nombre de la tienda";
    const sinpeNumber = "8888-8888";

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(7).toUpperCase();
    };

    const handleFinalize = () => {
        if (selectedMethod === null) {
            Alert.alert(
                'Selecciona un método de pago',
                'Por favor, selecciona un método de pago antes de finalizar.'
            );
            return;
        }

        Alert.alert(
            'Compra Exitosa',
            'La compra se ha realizado con éxito.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        clearCart(); 
                        navigation.navigate('Home'); 
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permiso de acceso a la galería requerido');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            setPaymentReceipt(result.assets[0].uri);
        }
    };

    return (
        <View 
            className="flex-1 bg-white dark:bg-neutral-950 p-4" 
            onLayout={onLayoutRootView}
        >
            <Text 
                className="text-2xl mb-6 text-center font-Excon_bold text-main-blue dark:text-white"
            >
                Métodos de pago
            </Text>
            <ScrollView className="space-y-4">
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        onPress={() => setSelectedMethod(method.id)}
                        className={`flex-row items-center justify-between p-4 border rounded-lg ${
                            selectedMethod === method.id 
                                ? 'border-main-blue dark:border-light-blue' 
                                : 'border-gray-300 dark:border-white'
                        }`}
                    >
                        <View className="flex-row items-center">
                            <View
                                className={`w-4 h-4 mr-4 rounded-full border justify-center items-center ${
                                    selectedMethod === method.id 
                                        ? 'bg-main-blue border-0 dark:bg-light-blue' 
                                        : 'border-gray-300 dark:border-white'
                                }`}
                            >
                                {selectedMethod === method.id && (
                                    <View className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </View>

                            <View className="flex-row items-center gap-2">
                                {method.type === 'SinpeMovil' ? (
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
                                <Text 
                                    className="font-Erode_regular text-gray-800 dark:text-white text-lg"
                                >
                                    {method.type === 'SinpeMovil' ? 'Sinpe Móvil' : 'PayPal'}
                                </Text>
                            </View>
                        </View>

                        <Feather 
                            name="check-circle" 
                            size={24} 
                            color={selectedMethod === method.id ? '#015DEC' : 'gray'} 
                        />
                    </TouchableOpacity>
                ))}

                {selectedMethod === 1 && (
                    <View 
                        className="p-4 mt-4 border rounded-lg border-gray-300 dark:border-light-blue"
                    >
                        <Text 
                            className="font-Erode_regular text-gray-800 dark:text-white text-lg"
                        >
                            Nombre: {storeName}
                        </Text>
                        <Text 
                            className="font-Erode_regular text-gray-800 dark:text-white text-lg"
                        >
                            Número: {sinpeNumber}
                        </Text>
                        <Text 
                            className="font-Erode_regular text-gray-800 dark:text-white text-lg"
                        >
                            Detalle de compra: {generateRandomCode()}
                        </Text>
                        <Text 
                            className="font-Erode_regular text-gray-800 dark:text-white text-lg"
                        >
                            Total a pagar: {formatCurrency((totales ))}
                        </Text>
                    </View>
                )}

                {selectedMethod === 1 && (
                    <View 
                        className="mt-4 p-4 border rounded-lg border-gray-300 dark:border-light-blue"
                    >
                        <Text 
                            className="font-Erode_regular text-gray-800 text-lg dark:text-white"
                        >
                            Cargar el comprobante de pago:
                        </Text>
                        <TouchableOpacity 
                            onPress={pickImage} 
                            className="bg-main-blue p-2 mt-2 rounded-lg"
                        >
                            <Text className="text-white text-center">Seleccionar imagen</Text>
                        </TouchableOpacity>
                        {paymentReceipt && (
                            <Image 
                                source={{ uri: paymentReceipt }} 
                                style={{ width: 100, height: 100, marginTop: 10 }} 
                            />
                        )}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity
                onPress={handleFinalize}
                className="bg-main-blue p-4 mt-6 rounded-lg flex-row items-center justify-center"
            >
                <MaterialIcons 
                    name="check-circle" 
                    size={30} 
                    color="white" 
                />
                <Text className="text-white font-bold ml-2 text-lg">Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
};
