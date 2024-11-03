import { Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDecodeJWT from './useDecodeJWT';

const useGetDeliveryForm = (navigation) => {

    const [storesWithProducts, setStoresWithProducts] = useState([]);
    const { decodeJWT, refreshToken, isTokenExpired } = useDecodeJWT();
    const [loading, setLoading] = useState(true);

    const handleDeliveryForm = async (deliveryForm) => {
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

        console.log("usuario", user_id);

        const formDataToSend = new FormData();
        formDataToSend.append("user_id", user_id);
        formDataToSend.append("brand", deliveryForm.brand);
        formDataToSend.append("model", deliveryForm.model);
        formDataToSend.append("plate", deliveryForm.plate);
        formDataToSend.append("vehicle", deliveryForm.vehicle);

        if (deliveryForm.pictures && deliveryForm.pictures.length > 0) {
            deliveryForm.pictures.forEach((image, index) => {
                const perfilFile = {
                    uri: image.uri,
                    type: "image/jpeg",
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

        //revision con Jeremy, error 401, unauthorized

        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/delivery-profiles/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });


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
            console.error('Error en registro de repartidor ', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleDeliveryForm,
    };
};

export default useGetDeliveryForm;
