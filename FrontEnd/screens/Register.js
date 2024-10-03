import * as React from 'react';
import { Pressable, Text, TextInput, View, Alert, StyleSheet, Image } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegisterPage({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  // Modificación de la función handleLogin
  const handleLogin = async () => {


    try {
      const response = await fetch('https://marlin-backend.vercel.app/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          username: fullName,
          email: email,
        }),
      });

     
      const data = await response.json();
      console.log('Data:', data);
      if (response.ok) {
        console.log('Registro exitoso:', data);
        
        await AsyncStorage.setItem('@userToken', JSON.stringify(data)); 
        Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada con éxito!');
        
        navigation.navigate('Profile'); 
      } else {
       
        Alert.alert('Error en el registro', data.message || 'Algo salió mal');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo más tarde.');
    }

  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require('../assets/img/FondoLogin.png')}
        className="w-full h-[50%]"
        style={{ resizeMode: 'stretch', marginBottom: 30 }}
      />
      <Text
       className="text-[41px] font-Excon_bold  text-white absolute top-[10%] ml-4 "
      >
        ¡Crea una cuenta!
      </Text>

      <View className="px-8">
        <Text className="text-[24px] font-Excon_regular text-[#1952BE]">Nombre Completo</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2">
          <Feather name="user" size={18} color="#1952BE" />
          <TextInput
            id='fullNameRegister'
            className="w-full"
            placeholder="Ej: Nombre Apellido Apellido"
            placeholderTextColor={'#1877F2'}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-[#1952BE]">Correo Electrónico</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2">
          <Feather name="mail" size={18} color="#1952BE" />
          <TextInput
            id='emailRegister'
            className="w-full"
            placeholder="Ej: correo@electronico.com"
            placeholderTextColor={'#1877F2'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-[#1952BE]">Contraseña</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-6 gap-2">
          <Feather name="lock" size={18} color="#1952BE" />
          <TextInput
            id='passwordRegister'
            className="w-full"
            placeholder="Ej: contraseña123"
            placeholderTextColor={'#1877F2'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Pressable
          id='createRegister'
          onPress={handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : '#3765AE',
              marginBottom: 15,
            },
            styles.button,
          ]}
        >
          <Text className="text-[16px] font-Excon_bold" style={styles.text}>Crear cuenta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
