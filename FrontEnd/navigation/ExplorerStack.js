import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen } from '../screens/Explore';
import { ItemPage } from '../screens/Item';

const ProfileStack = createNativeStackNavigator();

export function ExplorerStack({ navigation, route }) {

  return (
    <ProfileStack.Navigator>

      <ProfileStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
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

    </ProfileStack.Navigator>
  );
}