
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Pressable  } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons'; // Usa feather como iconos




export function DirectionScreen({ navigation }) {

    const [selectedMethod, setSelectedMethod] = useState(null);

    const methods = [
      { id: 1, type: 'Casa', Direction: '2 metros del pali"' },
      { id: 2, type: 'Trabajo', Direction: 'Trabajo en casa, asi que 2 metros del pali'},
      { id: 3, type: 'Universidad', Direction: 'UCR de Nances'},
    ];

    useEffect(() => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: '#0038A2',
                      display: 'none',
                      height: 80,
                      justifyContent: 'center',
                      paddingBottom: 10,
        }
  
      });
  
      return () => {
  
        navigation.getParent().setOptions({
          tabBarStyle: {
            backgroundColor: '#015DEC',
            display: 'flex',
            height: 80,
            justifyContent: 'center',
            paddingBottom: 10,
          }
  
        });
      }
  
  
    }, []);
  

    return (
        <View className="flex-1 bg-white p-4">
          
    
          <Text className="text-xl font-bold mb-6 text-center">Mis Direcciones</Text>
          <ScrollView className="space-y-4">
            {methods.map((method) => (
            <Pressable
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
              </Pressable>
            ))}
          </ScrollView>
    
          <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg flex-row items-center justify-center">
            <MaterialCommunityIcons name="map-marker-plus-outline" size={30} color="white" />
            <Text className="text-white font-bold ml-2">Agregar dirección</Text>
          </TouchableOpacity>
        </View>
      );
    };