import { useState } from 'react';
import {  Alert} from 'react-native';
import useDecodeJWT from './useDecodeJWT';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCRUDTiendas = (navigation) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allStores, setAllStores] = useState([]);
;
    const { decodeJWT } = useDecodeJWT();

    const createShop = async (formData, imagePerfil, imagePortada, acceptedTerms) => {
        if (acceptedTerms) {
            setLoading(true);
            setError(null);
         

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('referencias', formData.referencias);
            formDataToSend.append('canton', formData.canton);
            formDataToSend.append('district', formData.district);
            formDataToSend.append('coodernates', formData.coodernates.location+','+formData.coodernates.latitude);
            formDataToSend.append('user_id', formData.user_id);
            formDataToSend.append('num_sinpe', formData.sinpe);
            formDataToSend.append('owner_sinpe', formData.sinpe_name);
            formDataToSend.append('opening_hour', formData.opening_hour);
            formDataToSend.append('closing_hour', formData.closing_hour);
            const type= 1;
            formDataToSend.append('store_type', type);

            // Agregar la imagen de perfil si existe
            if (imagePerfil) {
                const perfilFile = {
                    uri: imagePerfil,
                    type: 'image/jpeg',
                    name: 'perfil.jpg',
                };
                formDataToSend.append('picture', perfilFile);
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
                const response = await fetch(`https://marlin-backend.vercel.app/api/stores/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4Mjc1NTE2LCJpYXQiOjE3MjgyNzQ2MTYsImp0aSI6ImMwNDYxMGVhYTA2YjQ0ZmFhMDgyYjYxMDI5Zjg4ZWE5IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJKZXJlbXkxIiwiZW1haWwiOiJob2xhbXVuZG8yQGdtYWlsLmNvbSIsInVzZXJwcm9maWxlIjoxfQ.EuqeKAEqp0cSwB52MM05qKgL01e4wht4nS5yohh0rPw`
                    },
                    body: formDataToSend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Error de respuesta:', errorData);
                    throw new Error('Error creando la tienda');
                } else {
                    console.log('Tienda creada con éxito');
                    navigation.navigate('Mi tiendas');
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

    const getUserStores = async (userId) => {
        setLoading(true);
        setError(null);

        const jsonValue = await AsyncStorage.getItem('@userToken');
        if (jsonValue==null) {
            setLoading(false);
            setIsLogged(false);
            return;
        }
        const userData = JSON.parse(jsonValue);
        const token = userData.access;
        const decodedToken = decodeJWT(token);
        const user_id = decodedToken.payload.userprofile;

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


    const deleteShop = async (storeId) => {
       
        console.log(storeId);
        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/${storeId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MjcwMDAwLCJpYXQiOjE3MjgyNjkxMDAsImp0aSI6ImVjMmRlODU2MDI2NTRlZjhhMGUxNGM2MmI0Yzg1MGNmIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJKZXJlbXkxIiwiZW1haWwiOiJob2xhbXVuZG8yQGdtYWlsLmNvbSIsInVzZXJwcm9maWxlIjoxfQ.kVAiY5wlW-jKgISSjplkQyfkmSp2kBPVTnFXiozBiGk`
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

    }


    const updateShop = async (formData, imagePerfil, imagePortada, store_id) => {
        setLoading(true);
        setError(null);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('referencias', formData.referencias);
        formDataToSend.append('canton', formData.canton);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('coodernates', formData.coodernates.location+','+formData.coodernates.latitude);
        formDataToSend.append('user_id', formData.user_id);
        formDataToSend.append('num_sinpe', formData.sinpe);
        formDataToSend.append('owner_sinpe', formData.sinpe_name);
        formDataToSend.append('opening_hour', formData.opening_hour);
        formDataToSend.append('closing_hour', formData.closing_hour);
        const type= 1;
        formDataToSend.append('store_type', type);

        // Agregar la imagen de perfil si existe
        if (imagePerfil) {
            const perfilFile = {
                uri: imagePerfil,
                type: 'image/jpeg',
                name: 'perfil.jpg',
            };
            formDataToSend.append('picture', perfilFile);
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
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4Mjc2NjQwLCJpYXQiOjE3MjgyNzU3NDAsImp0aSI6IjUxNDMzYmI2MTZmODQwYTI4ZWIwMThjOTI4MWUxZjE1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJKZXJlbXkxIiwiZW1haWwiOiJob2xhbXVuZG8yQGdtYWlsLmNvbSIsInVzZXJwcm9maWxlIjoxfQ.cwnIYncbp5Y9K_QUqODvnN1JTN1R4_TcmAxhLRWD2eg`,
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
        
        

    return { createShop, loading, error, getUserStores, allStores, getUserStores, setAllStores, deleteShop, updateShop };
};

export default useCRUDTiendas;
