import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchScreen } from "../screens/Search";
import { HomeScreen } from "../screens/Home";
import { NotificationScreen } from "../screens/Notification";
import { ProfileStackScreen } from "./ProfileStack";
import { CardScreen } from "../screens/CardScreen";
import { Keyboard, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { HomeStackScreen } from "./HomeStack";

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
                name="Buscar"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="search" size={30} color={color} />
                    ),
                }}
            />

            {/* <Tab.Screen
                name="Mensajes"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox-outline" size={30} color={color} />
                    ),
                }}
            /> */}

            <Tab.Screen
                name="Favoritos"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="heart-o" size={30} color={color} />
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
