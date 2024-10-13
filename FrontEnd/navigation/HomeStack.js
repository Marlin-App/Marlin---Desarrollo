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
import { PayScreen } from '../screens/Pay';
import { useColorScheme } from "nativewind";
import { MainTabNavigator } from './MainTabNavigator';
import { LoginPage } from '../screens/Login';
import { RegisterPage } from '../screens/Register';
import { DirectionScreen } from '../screens/DirectionScreen';
import { CardScreen } from '../screens/CardScreen';
import { HomeComercianteScreen } from '../screens/HomeComerciante';
import { ProfileStackScreen } from './ProfileStack';
import { InformationScreen } from '../screens/Information';
import { HistoricalScreen } from '../screens/Historical';
import { HistoricalDetailsScreen } from '../screens/HistoricalDetails';
import { RestorePasswordScreen } from '../screens/RestorePassword';
import { TerminosCondiciones } from '../screens/TerminosCondiciones';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
    Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
    Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
    Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
    Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
  });

  const { colorScheme } = useColorScheme();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={MainTabNavigator}
        initialParams={{ data: 'dad' }}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Item"
        component={ItemPage}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="Pay"
        component={PayScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="Store"
        component={Store}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerTitleStyle: {
            fontFamily: 'Excon_regular',
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />


      <HomeStack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="DirectionScreen"
        component={DirectionScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="secondScreen"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />
      <HomeStack.Screen
        name="HistoricalScreen"
        component={HistoricalScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="HistoricalDetailsScreen"
        component={HistoricalDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="RestorePasswordScreen"
        component={RestorePasswordScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

      <HomeStack.Screen
        name="TerminosCondiciones"
        component={TerminosCondiciones}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: colorScheme === 'dark' ? '#60a5fa' : '#015DEC',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#ffffff',
          }
        }}
      />

    </HomeStack.Navigator>
  );
}
