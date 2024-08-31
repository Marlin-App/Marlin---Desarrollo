// navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
/* import { HomeStackScreen } from './HomeStack'; */
import { SearchScreen } from '../screens/Search';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { NotificationScreen } from '../screens/Notification';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: 'white',
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: {
                    backgroundColor: '#0038A2',
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Buscar"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="magnify" size={24} color={color} />
                    ),
                }}
            />


            <Tab.Screen name="Perfil" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen name="Notificaciones" component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" size={24} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}
