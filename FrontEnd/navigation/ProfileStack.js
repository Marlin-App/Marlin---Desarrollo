import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from "nativewind";
import { ComercianteTabNavigator } from './ComercianteTabNavigator';
import { ComerciantePedidoScreen } from '../screens/ComerciantePedidoScreen';
import { NuevaTienda } from '../screens/NuevaTienda';
import { NuevoProducto } from '../screens/NuevoProducto';
import { EditarProducto } from '../screens/EditarProducto';
import { AgregarProducto } from '../screens/AgregarProducto';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen({ navigation, route }) {
  const { colorScheme } = useColorScheme();


  return (
    <ProfileStack.Navigator>

      <ProfileStack.Screen
        name="Profile"
        component={ComercianteTabNavigator}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Pedido"
        component={ComerciantePedidoScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <ProfileStack.Screen
        name="NuevaTienda"
        component={NuevaTienda}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <ProfileStack.Screen
        name="NuevoProducto"
        component={NuevoProducto}
        options={{
          headerShown: false
        }}
      />

      <ProfileStack.Screen
        name="AgregarProducto"
        component={AgregarProducto}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <ProfileStack.Screen
        name="EditarProducto"
        component={EditarProducto}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

    </ProfileStack.Navigator>
  );
}