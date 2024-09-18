
import React from "react";
import { View, Text, Button, Pressable, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';



export function ProfileScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Excon_regular': require('../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf'),
    'Excon_bold': require('../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf'),
    'Excon_thin': require('../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf'),
    'Erode_regular': require('../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf'),
    'Erode_medium': require('../../FrontEnd/assets/fonts/Erode/Erode-Medium.otf'),
    'Erode_bold': require('../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf')
});

useEffect(() => {
    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }
    prepare();
}, [])

const onLayout = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }
}, [fontsLoaded])

if (!fontsLoaded) return null;

  return (
    // <ScrollView className="">
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} className="px-8 bg-white">
      <Text className="font-Excon_bold bottom-4 text-2xl">Configuración de Usuario</Text>
      <View className="flex flex-row justify-center items-center">
        <View className="flex justify-center items-center bg-[#C4C4C4] w-28 h-28 rounded-full">
          <Text>Profile image</Text>
        </View>
        <View className="ml-6">
          <Text className="text-lg text-gray-600 font-Erode_medium">Jeremy Guzman Vargas</Text>
          <Text className="text-sm text-gray-600 font-Erode_regular">jeremyGD997@gmail.com</Text>
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

        <Pressable className='flex-row flex gap-3 items-center'>
        <MaterialIcons name="logout" size={24} color="#015DEC" />
          <Text className=''>Cerrar Sesión</Text>
        </Pressable>
      </View>

      {/* <Button
        title="Login"
        onPress={() => navigation.navigate("Landing")}

      /> */}
    </View>
    // </ScrollView>
  );
}