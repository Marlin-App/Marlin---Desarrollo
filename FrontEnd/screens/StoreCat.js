import * as React from 'react';
import { Text, View, Button, Item, FlatList } from 'react-native';

export function StoreCat({ navigation }) {

    //const StoreCat = [category, setCategory] = React.useState();
    const categories = [];

    const getStoreCat = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/storeTypes/');
            const data = await response.json();
            categories=data;
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    React.useEffect(() => {
        getStoreCat();
    }, []);
    console.log(categories);
    return (
        <View className="p-2 my-2 mt-0 bg-white">
            <Text className="ml-2 mt-2 text-2xl font-Excon_bold text-main-blue">Store Categories</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => <Item title={item.name} />}
                keyExtractor={item => item.id}
            />
            {/* <Button
                onPress={getStoreCat}
                title="Ver categorias"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            /> */}
        </View>

    );
}