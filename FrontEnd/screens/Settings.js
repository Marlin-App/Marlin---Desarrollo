
import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';



export function ProfileScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} className="px-8">
      <Text className="font-Excon_bold bottom-4 text-2xl">Configuración de Usuario</Text>
      <View className="flex flex-row justify-center items-center">
        <View className="flex justify-center items-center bg-[#C4C4C4] w-28 h-28 rounded-full">
          <Text>Profile image</Text>
        </View>
        <View className="ml-6">
          <Text className="text-lg text-gray-600">Jeremy Guzman Vargas</Text>
          <Text className="text-sm text-gray-600">jeremyGD997@gmail.com</Text>
        </View>
      </View>



      <View className="w-full mt-4">
        <Text className="text-lg font-bold mb-4">Perfil</Text>

        <Pressable className="flex-row justify-between  border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Feather name="user" size={24} color="#015DEC" />
            <Text className="text-center">Información</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Feather name="map-pin" size={24} color="#015DEC" />
            <Text className="text-center">Direcciones</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <MaterialIcons name="payment" size={24} color="#015DEC" />
            <Text className="text-center">Metodos de pago</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <MaterialIcons name="history" size={24} color="#015DEC" />
            <Text className="text-center">Historial de compras</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

      </View>

      <View className="w-full mt-6">
        <Text className="text-lg font-bold mb-4">Configuracion</Text>

        <Pressable className=" flex-row justify-between  border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Entypo name="language" size={24} color="#015DEC" />
            <Text className="text-center">idioma</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
            <Ionicons name="color-palette-outline" size={24} color="#015DEC" />
            <Text className="text-center">Tema de la aplicación </Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>

        <Pressable className=" flex-row justify-between mt-5 border-b-2 border-light-blue">
          <View className="flex-row gap-2">
          <Ionicons name="notifications-outline" size={24} color="#015DEC" />
            <Text className="text-center">Notificaciones</Text>
          </View>
          <Text className="text-light-blue">{">"}</Text>
        </Pressable>
      </View>

      {/* <Button
        title="Login"
        onPress={() => navigation.navigate("Landing")}

      /> */}
    </View>
  );
}