import React, { useEffect, useState, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchScreen } from "../screens/Search";
import { HomeScreen } from "../screens/Home";
import { NotificationScreen } from "../screens/Notification";
import { ProfileStackScreen } from "./ProfileStack";
import { ExplorerStack } from "./ExplorerStack";
import { CardScreen } from "../screens/CardScreen";
import { Keyboard, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from '@expo/vector-icons/Ionicons';;
import Feather from "@expo/vector-icons/Feather";
import { HomeStackScreen } from "./HomeStack";
import { StoreCat } from "../screens/StoreCat";
import { CartScreen } from '../screens/Cart';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardShowListener =
            Platform.OS === "ios"
                ? Keyboard.addListener("keyboardWillShow", () =>
                    setKeyboardVisible(true)
                )
                : Keyboard.addListener("keyboardDidShow", () =>
                    setKeyboardVisible(true)
                );

        const keyboardHideListener =
            Platform.OS === "ios"
                ? Keyboard.addListener("keyboardWillHide", () =>
                    setKeyboardVisible(false)
                )
                : Keyboard.addListener("keyboardDidHide", () =>
                    setKeyboardVisible(false)
                );

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

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
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#AAC3F3",
                tabBarInactiveTintColor: "white",
                tabBarLabelPosition: "below-icon",
                animationEnabled: false,
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginTop: -20,
                    fontFamily: "Excon_regular",
                },
                tabBarStyle: {
                    backgroundColor: "#015DEC",
                    display: "flex",
                    height: 80,
                    justifyContent: "space-around",

                    paddingBottom: 10,
                    display: isKeyboardVisible ? "none" : "flex",
                },
                /*  */
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={30} color={color} />
                    ),
                }}

            />

            <Tab.Screen
                name="Explorar"
                component={ExplorerStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={30} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Tiendas"
                component={StoreCat}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="store-mall-directory" size={30} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
