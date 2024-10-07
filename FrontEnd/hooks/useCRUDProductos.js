import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDecodeJWT from './useDecodeJWT';


export function useCRUDProductos() {

//funcion para devolver todas las tiendas con sus productos

    const [storesWithProducts, setStoresWithProducts] = useState([]);
    const { decodeJWT } = useDecodeJWT();
    const [loading, setLoading] = useState(true);

    const fetchStoresWithProducts = async () => {
        try {
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
            const user_id = decodedToken.payload.userprofile;

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

    const addProduct = async (id_store) => {

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


    return { deleteProduct, fetchStoresWithProducts, storesWithProducts, addProduct };

}