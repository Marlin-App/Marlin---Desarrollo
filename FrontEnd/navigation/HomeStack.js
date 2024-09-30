// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import { StoreCat } from '../screens/StoreCat';
import { Store } from '../screens/Store';
import { ItemPage } from '../screens/Item';
import { CartScreen } from '../screens/Cart';
import * as React from "react";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LandingPage } from '../screens/landing';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
    Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
    Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
    Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
    Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ data: 'dad' }} // Puedes pasar cualquier dato inicial aquí
        options={{ headerShown: false }}
      />

<HomeStack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: true }}
      />

      <HomeStack.Screen
        name="Item"
        component={ItemPage}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: "#015DEC",
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          }
        }}
      />

      <HomeStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: "#015DEC",
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          }
        }}
      />

    </HomeStack.Navigator>
  );
}
