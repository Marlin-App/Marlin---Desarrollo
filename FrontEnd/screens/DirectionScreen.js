
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons'; // Usa feather como iconos




export function DirectionScreen({ navigation }) {

  return (
    <View className="flex-1 bg-white py-4 px-8">
      <Text className="text-xl font-bold mb-6 text-center">Mis Direcciones</Text>
      <ScrollView className="space-y-4">
        <Pressable className="flex flex-row border-b-2 pb-2 justify-between border-light-blue">
          <View className="flex-row">
            <Feather name="map-pin" size={24} color="#015DEC" />
            <View className="ml-4">
              <Text className="font-Erode_regular">Direcciones</Text>
              <Text className="font-Erode_regular">Direcciones unu</Text>
            </View>
          </View>
          <Feather name="check" size={24} color="#015DEC" />
        </Pressable>
        <Pressable className="flex flex-row border-b-2 pb-2 border-light-blue">
          <Feather name="map-pin" size={24} color="#015DEC" />
          <View className="ml-4">
            <Text className="font-Erode_regular">Direcciones</Text>
            <Text className="font-Erode_regular">Direcciones unu</Text>
          </View>
        </Pressable>
        <Pressable className="flex flex-row border-b-2 pb-2 border-light-blue">
          <Feather name="map-pin" size={24} color="#015DEC" />
          <View className="ml-4">
            <Text className="font-Erode_regular">Direcciones</Text>
            <Text className="font-Erode_regular">Direcciones unu</Text>
          </View>
        </Pressable>
      </ScrollView>

      <TouchableOpacity className="bg-main-blue p-4 mt-6 rounded-lg flex-row items-center justify-center">
        <MaterialCommunityIcons name="map-marker-plus-outline" size={30} color="white" />
        <Text className="text-white font-bold ml-2">Agregar dirección</Text>
      </TouchableOpacity>
    </View>
  );
};