import { useEffect, useState } from "react";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDecodeJWT from './useDecodeJWT';


export function useCRUDProductos() {

    //funcion para devolver todas las tiendas con sus productos

    const [storesWithProducts, setStoresWithProducts] = useState([]);
    const { decodeJWT, refreshToken, isTokenExpired } = useDecodeJWT();
    const [loading, setLoading] = useState(true);

    const fetchStoresWithProducts = async () => {
        try {
            if (await isTokenExpired()) {
                await refreshToken();
            } else {
                console.log('Token no expirado');
            }
            // Obtén el token almacenado en AsyncStorage
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

            // Fetch para obtener las tiendas del usuario
            const response = await fetch(`https://marlin-backend.vercel.app/api/stores/?user_id=${user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching stores');
            }

            const stores = await response.json();

            // Mapeamos las tiendas para agregar sus productos
            const storesWithProductsPromises = stores.map(async (store) => {
                try {
                    const productsResponse = await fetch(`https://marlin-backend.vercel.app/api/storeItems/?store_id=${store.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!productsResponse.ok) {
                        console.error(`Error fetching products for store ${store.id}`);
                        return { ...store, products: [] }; // Si falla, se asigna un array vacío
                    }

                    const products = await productsResponse.json();
                    return { ...store, products: Array.isArray(products) ? products : [] };

                } catch (error) {
                    console.error(`Error fetching products for store ${store.id}:`, error);
                    return { ...store, products: [] }; // En caso de error, asignar un array vacío
                }
            });

            const storesWithProducts = await Promise.all(storesWithProductsPromises);

            // Establecemos las tiendas con sus productos en el estado
            setStoresWithProducts(storesWithProducts);

        } catch (err) {
            console.error('Error fetching stores with products:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    //funcion para agrergar productos a una tienda

    const addProduct = async (formData) => {

        
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('store_id', formData.store_id);
        formDataToSend.append('item_type', formData.item_type);
        formDataToSend.append('attributes', JSON.stringify(formData.attributes));


        if (formData.pictures && formData.pictures.length > 0) {
            formData.pictures.forEach((image, index) => {
                const perfilFile = {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `${formData.name}_${image.id}.jpg`, // Asegúrate de que el nombre sea único
                };
                formDataToSend.append('pictures', perfilFile);
            });
        }


          try {
              const jsonValue = await AsyncStorage.getItem('@userToken');

              if (!jsonValue) {
                  setLoading(false);
                  setIsLogged(false);
                  return;
              }

              const userData = JSON.parse(jsonValue);
              const token = userData.access;
              const response = await fetch(`https:marlin-backend.vercel.app/api/storeItems/`, {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${token}`
                  },
                  body: formDataToSend
              });


              if (!response.ok) {
                   //Intenta obtener el texto en lugar de JSON para ver si hay un HTML o un mensaje de error
                  const errorText = await response.text();
                  console.log('Error de respuesta:', errorText);
                  throw new Error('Error agregando producto');
              } else {
                  fetchStoresWithProducts();
                  console.log('Producto agregado con éxito');
                  Alert.alert('Producto agregado', '¡Tu producto ha sido agregado con éxito!');
              }
          } catch (error) {
              console.error('Error al crear el producto:', error);
          } finally {
              setLoading(false);
          }
    };




    //funcion para eliminar productos de una tienda

    const deleteProduct = async (id) => {

        const jsonValue = await AsyncStorage.getItem('@userToken');
        if (jsonValue == null) {
            setLoading(false);
            setIsLogged(false);
            return;
        }
        const userData = JSON.parse(jsonValue);
        const token = userData.access;

        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/storeItems/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error de respuesta:', errorData);
                return;
            }
            console.log('Producto eliminado exitosamente');
            fetchStoresWithProducts();
        } catch (err) {
            console.log('Error al eliminar el producto:', err);
        }
    };

    const getProduct = async (id) => {

        const jsonValue = await AsyncStorage.getItem('@userToken');
        if (jsonValue == null) {
            setLoading(false);
            setIsLogged(false);
            return;
        }
        const userData = JSON.parse(jsonValue);
        const token = userData.access;

        try {
            const response = await fetch(`https://marlin-backend.vercel.app/api/storeItems/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error de respuesta:', errorData);
                return;
            }
            const product = await response.json();
            return product;
        } catch (err) {
            console.log('Error al obtener el producto:', err);
        }
    };


    return { deleteProduct, fetchStoresWithProducts, storesWithProducts, addProduct, getProduct };

}