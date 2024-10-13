import React, { useEffect, useState, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home";
import { Keyboard, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ExploreScreen } from "../screens/Explore";
import { StoreCat } from "../screens/StoreCat";
import { ProfileScreen } from '../screens/Settings';
import { Text } from "react-native";
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
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={30} color={color} />
                    )

                }}

            />

            <Tab.Screen
                name="Explorar"
                component={ExploreScreen}
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
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
