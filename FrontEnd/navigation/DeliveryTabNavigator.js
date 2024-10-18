import React, { useEffect, useState, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home";
import { Keyboard, Platform, Text, View } from "react-native"
import { useColorScheme } from "nativewind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useFonts } from "expo-font";
import { ExploreScreen } from "../screens/Explore";
import { StoreCat } from "../screens/StoreCat";
import { ProfileScreen } from '../screens/Settings';
import { ExpressScreen } from '../screens/ExpressScreen';
const Tab = createBottomTabNavigator();

export function DeliveryTabNavigator() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { colorScheme } = useColorScheme();
    const backgroundPedidos  = colorScheme === 'dark' ? 'B0B0B0' : '#5186EC';


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
                tabBarActiveTintColor: colorScheme === 'dark' ? '#5186EC' : '#FFFFFF',
                tabBarInactiveTintColor: colorScheme === 'dark' ? '#B0B0B0' : '#AAC3F3',
                tabBarLabelPosition: "below-icon",
                animationEnabled: false,
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginTop: -20,
                    fontFamily: "Excon_regular",
                },
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#1952BE',
                    display: "flex",
                    height: 80,
                    justifyContent: "space-around",

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
                        <View style={{ paddingBottom: 10 }}>
                            <MaterialIcons name="home" size={28} color={color} />
                        </View>
                    ),
                    tabBarLabelStyle: {
                        paddingBottom: 8,
                        fontSize: 15,
                        marginTop: -20,
                        fontFamily: "Excon_regular",
                    }

                }}

            />

            <Tab.Screen
                name="Explorar"
                component={ExploreScreen}
                
                options={{
                   
                    tabBarIcon: ({ color }) => (
                        <View style={{ paddingBottom: 10 }}>
                            <Feather name="search" size={28} color={color} />
                        </View>
                    ),

                    

                    tabBarLabelStyle: {
                        paddingBottom: 8,
                        fontSize: 15,
                        marginTop: -20,
                        fontFamily: "Excon_regular",
                    }
                }}
            />

            <Tab.Screen
                name="Pedidos"
                component={ExpressScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <View style={{ backgroundColor: color == "#5186EC"  ? "#5186EC": "#B0B0B0" , borderRadius: 100, padding: 8, marginTop: -10, position: "relative" }}>
                                <MaterialIcons name="delivery-dining" size={34} color={color == "#5186EC"  ? "#B0B0B0": "#5186EC"} />
                            </View>
                            <Text style={{color: color == "#5186EC"  ? "#B0B0B0": "#5186EC", fontSize: 18, fontWeight: "bold", backgroundColor: color == "#5186EC"  ? "#5186EC": "#", borderRadius: 10, position:"absolute", paddingHorizontal: 7, top:30}}>Pedidos</Text>
                        </View>
                    ),
                    tabBarLabelStyle: {
                        display: "none"
                    }

                    // tabBarLabelStyle: {
                    //     fontSize: 18,
                    //     position: "absolute",
                    //     paddingHorizontal: 8,
                    //     backgroundColor: "#BE2727",
                    //     borderRadius: 10,

                    // }
                }}
            />


            <Tab.Screen
                name="Tiendas"
                component={StoreCat}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="store-mall-directory" size={28} color={color} />
                    ),
                    tabBarLabelStyle: {
                        paddingBottom: 8,
                        fontSize: 15,
                        marginTop: -20,
                        fontFamily: "Excon_regular",
                    }
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={28} color={color} />
                    ),
                    tabBarLabelStyle: {
                        paddingBottom: 8,
                        fontSize: 15,
                        marginTop: -20,
                        fontFamily: "Excon_regular",
                    }
                }}
            />
        </Tab.Navigator>
    );
}
