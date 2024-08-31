
import React from 'react';
import { View, Text, Button } from 'react-native';

export function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Mi perfil</Text>
         {/*  <Button
            title="Lofin"
            onPress={() => navigation.navigate('Login')}
            
          /> */}
        </View>
      );
}