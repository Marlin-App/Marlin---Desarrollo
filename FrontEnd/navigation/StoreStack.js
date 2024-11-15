import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Store } from '../screens/Store';
import { ItemPage } from '../screens/Item';
import { MainTabNavigator } from './MainTabNavigator';

const StoreStack = createNativeStackNavigator();

export function StoreStackScreen({ navigation }) {

    return (
        <StoreStack.Navigator>

            <StoreStack.Screen
                name="Stores"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />

            <StoreStack.Screen
                name="Store"
                component={Store}
                options={{
                    headerShown: true,
                    headerTitle: 'Regresar',
                    headerTintColor: "#015DEC",
                    headerTitleStyle: {
                        fontFamily: 'Excon_regular',
                    }
                }}
            />

            <StoreStack.Screen
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

        </StoreStack.Navigator>
    );
}