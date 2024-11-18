import * as React from 'react';
import { Text, TextInput, View, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export function RegisterPage({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setpasswordVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisible = () => {
    setpasswordVisible(!passwordVisible);
  };
  // ------------------------------------------------------------------------

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
          username: userName,
          email: email,
          first_name: firstName,
          last_name: lastName
        }),
      });


      const data = await response.json();
      if (response.ok) {
        console.log('Registro exitoso:', data);
        Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada con éxito!');
        navigation.navigate('Mi perfil');
        
        await AsyncStorage.setItem('@userToken', JSON.stringify(data));
      } else {
      
        const firstErrorKey = Object.keys(data)[0];
        console.log('Primer error:', data[firstErrorKey][0]);
        setError(data[firstErrorKey][0]);
      }
    } catch (error) {
      setError('Error en el registro, por favor intenta de nuevo o más tarde');
    }

  };
  // ------------------------------------------------------------------------

  return (
    <View className="flex-1 bg-white">
      <View>
        <Image
          source={require("../assets/img/FondoLogin.png")}
          className="w-full h-56"
          style={{ resizeMode: "stretch", marginBottom: 30 }}
        />
        <Text className="text-[41px] font-Excon_bold  text-white absolute top-[10%] ml-4 mt-6  ">
        ¡Crea una cuenta!{" "}
        </Text>
      </View>

      <ScrollView className="px-8">

        <Text className="text-[24px] font-Excon_regular text-[#1952BE] mt-6">Nombres</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2">
          <Feather name="user" size={18} color="#1952BE" />
          <TextInput
            id='firstName'
            className="w-full"
            placeholder="Ej: Nombre 1 Nombre 2"
            placeholderTextColor={'#1877F2'}
            value={firstName}
            onChangeText={setFirstName}
            onBlur={() => {
              if (!firstName) {
                Alert.alert('Campo requerido', 'El nombre es requerido');
              }
            }}
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-[#1952BE]">Apellidos</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] gap-2">
          <Feather name="user" size={18} color="#1952BE" />
          <TextInput
            id='lastName'
            className="w-full"
            placeholder="Ej: Apellido 1 Apellido 2"
            placeholderTextColor={'#1877F2'}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-[#1952BE] mt-4">Nombre de usuario</Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2">
          <Feather name="user" size={18} color="#1952BE" />
          <TextInput
            id='userName'
            className="w-full"
            placeholder="Ej: MarlinPescador24"
            placeholderTextColor={'#1877F2'}
            value={userName}
            onChangeText={setUserName}
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
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-2 gap-2 relative">
          <Feather name="lock" size={18} color="#1952BE" />
          <TextInput
            id='passwordRegister'
            className="w-full"
            placeholder="Ej: contraseña123"
            placeholderTextColor={'#1877F2'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity className="absolute right-4 text-[16px] font-Excon_regular text-main-blue z-10 opacity-70" onPress={togglePasswordVisible}>
            <MaterialIcons
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#1952BE"
            />
          </TouchableOpacity>
        </View>

        <Text className="mb-6 text-red-500 text-center w-full">{error} </Text>

        <View className="flex-col px-5 my-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
              <View className={`w-6 h-6 border-2 border-main-blue ${acceptedTerms ? 'bg-main-blue' : 'bg-white'}`} />
            </TouchableOpacity>
            {/* corregir la ruta para mostrar los terminos y condiciones */}
            <Text className="ml-2 text-main-blue text-xs font-Excon_thin">He leído y acepto los <Text onPress={() => navigation.navigate("TerminosCondiciones")} className="text-main-blue text-xs font-Excon_bold">términos y condiciones</Text> </Text>
          </View>
        </View>

        <TouchableOpacity
          className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2 ${acceptedTerms && email && password && userName && firstName && lastName ? '' : 'opacity-50'}`}
          onPress={acceptedTerms && email && password && userName && firstName && lastName ? handleLogin : null}
          disabled={!acceptedTerms || !email || !password || !userName || !firstName || !lastName}
        >
          <Text className="text-white font-Excon_bold text-lg ml-2">Crear cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}