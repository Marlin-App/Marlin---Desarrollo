import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HomeScreen } from './screens/Home.js';
import { MainTabNavigator } from './navigation/MainTabNavigator';

export default function App() {
  return (
 <NavigationContainer>
          <MainTabNavigator />
  </NavigationContainer> 

 
   
 
  );
}