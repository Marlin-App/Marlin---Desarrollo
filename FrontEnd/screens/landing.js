import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export function LandingPage({ navigation }) {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/img/fondoLanding.png')} style={styles.backgroundImage}>
        {/* Usa require para imágenes locales */}
        <Image
          source={require('../assets/img/marlin.png')}
          style={styles.image}
        />
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>
          Conéctate con el puerto, compra local y apoya a lo nuestro
        </Text>
        <TouchableOpacity style={styles.buttonA} to={{ screen: 'Login' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonTextA}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonB} to={{ screen: 'Login' }} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonTextB}>Crear una cuenta</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0038A2',
    opacity: 0.9,
  },

  image: {
    marginBottom: 20,
    resizeMode: 'contain',
    width: 180,
    height: 180,

  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  buttonA: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 58,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
  },

  buttonTextA: {
    color: '#0038A2',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 1,
    marginLeft: 12,
  },

  buttonB: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 51,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonTextB: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },

  enlace: {
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    paddingTop: 20,
    color: '#CECECE',
  },

  link: {
    color: '#fff',
    fontWeight: 'bold',
    opacity: 1,
  },

  backgroundImage: {
    flexGrow: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});

export default LandingPage;