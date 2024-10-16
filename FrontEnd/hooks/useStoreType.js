import { useState, useEffect} from 'react';

const useStoreType = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [allStores, setAllStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStoreCat = async () => {
        try {
            const response1 = await fetch('https://marlin-backend.vercel.app/api/storeTypes/');
            const data1 = await response1.json();
            const formattedData1 = [
                {
                    title: 'Categorías',
                    data: data1.map(item => ({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        image_selected: item.image_selected,
                    }))
                }
            ];
            formattedData1[0].data.unshift({id: 0, name: 'Todas', image:"http://res.cloudinary.com/dgpqi6ukf/image/upload/v1728176023/categories/Zapateria_image.webp", image_selected:"https://res.cloudinary.com/dgpqi6ukf/image/upload/v1728176024/categories/Zapateria_selected_image.webp"});
            setAllCategories(formattedData1);

            const response2 = await fetch("https://marlin-backend.vercel.app/api/stores/");
            const data2 = await response2.json();
            setAllStores(data2);
            setLoading(false);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    useEffect(() => {
        getStoreCat();
    }, []);
    return {allCategories, allStores, loading};
};

export default useStoreType;
