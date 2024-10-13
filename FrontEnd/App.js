import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HomeScreen } from './screens/Home.js';
import { MainTabNavigator } from './navigation/MainTabNavigator';
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStackScreen } from './navigation/HomeStack.js';

// Desactivar el splash screen automático de Expo
SplashScreen.preventAutoHideAsync();

/* NativeWindStyleSheet.setOutput({
  default: "native",
}); */

export default function App() {
  const [fontsLoaded] = useFonts({
    'Excon_regular': require('./assets/fonts/Excon/Excon-Regular.otf'),
    'Excon_bold': require('./assets/fonts/Excon/Excon-Bold.otf'),
    'Excon_thin': require('./assets/fonts/Excon/Excon-Thin.otf'),
    'Erode_regular': require('./assets/fonts/Erode/Erode-Regular.otf'),
    'Erode_bold': require('./assets/fonts/Erode/Erode-Bold.otf'),
    'Erode-Medium': require('./assets/fonts/Erode/Erode-Medium.otf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar barStyle="dark-content" />
      <HomeStackScreen />
    </NavigationContainer>
  );
}
