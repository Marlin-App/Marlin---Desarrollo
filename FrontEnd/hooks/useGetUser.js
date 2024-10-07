import { useState, useEffect } from 'react';
import useDecodeJWT from './useDecodeJWT';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const useGetUser  = () => {
  const [user, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { decodeJWT } = useDecodeJWT();
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
                setLoading(true);
        
                
                const jsonValue = await AsyncStorage.getItem('@userToken');
                const userData = JSON.parse(jsonValue);
                const token = userData.access;


                if (!jsonValue) {
                    throw new Error('No se encontró el token de usuario');
                }
                
                if (!token) {
                    throw new Error('Token no disponible');
                }

                    const decodedToken = decodeJWT(token);
                    const user_id = decodedToken.payload.userprofile;
                    setFormData({ ...formData, [name]: value });
                const response = await fetch(`https://marlin-backend.vercel.app/api/userProfile/${user_id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedUser)
                });
        
                if (!response.ok) {
                    const errorData = await response.json();  
                    console.log('Error de respuesta:', errorData);
                    throw new Error('Error actualizando el usuario');
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