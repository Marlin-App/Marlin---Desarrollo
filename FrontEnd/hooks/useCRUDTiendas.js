import { useState } from 'react';
import { Alert } from 'react-native';
import useDecodeJWT from './useDecodeJWT';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCRUDTiendas = (navigation) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allStores, setAllStores] = useState([]);
    const { decodeJWT, isTokenExpired, refreshToken } = useDecodeJWT();

    // funcion que crea la tienda
    const createShop = async (formData, imageProfile, imagePortada, acceptedTerms) => {

        if (await isTokenExpired()) {
            await refreshToken();
        }

        if (acceptedTerms) {
            setLoading(true);
            setError(null);

            const jsonValue = await AsyncStorage.getItem('@userToken');
            const userData = JSON.parse(jsonValue);
            const token = userData.access;
            const decodedToken = decodeJWT(token);
            const user_id = decodedToken.payload.user_id;

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('referencias', formData.referencias);
            formDataToSend.append('canton', formData.canton);
            formDataToSend.append('district', formData.district);
            formDataToSend.append('coodernates', formData.coodernates.latitude + ',' + formData.coodernates.longitude);
            formDataToSend.append('user_id', user_id);
            formDataToSend.append('num_sinpe', formData.sinpe);
            formDataToSend.append('owner_sinpe', formData.sinpe_name);
            formDataToSend.append('opening_hour', formData.opening_hour);
            formDataToSend.append('closing_hour', formData.closing_hour);
            formDataToSend.append('store_type', formData.store_type);

            if (imageProfile) {
                const profileFile = {
                    uri: imageProfile,
                    type: 'image/jpeg',
                    name: 'perfil.jpg',
                };
                formDataToSend.append('picture', profileFile);
            }


            if (imagePortada) {
                const portadaFile = {
                    uri: imagePortada,
                    type: 'image/jpeg',
                    name: 'portada.jpg',
                };
                formDataToSend.append('banner', portadaFile);
            }

            try {
                const response = await fetch(`https://marlin-backend.vercel.app/api/stores/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formDataToSend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Error de respuesta:', errorData);
                    throw new Error('Error creando la tienda');
                } else {
                    console.log('Tienda creada con éxito');
                    navigation.navigate('Mis tiendas');
                    Alert.alert('Tienda creada', '¡Tu tienda ha sido creada con éxito!');
                }
            } catch (error) {
                console.error('Error al crear la tienda:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };
    // ------------------------------------------------------------------------

    //Funcione que obtiene la tienda del usuario
    const getUserStores = async () => {
        setLoading(true);
        setError(null);

        const jsonValue = await AsyncStorage.getItem('@userToken');
        if (jsonValue == null) {
            setLoading(false);
            setIsLogged(false);
            return;
        }
        const userData = JSON.parse(jsonValue);
        const token = userData.access;
        const decodedToken = decodeJWT(token);
        const user_id = decodedToken.payload.user_id;

        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/?user_id=${user_id}`);
            const data2 = await response.json();
            setAllStores(data2);
            setLoading(false);

            if (!response.ok) {
                console.log('Error de respuesta:');
                throw new Error('Error obteniendo las tiendas');
            }

        } catch (error) {
            console.error('Error obteniendo las tiendas:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    // ------------------------------------------------------------------------

    // funcion que elimina la tienda
    const deleteShop = async (storeId) => {
        const jsonValue = await AsyncStorage.getItem('@userToken');
        const userData = JSON.parse(jsonValue);
        const token = userData.access;
        console.log(storeId);
        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/${storeId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error de respuesta:', errorData);
                throw new Error('Error eliminando la tienda');
            } else {
                console.log('Tienda eliminada con éxito');
                getUserStores(1);
                Alert.alert('Tienda eliminada', '¡Tu tienda ha sido eliminada con éxito!');
                navigation.navigate('Mi tiendas');
            }
        } catch (error) {
            console.error('Error al eliminar la tienda:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    // ------------------------------------------------------------------------

    // Actualiza la informacion de la tienda
    const updateShop = async (formData, imageProfile, imagePortada, store_id) => {
        if (await isTokenExpired()) {
            await refreshToken();
        }
        setLoading(true);
        setError(null);

        const jsonValue = await AsyncStorage.getItem('@userToken');
        const userData = JSON.parse(jsonValue);
        const token = userData.access;
        const decodedToken = decodeJWT(token);
        const user_id = decodedToken.payload.user_id;

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('referencias', formData.referencias);
        formDataToSend.append('canton', formData.canton);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('coodernates', formData.coodernates.location + ',' + formData.coodernates.latitude);
        formDataToSend.append('user_id', user_id);
        formDataToSend.append('num_sinpe', formData.sinpe);
        formDataToSend.append('owner_sinpe', formData.sinpe_name);
        formDataToSend.append('opening_hour', formData.opening_hour);
        formDataToSend.append('closing_hour', formData.closing_hour);
        formDataToSend.append('store_type', formData.store_type);

        // Agregar la imagen de perfil si existe
        if (imageProfile) {
            const profileFile = {
                uri: imageProfile,
                type: 'image/jpeg',
                name: 'perfil.jpg',
            };
            formDataToSend.append('picture', profileFile);
        }

        // Agregar la imagen de portada si existe
        if (imagePortada) {
            const portadaFile = {
                uri: imagePortada,
                type: 'image/jpeg',
                name: 'portada.jpg',
            };
            formDataToSend.append('banner', portadaFile);
        }

        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/${store_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend

            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error de respuesta:', errorData);
                throw new Error('Error actualizando la tienda');
            } else {
                console.log('Tienda actualizada con éxito');
                Alert.alert('Tienda actualizada', '¡Tu tienda ha sido actualizada con éxito!');
                navigation.navigate('Mi tiendas');
            }
        } catch (error) {
            console.error('Error al actualizar la tienda:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    // ------------------------------------------------------------------------

    return { createShop, loading, error, getUserStores, allStores, getUserStores, setAllStores, deleteShop, updateShop };
};

export default useCRUDTiendas;