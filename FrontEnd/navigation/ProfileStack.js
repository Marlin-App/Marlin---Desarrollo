import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Settings';
import { LandingPage } from '../screens/landing';
import { LoginPage } from '../screens/Login';
import { RegisterPage } from '../screens/Register';
import { DirectionScreen } from '../screens/DirectionScreen';
import { CardScreen } from '../screens/CardScreen';
import { ItemPage } from '../screens/Item';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen({ navigation, route }) {

  return (
    <ProfileStack.Navigator>

      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      

      <ProfileStack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: "#015DEC"
        }}
      />

      <ProfileStack.Screen
        name="DirectionScreen"
        component={DirectionScreen}
        options={{
          headerShown: true,
          headerTitle: 'Regresar',
          headerTintColor: "#015DEC"
        }}
      />



    </ProfileStack.Navigator>
  );
}
