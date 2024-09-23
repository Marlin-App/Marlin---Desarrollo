import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen } from '../screens/Explore';


const ProfileStack = createNativeStackNavigator();

export function ExplorerStack({ navigation, route }) {

    return (
        <ProfileStack.Navigator>

            <ProfileStack.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{ headerShown: false }}
            />

        </ProfileStack.Navigator>
    );
}
