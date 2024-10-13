import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import useDecodeJWT from './useDecodeJWT';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const useGetUser  = () => {
  const [user, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { decodeJWT, getToken, isTokenExpired, refreshToken } = useDecodeJWT();
    const [isLogged, setIsLogged] = useState(true);

   
       
        const fetchData = async () => {
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
                const response = await fetch(`https://marlin-backend.vercel.app/api/userProfile/${user_id}`);
                const json = await response.json();
                setIsLogged(true);
                setData(json);
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        const updateUser = async (updatedUser) => {
            try {
               
                if (await isTokenExpired()) {
                    await refreshToken();
                }

                setLoading(true);
        
               const token = await getToken();
        
                if (!token) {
                    throw new Error('No se encontró el token de usuario');
                }
        
                if (!token) {
                    throw new Error('Token no disponible');
                }
        
                const decodedToken = decodeJWT(token.access);
                const user_id = decodedToken.payload.userprofile;
        
                const formData = new FormData();
                
               
                if (updatedUser.picture) {
                    formData.append('picture', {
                        uri: updatedUser.picture,  
                        type: 'image/jpeg',      
                        name: 'profile.jpg',     
                    });
                }
        
              
                for (const key in updatedUser) {
                    if (key !== 'picture') { 
                        formData.append(key, updatedUser[key]);
                    }
                }
                
                

                const response = await fetch(`https://marlin-backend.vercel.app/api/userProfile/${user_id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token.access}`,
                    },
                    body: formData, 
                });

                
        
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Error de respuesta:', errorData);
                    throw new Error('Error actualizando el usuario');
                }else {
                    Alert.alert('Usuario actualizado', '¡Tu perfil ha sido actualizado con éxito!');
                }
        
                const data = await response.json();
                setData(data);
        
            } catch (err) {
                setError(err);
                console.log(err.message);
        
            } finally {
                setLoading(false);
            }
        };
        
        
        



  return { user, loading, isLogged, setIsLogged, fetchData, updateUser };
};

export default useGetUser; 