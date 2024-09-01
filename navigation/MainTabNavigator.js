import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchScreen } from '../screens/Search';
import { HomeScreen } from '../screens/Home';
import { NotificationScreen } from '../screens/Notification';
import { ProfileStackScreen } from './ProfileStack';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: 'white',
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginTop:-20, // Ajusta este valor para aumentar o disminuir el espacio
                },
                tabBarStyle: {
                    backgroundColor: '#0038A2',
                    display: 'flex',
                    height: 80,
                    justifyContent: 'center',
                    paddingBottom: 10,
                   
                },
              /*  */
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Buscar"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="magnify" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notificaciones"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" size={30 } color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
