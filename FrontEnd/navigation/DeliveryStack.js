import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from "nativewind";
import { DeliveryTabNavigator } from './DeliveryTabNavigator';

const ProfileStack = createNativeStackNavigator();

export function DeliveryStackScreen({ navigation, route }) {
    const { colorScheme } = useColorScheme();


    return (
        <ProfileStack.Navigator>

            <ProfileStack.Screen
                name="Delivery"
                component={DeliveryTabNavigator}
                options={{ headerShown: false }}
            />

        </ProfileStack.Navigator>
    );
}
