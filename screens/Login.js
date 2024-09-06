import * as React from 'react';
import { Pressable, Text, TextInput, View, Alert, StyleSheet, Image } from 'react-native';
import { styled } from 'nativewind';

export function LoginPage({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Validación simple
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Aquí iría la lógica de autenticación, por ejemplo, enviar los datos al servidor
    Alert.alert('Éxito', 'Inicio de sesión exitoso');
  };

  return (
    <View className="flex-1  bg-white  relative">
      <View>    
      <Image
        source={require('../assets/img/FondoLogin.png')}
        className="w-full h-30  "
        style={{ resizeMode: 'stretch'}}
      />
      <Text style={{ lineHeight: 60 }} className="text-4xl font-bold text-center text-white absolute top-52 w-48 ml-8  ">¡Bienvenido de vuelta!    </Text>
      </View>
    <View className="p-4">
      <Text className="text-lg mb-2">Correo Electrónico</Text>
      <TextInput
        className="h-10 border border-gray-300 mb-4 px-2 rounded"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text className="text-lg mb-2">Contraseña</Text>
      <TextInput
        className="h-10 border border-gray-300 mb-4 px-2 rounded"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Pressable 
        onPress={handleLogin} 
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgba(0,0,0,0.2)' : '#007BFF',
          },
          styles.button
        ]}
      >
        <Text style={styles.text}>Ingresa a la cuenta</Text>
      </Pressable>
      <Pressable 
        onPress={handleLogin} 
        style={({ pressed }) => [
          {
            borderColor: '#007BFF',
            borderWidth: 3,
          },
          styles.button
        ]}
      >
        <Text  style={styles.text}>Crea una cuenta</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
