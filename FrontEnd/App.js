import * as React from 'react';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { HomeStackScreen } from './navigation/HomeStack.js';
import { useColorScheme } from "nativewind";
// Desactivar el splash screen automático de Expo
SplashScreen.preventAutoHideAsync();

/* NativeWindStyleSheet.setOutput({
  default: "native",
}); */

export default function App() {
  const { colorScheme } = useColorScheme();
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
      <StatusBar barStyle="light-content" backgroundColor={colorScheme === 'dark' ? "#1C1C1C" : "#1952BE"} />
      <HomeStackScreen />
    </NavigationContainer>
  );
}
