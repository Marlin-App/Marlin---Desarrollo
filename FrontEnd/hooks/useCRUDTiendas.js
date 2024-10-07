import { useState } from 'react';
import {  Alert} from 'react-native';
const useCRUDTiendas = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allStores, setAllStores] = useState([]);

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
            formDataToSend.append('coodernates', formData.coodernates);
            formDataToSend.append('user_id', formData.user_id);
            formDataToSend.append('sinpe', formData.sinpe);
            formDataToSend.append('sinpe_name', formData.sinpe_name);
            formDataToSend.append('opening_hour', formData.opening_hour);
            formDataToSend.append('closing_hour', formData.closing_hour);
            formDataToSend.append('store_type', formData.store_type);

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
                const response = await fetch(`https://marlin-desarrollo.vercel.app/api/stores/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MjQxNzgxLCJpYXQiOjE3MjgyNDA4ODEsImp0aSI6IjIyYjg5NDczZGVkYjQ3NTZiOTYzMmRkNDI0NmIxNjJkIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJKZXJlbXkiLCJlbWFpbCI6IiIsInVzZXJwcm9maWxlIjoxfQ.8h2vlO7hAI1mcYsbEQhkeFt5g3IlG_vwCaMwosgCTPM`
                    },
                    body: formDataToSend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Error de respuesta:', errorData);
                    throw new Error('Error creando la tienda');
                } else {
                    console.log('Tienda creada con éxito');
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
        try {
            const response = await fetch("https://marlin-backend.vercel.app/api/stores/");
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

    return { createShop, loading, error, getUserStores, allStores, getUserStores, setAllStores };
};

export default useCRUDTiendas;
