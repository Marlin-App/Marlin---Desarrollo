import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useIsFocused } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { styled, useColorScheme } from "nativewind";

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
  const { toggleColorScheme } = useColorScheme();
  const [isLogged, setIsLogged] = useState(true);
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
            setIsLogged(true);

          } else {
            console.log('No se encontró el token en el objeto.');
            setIsLogged(false);
          }
        } else {
          console.log('No se encontró ningún token de usuario.');
          setIsLogged(false);
        }
      } catch (e) {
        console.error('Error al cargar el token de usuario:', e);
        setIsLogged(false);
      }
    };

    loadUser();
  }, [isFocused, navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@userToken');
     setIsLogged(false);
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
    }
  };

  return (

    <View style={{ flex: 1, alignItems: "center",  }} className="px-8 bg-white dark:bg-black">


      {isLogged == false ? (
         <View className="w-full mt-14">
         <View className="flex  justify-center items-center">
         
          <View className="flex justify-center items-center bg-main-blue  p-4 rounded-3xl ">
            <Image
              source={require('../assets/img/marlin.png')}
              style={{ width: 100, height: 100,  resizeMode: 'contain' }}
            />

          </View>
        
  
         <Text className="font-Excon_bold text-center bottom-4 text-2xl text-main-blue dark:text-white mt-8">Bienvenido a Marlin</Text>
  
     </View>
     <View className="w-full mt-6">
     <Pressable className='flex-row flex gap-3 items-center mb-6'
         onPress={() => navigation.navigate('Landing')}
       >
         <MaterialIcons name="logout" size={24} color="#015DEC" />
         <Text className='dark:text-white'>iniciar Sesion / Registrarse</Text>
       </Pressable>
       <Text className="text-lg font-Excon_bold mb-4 dark:text-white">Ajustes de la aplicación</Text>


       <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue"
         onPress={() => toggleColorScheme()}
       >
         <View className="flex-row gap-2">
           <Ionicons name="color-palette-outline" size={24} color="#015DEC" />
           <Text className="text-center font-Erode_regular dark:text-white">Tema de la aplicación </Text>
         </View>
         <Text className="text-light-blue dark:text-white">{">"}</Text>
       </Pressable>

       <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
         <View className="flex-row gap-2">
           <Ionicons name="notifications-outline" size={24} color="#015DEC" />
           <Text className="text-center font-Erode_regular dark:text-white">Notificaciones</Text>
         </View>
         <Text className="text-light-blue dark:text-white">{">"}</Text>
       </Pressable>
     </View>

     <View className='w-full mt-6'>
       <Pressable className='flex-row items-center py-4 flex gap-3'>
         <AntDesign name="questioncircleo" size={24} color="#015DEC" />
         <Text className="dark:text-white" >FAQs</Text>
       </Pressable>

       
     </View>
       </View>
      ) : (

        <View className="w-full mt-14">
          <Text className="font-Excon_bold text-center bottom-4 text-2xl dark:text-white">Configuración de Usuario</Text>
          <View className="flex flex-row justify-center items-center">
        <View className="flex justify-center items-center  w-28 h-28 rounded-full">
          <Image
            source={{ uri: `https://ui-avatars.com/api/?name=${user.username}&background=random` }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </View>
        <View className="ml-6">
          <Text className="text-lg dark:text-white font-Erode_regular  ">{user.username} </Text>
          <Text className="text-sm dark:text-white  font-Erode_regular">{user.email} </Text>
        </View>
      </View>
      <View className="w-full mt-4">
        <Text className="text-lg font-Excon_bold mb-4 dark:text-white ">Perfil</Text>

        <Pressable className="flex-row justify-between border-b-2 border-light-blue"
          onPress={() => navigation.navigate("InformationScreen")}
        >
          <View className="flex-row gap-2">
            <Feather name="user" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Información</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue" onPress={() => navigation.navigate("DirectionScreen")}>
          <View className="flex-row gap-2">
            <Feather name="map-pin" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Direcciones</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue" onPress={() => navigation.navigate("CardScreen")}>
          <View className="flex-row gap-2">
            <MaterialIcons name="payment" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Metodos de pago</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <MaterialIcons name="history" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Historial de compras</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

      </View>

      <View className="w-full mt-6">
        <Text className="text-lg font-Excon_bold mb-4 dark:text-white">Ajustes de la aplicación</Text>

        <Pressable className=" flex-row justify-between  border-b-2 border-light-blue"
          onPress={() => navigation.replace("secondScreen")}
        >
          <View className="flex-row gap-2">
            <Entypo name="language" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Convertirte en comerciante</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue"
          onPress={() => toggleColorScheme()}
        >
          <View className="flex-row gap-2">
            <Ionicons name="color-palette-outline" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Tema de la aplicación </Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Ionicons name="notifications-outline" size={24} color="#015DEC" />
            <Text className="text-center font-Erode_regular dark:text-white">Notificaciones</Text>
          </View>
          <Text className="text-light-blue dark:text-white">{">"}</Text>
        </Pressable>
      </View>

      <View className='w-full mt-6'>
        <Pressable className='flex-row items-center py-4 flex gap-3'>
          <AntDesign name="questioncircleo" size={24} color="#015DEC" />
          <Text className="dark:text-white" >FAQs</Text>
        </Pressable>

        <Pressable className='flex-row flex gap-3 items-center'
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#015DEC" />
          <Text className='dark:text-white'>Cerrar Sesión</Text>
        </Pressable>
      </View>
        </View>
      ) 
  
      }

     
    </View>

  );
}