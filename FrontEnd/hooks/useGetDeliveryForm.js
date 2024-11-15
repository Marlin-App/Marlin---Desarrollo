import { Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDecodeJWT from './useDecodeJWT';

const useGetDeliveryForm = (navigation) => {
    const { decodeJWT, refreshToken, isTokenExpired } = useDecodeJWT();
    const [loading, setLoading] = useState(true);

    // Función para obtener el access token
    const handleDeliveryForm = async (deliveryForm) => {
        if (await isTokenExpired()) {
            await refreshToken();
        } else {
            console.log('Token no expirado');
        }
        const jsonValue = await AsyncStorage.getItem('@userToken');

        if (!jsonValue) {
            setLoading(false);
            setIsLogged(false);
            return;
        }

        const userData = JSON.parse(jsonValue);
        const token = userData.access;
        const decodedToken = decodeJWT(token);
        const user_id = decodedToken.payload.user_id;

        console.log("usuario", deliveryForm);

        const formDataToSend = new FormData();
        formDataToSend.append("user_id", user_id);
        formDataToSend.append("brand", deliveryForm.brand);
        formDataToSend.append("model", deliveryForm.model);
        formDataToSend.append("plate", deliveryForm.plate);
        formDataToSend.append("vehicle", deliveryForm.vehicle);

        // Agregar las imagenes
        if (deliveryForm.pictures && deliveryForm.pictures.length > 0) {
            deliveryForm.pictures.forEach((image, index) => {
                const perfilFile = {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `${deliveryForm.brand}_${image.id}.jpg`,
                };
                switch (index) {
                    case 0:
                        formDataToSend.append("selfie", perfilFile);
                        break;
                    case 1:
                        formDataToSend.append("vehicle_picture", perfilFile);
                        break;
                    case 2:
                        formDataToSend.append("iD_front_picture", perfilFile);
                        break;
                    case 3:
                        formDataToSend.append("iD_back_picture", perfilFile);
                        break;
                    case 4:
                        formDataToSend.append("license_picture", perfilFile);
                        break;
                    default:
                        formDataToSend.append("pictures", perfilFile);
                        break;
                }
            });
        }

        console.log("Formulario de repartidor", formDataToSend._parts[5]);

        //revision con Jeremy, error 401, unauthorized
        try {

            const jsonValue = await AsyncStorage.getItem('@userToken');

            if (!jsonValue) {
                setLoading(false);
                setIsLogged(false);
                return;
            }

            const userData = JSON.parse(jsonValue);
            const token = userData.access;
            const response = await fetch(`https://marlin-backend.vercel.app/api/delivery-profiles/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            console.log('Estoy aqui', response);


            if (!response.ok) {
                //Intenta obtener el texto en lugar de JSON para ver si hay un HTML o un mensaje de error
                const errorText = await response.text();
                console.log('Error en registro de repartidor', errorText);
                throw new Error('Error en registro de repartidor');
            } else {
                navigation.navigate('thirdScreen');
                console.log('Producto actualizado con éxito');
                Alert.alert('Solicitud enviada', '¡Tu solicitud está siendo verificada por los administradores!');

            }
        } catch (error) {
            console.error('Error en registro de repartidorbbbb ', error);
        } finally {
            setLoading(false);
        }

    };
    // ------------------------------------------------------------------------

    return {
        handleDeliveryForm,
    };
};

export default useGetDeliveryForm;