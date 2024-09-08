import * as React from 'react';
import { Pressable, Text, TextInput, View, Alert, StyleSheet, Image } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';



export function LoginPage({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = ({navigation}) => {/* 
    // Validación simple
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Aquí iría la lógica de autenticación, por ejemplo, enviar los datos al servidor
    Alert.alert('Éxito', 'Inicio de sesión exitoso'); */
  };

  return (
    <View className="flex-1  bg-white">

      <Image
        source={require('../assets/img/FondoLogin.png')}
        className="w-full h-[50%]  "
        style={{ resizeMode: 'stretch', marginBottom: 30 }}
      />
      <Text style={{ lineHeight: 60 }} className="text-4xl font-bold text-center text-white absolute top-[10%] w-48 ml-8  ">¡Bienvenido de vuelta!    </Text>

      <View className="px-8">
        <Text className="text-lg text-[#1952BE]">Correo Electrónico</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2 ">
          <Feather name="mail" size={18} color="#1952BE" />
          <TextInput
            className="w-full"
            placeholder="Ej: correo@electronico.com"
            placeholderTextColor={'#1877F2'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text className="text-lg text-[#1952BE] ">Contraseña</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2 ">
          <Feather name="lock" size={18} color="#1952BE" />
          <TextInput
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
          <Text style={styles.text}>Ingresa a la cuenta</Text>
        </Pressable>

        <View className="justify-center items-center w-full my-2">
          <Text className="text-[#3765AE] " >o</Text>
        </View>


        <Pressable
         onPress={() => navigation.navigate('Register')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : '#3765AE',
              marginBottom: 15,
            },
            styles.button
          ]}
        >
          <Text style={styles.text}>Crea una cuenta</Text>
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
