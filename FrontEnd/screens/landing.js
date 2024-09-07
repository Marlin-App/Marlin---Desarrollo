import { Link } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

export function LandingPage({ navigation }) {

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        backgroundColor: '#0038A2',
                    display: 'none',
                    height: 80,
                    justifyContent: 'center',
                    paddingBottom: 10,
      }

    });

    return () => {

      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: '#0038A2',
          display: 'flex',
          height: 80,
          justifyContent: 'center',
          paddingBottom: 10,
        }

      });
    }


  }, []);

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
      <TouchableOpacity style={styles.buttonA} onPress={() => alert('Botón presionado')}>
        <Text style={styles.google}>X </Text>
        <Text style={styles.buttonTextA}>Ingresa mediante google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonB} onPress={() => alert('Botón presionado')}>
        <Text style={styles.buttonTextB}>Ingresa mediante otra cuenta</Text>
      </TouchableOpacity>

      <Text style={styles.enlace}>
        Ya tienes una cuenta?{' '}
        <Link style={styles.link} to={{ screen: 'Login' }} onPress={() => navigation.navigate('Login')}>
          Ingresa a ella
        </Link>
      </Text>
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
    paddingHorizontal: 30,
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
  },

  buttonB: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonTextB: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },

  google: {
    color: '#194599',
    fontSize: 16,
    fontWeight: 'bold',
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