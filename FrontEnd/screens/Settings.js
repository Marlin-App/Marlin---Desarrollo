import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useIsFocused } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

const base64UrlDecode = (base64Url) => {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }
  return decodeURIComponent(escape(atob(base64)));
};

const decodeJWT = (token) => {
  const [header, payload, signature] = token.split('.');
  const decodedHeader = base64UrlDecode(header);
  const decodedPayload = base64UrlDecode(payload);

  const headerObj = JSON.parse(decodedHeader);
  const payloadObj = JSON.parse(decodedPayload);

  return {
    header: headerObj,
    payload: payloadObj,
    signature: signature 
  };
};

export function ProfileScreen({ navigation }) {
  
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@userToken');
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          const token = userData.access;
          if (token) {
            const decodedToken = decodeJWT(token); 
            setUser(decodedToken.payload); 
            console.log('Token de usuario cargado:', decodedToken.payload);
          } else {
            console.log('No se encontró el token en el objeto.');
          }
        } else {
          console.log('No se encontró ningún token de usuario.');
          navigation.navigate('Landing');
        }
      } catch (e) {
        console.error('Error al cargar el token de usuario:', e);
      }
    };

    loadUser();
  }, [isFocused, navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@userToken');
      navigation.navigate('Landing'); 
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
    }
  };

  return (
    <ScrollView className="py-8 bg-white">
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} className="px-8 bg-white">
      <Text className="font-Excon_bold bottom-4 text-2xl">Configuración de Usuario</Text>
      <View className="flex flex-row justify-center items-center">
        <View className="flex justify-center items-center bg-[#C4C4C4] w-28 h-28 rounded-full">
          <Text>Profile image</Text>
        </View>
        <View className="ml-6">
          <Text className="text-lg text-gray-600 font-Erode_medium">{user.username} </Text>
          <Text className="text-sm text-gray-600 font-Erode_regular">{user.email} </Text>
        </View>
      </View>

      <View className="w-full mt-4">
        <Text className="text-lg font-Excon_bold mb-4">Perfil</Text>

        <Pressable className="flex-row justify-between border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Feather name="user" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Información</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue" onPress={() => navigation.navigate("DirectionScreen")}>
          <View className="flex-row gap-2">
            <Feather name="map-pin" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Direcciones</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue" onPress={() => navigation.navigate("CardScreen")}>
          <View className="flex-row gap-2">
            <MaterialIcons name="payment" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Metodos de pago</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <MaterialIcons name="history" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Historial de compras</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

      </View>

      <View className="w-full mt-6">
        <Text className="text-lg font-Excon_bold mb-4">Ajustes de la aplicación</Text>

        <Pressable className=" flex-row justify-between  border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Entypo name="language" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">idioma</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Ionicons name="color-palette-outline" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Tema de la aplicación </Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
          <Ionicons name="notifications-outline" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular">Notificaciones</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>
      </View>

      <View className='w-full mt-6'>
        <Pressable className='flex-row items-center py-4 flex gap-3'>
        <AntDesign name="questioncircleo" size={24} color="#015DEC" />
          <Text>FAQs</Text>
        </Pressable>

        <Pressable className='flex-row flex gap-3 items-center'
          onPress={handleLogout}
        >
        <MaterialIcons name="logout" size={24} color="#015DEC" />
          <Text className=''>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  );
}