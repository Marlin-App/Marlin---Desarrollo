import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from '../screens/Search';
import { HomeScreen } from '../screens/Home';
import { NotificationScreen } from '../screens/Notification';
import { ProfileStackScreen } from './ProfileStack';
import { Keyboard, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardShowListener = Platform.OS === 'ios'
            ? Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true)) // Se activa antes de que el teclado aparezca
            : Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true)); // Se activa justo después en Android

        const keyboardHideListener = Platform.OS === 'ios'
            ? Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false)) // Se activa antes de que el teclado desaparezca
            : Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false)); // Se activa justo después en Android

        // Cleanup listeners on unmount
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);


    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#AAC3F3',
                tabBarInactiveTintColor: 'white',
                tabBarLabelPosition: 'below-icon',
                animationEnabled: false,
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginTop: -20,
                },
                tabBarStyle: {
                    backgroundColor: '#015DEC',
                    display: 'flex',
                    height: 80,
                    justifyContent: 'center',
                    paddingBottom: 10,
                    display: isKeyboardVisible ? 'none' : 'flex',
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

            <Tab.Screen
                name="Notificaciones"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="notifications" size={30} color={color}/>
                    ),
                }}
            />

            <Tab.Screen
                name="Ajustes"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" size={30} color={color} />
                    ),
                }}
            />



        </Tab.Navigator>
    );
}
