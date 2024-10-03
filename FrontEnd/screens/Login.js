import * as React from 'react';
import { Pressable, Text, TextInput, View, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginPage({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogin = async () => {
   
     //Ip para el fetch desde la web: 127.0.0.1:8000
    //Ip para el fetch desde el emulador: 10.0.2.2:8000
    
    try {
      setIsLoading(true);
      const response = await fetch('https://marlin-backend.vercel.app/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          username: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);
        setIsLoading(false);
        
        await AsyncStorage.setItem('@userToken', JSON.stringify(data)); 
        Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada con éxito!');
        
        navigation.navigate('Profile'); 
      } else {
       
        Alert.alert('Error en el registro', data.message || 'Algo salió mal');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo más tarde.');
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1  bg-white"   >
       
        {isLoading ? (
           <View className={`w-full h-full justify-center items-center absolute z-10  `}>
          <ActivityIndicator size="large" color="#3498db" />
          </View>
        ): null}
    

      <Image
        source={require('../assets/img/FondoLogin.png')}
        className="w-full h-[50%]  "
        style={{ resizeMode: 'stretch', marginBottom: 30 }}
      />
      <Text  className="text-[41px] font-Excon_bold  text-white absolute top-[10%] ml-4  ">¡Bienvenido de vuelta!    </Text>

      <View className="px-8">
        <Text className="text-[24px] font-Excon_regular  text-[#1952BE]">Correo Electrónico</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2 ">
          <Feather name="mail" size={18} color="#1952BE" />
          <TextInput
            id='email'
            className="w-full"
            placeholder="Ej: correo@electronico.com"
            placeholderTextColor={'#1877F2'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-[#1952BE] ">Contraseña</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-8 gap-2 ">
          <Feather name="lock" size={18} color="#1952BE" />
          <TextInput
            id='password'
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
          onPress={handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0,0,0,0.2)' : '#3765AE',
            },
            styles.button
          ]}
        >
          <Text className="text-[16px] font-Excon_bold" style={styles.text}>Ingresa a la cuenta</Text>
        </Pressable>

        <View className="justify-center items-center w-full my-2">
          <Text className="text-[#3765AE] text-[16px] font-Excon_regular " >o</Text>
        </View>


        <Pressable
         onPress={() => navigation.navigate('Register')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'white',
              border: '2px solid #3765AE',
              marginBottom: 15,
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              
            },
            
          ]}
        >
          <Text className="text-[16px] font-Excon_bold text-[#3765AE] ">Crea una cuenta</Text>
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
    
  },
});
