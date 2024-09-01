import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile';
import { LandingPage } from '../components/landing/landing';
import { LoginPage } from '../screens/Login';
const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen({ navigation, route }) {
 
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ee" 
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

     
    </ProfileStack.Navigator>
  );
}
