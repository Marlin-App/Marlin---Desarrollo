
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView  } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons'; // Usa feather como iconos
{/* import { PaymentIcon } from 'react-native-payment-icons'
npm install react-native-payment-icons utilizar los iconos de visa y mastercard
<PaymentIcon type='visa'/>
<PaymentIcon type='master'/> */}



export function CardScreen({ navigation }) {

    const [selectedMethod, setSelectedMethod] = useState(null);

    const methods = [
      { id: 1, type: 'Visa', cardNumber: '****5584', expiry: '12/24' },
      { id: 2, type: 'Mastercard', cardNumber: '****5194', expiry: '12/24' },
      { id: 3, type: 'SinpeMovil' },
    ];

    return (
        <View className="flex-1 bg-white p-4">
          <TouchableOpacity className="flex-row items-center mb-4">
            
          </TouchableOpacity>
    
          <Text className="text-xl font-bold mb-6 text-center">Métodos de pago</Text>
          <ScrollView className="space-y-4">
            {methods.map((method) => (
            <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                className={`flex-row items-center justify-between p-4 border rounded-lg ${
                    selectedMethod === method.id ? 'border-main-blue' : 'border-gray-300'
                }`}
                >
                <View className="flex-row justify-between items-center">
                
                  <View
                    className={`w-4 h-4 mr-4 rounded-full border justify-around ${
                        selectedMethod === method.id ? 'bg-blue-500 border-0' : 'border-gray-300'
                    }`}
                  />
                  <View className="flex-row justify-around px-4">
                    {method.type !== 'SinpeMovil' ? (
                        <View className="flex-row items-center px-4">
                        {method.type === 'Visa' ? (
                            <Feather name="credit-card" size={24} color="blue" />
                            // <PaymentIcon type='visa'/>
                        ) : (
                            <Feather name="credit-card" size={24} color="orange" />
                            // <PaymentIcon type='master'/>
                        )}
                      </View>
                    ) : (
                        <Text className="font-bold">SinpeMovil</Text>
                    )}
                    {method.cardNumber && (
                        <Text className="text-gray-500">
                        {method.cardNumber} {method.expiry}
                      </Text>
                      
                    )}
                  </View>
                </View>
                    <Feather name="more-vertical" className="absolute" size={24} color="gray" />
              </TouchableOpacity>
            ))}
          </ScrollView>
    
          <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg flex-row items-center justify-center">
            <MaterialIcons name="payment" size={30} color="white" />
            <Text className="text-white font-bold ml-2">Agregar método de pago</Text>
          </TouchableOpacity>
        </View>
      );
    };