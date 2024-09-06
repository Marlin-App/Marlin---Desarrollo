import { Link } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Usa require para imágenes locales */}
      <Image
        source={require('../assets/img/marlin.png')}
        style={styles.image}
      />
      <Text style={styles.title}>¡Bienvenido a nuestra App!</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0038A2',
  },
  image: {
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonA: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonTextA: {
    color: '#194599',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonB: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonTextB: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  google: {
    color: '#194599',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  enlace: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    color: '#D9D9D9',
  },

  link: {
    color: '#fff',
    fontWeight: 'bold',
    opacity: 1,
  },
});

export default LandingPage;