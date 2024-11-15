import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PayScreen } from '../screens/Pay';
import { CartScreen } from '../screens/Cart';

const Stack = createNativeStackNavigator();

export function CartStackScreen({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Pay"
                component={PayScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Pago',
                    headerTintColor: "#015DEC",
                    headerTitleStyle: {
                        fontFamily: 'Excon_regular',
                    },
                }}
            />
        </Stack.Navigator>
    );
}
