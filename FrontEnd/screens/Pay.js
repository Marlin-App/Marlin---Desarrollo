import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import useCart from '../hooks/useCart';

export function PayScreen({ navigation }) {

    const { clearCart, total } = useCart();

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentReceipt, setPaymentReceipt] = useState(null);

    const methods = [
      { id: 1, type: 'SinpeMovil' },
      { id: 2, type: 'PayPal' },
    ];

    const storeName = "Nombre de la tienda"; 
    const sinpeNumber = "8888-8888";

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(7).toUpperCase();
    };

    const handleFinalize = () => {
        if (selectedMethod === null) {
            Alert.alert('Selecciona un método de pago', 'Por favor, selecciona un método de pago antes de finalizar.');
            return;
        }
        clearCart();
        navigation.navigate('Home');
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
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold mb-6 text-center">Métodos de pago</Text>
            <ScrollView className="space-y-4">
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        onPress={() => setSelectedMethod(method.id)}
                        className={`flex-row items-center justify-between p-4 border rounded-lg ${
                            selectedMethod === method.id ? 'border-main-blue' : 'border-gray-300'
                        }`}
                    >
                        <View className="flex-row items-center">
                            <View
                                className={`w-4 h-4 mr-4 rounded-full border justify-center items-center ${
                                    selectedMethod === method.id ? 'bg-main-blue border-0' : 'border-gray-300'
                                }`}
                            >
                                {selectedMethod === method.id && (
                                    <View className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </View>

                            <View className="flex-row items-center gap-2">
                                {method.type === 'SinpeMovil' ? (
                                    <Feather name="phone-call" size={24} color="#25D366" className="mr-2" />
                                ) : (
                                    <FontAwesome5 name="paypal" size={24} color="#003087" className="mr-2" />
                                )}
                                <Text className="font-Erode_regular text-gray-800 text-lg">
                                    {method.type === 'SinpeMovil' ? 'Sinpe Móvil' : 'PayPal'}
                                </Text>
                            </View>
                        </View>

                        <Feather name="check-circle" size={24} color={selectedMethod === method.id ? '#015DEC' : 'gray'} />
                    </TouchableOpacity>
                ))}

                {selectedMethod === 1 && (
                    <View className="p-4 mt-4 border rounded-lg border-gray-300">
                        <Text className="font-Erode_regular text-gray-800 text-lg">Nombre: {storeName}</Text>
                        <Text className="font-Erode_regular text-gray-800 text-lg">Número: {sinpeNumber}</Text>
                        <Text className="font-Erode_regular text-gray-800 text-lg">Detalle de compra: {generateRandomCode()}</Text>
                        <Text className="font-Erode_regular text-gray-800 text-lg">Total a pagar: {total}</Text>
                    </View>
                )}

                {selectedMethod === 1 && (
                    <View className="mt-4 p-4 border rounded-lg border-gray-300">
                        <Text className="font-Erode_regular text-gray-800 text-lg">Cargar el comprobante de pago:</Text>
                        <TouchableOpacity onPress={pickImage} className="bg-main-blue p-2 mt-2 rounded-lg">
                            <Text className="text-white text-center">Seleccionar imagen</Text>
                        </TouchableOpacity>
                        {paymentReceipt && (
                            <Image source={{ uri: paymentReceipt }} style={{ width: 100, height: 100, marginTop: 10 }} />
                        )}
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
};
