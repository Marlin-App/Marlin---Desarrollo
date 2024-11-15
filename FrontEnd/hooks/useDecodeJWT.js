import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDecodeJWT = () => {

  // Función para decodificar el JWT
  const base64UrlDecode = useCallback((base64Url) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return decodeURIComponent(escape(atob(base64)));
  }, []);
  // ------------------------------------------------------------------------

  // decodifica las partes codificadas
  const decodeJWT = useCallback((token) => {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = base64UrlDecode(header);
    const decodedPayload = base64UrlDecode(payload);

    const headerObj = JSON.parse(decodedHeader);
    const payloadObj = JSON.parse(decodedPayload);

    return {
      header: headerObj,
      payload: payloadObj,
      signature: signature
    };
  }, [base64UrlDecode]);
  // ------------------------------------------------------------------------

  // Función para comprobar si el token ha expirado
  async function isTokenExpired() {
    const token = await getToken();
    if (!token) return true;
    const decodeToken = decodeJWT(token.access);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodeToken.payload.exp < currentTime;
  }
  // ------------------------------------------------------------------------

  // Función para refrescar el token
  async function refreshToken() {
    const token = await getToken();
    const response = await fetch('https://marlin-backend.vercel.app/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: token.refresh
      }),
    });

    if (!response.ok) {
      throw new Error('Error al refrescar el token');
    }

    const data = await response.json();
    await AsyncStorage.setItem('@userToken', JSON.stringify(data));
  }
  // ------------------------------------------------------------------------

  // Función para obtener el token
  async function getToken() {
    const jsonValue = await AsyncStorage.getItem('@userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData;
    return token;
  }
  // ------------------------------------------------------------------------

  // Función para obtener el access token
  async function getAccessToken() {
    let token = decodeJWT(await getToken());
    return token.access;
  }
  // ------------------------------------------------------------------------

  return { decodeJWT, isTokenExpired, refreshToken, getToken, getAccessToken };
};

export default useDecodeJWT;