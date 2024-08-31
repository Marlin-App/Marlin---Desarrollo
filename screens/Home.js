import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useEffect } from 'react';

export function HomeScreen({ navigation }) {
   

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,

            headerSearchBarOptions: {
                headerShown: true,
                placeholder: 'Buscar',
                styles: {
                    backgroundColor: '#0038A2',
                    color: 'white',
                    height: 50,
                    borderRadius: 10,
                    fontSize: 20,
                    width: 300,
                    margin: 10,
                    padding: 10,
                },
            },
            headerSearchBarStyle: {
                backgroundColor: '#0038A2',
                color: 'white',
                height: 50,
                borderRadius: 10, 
                fontSize: 20,
                width: 300,
                margin: 10,
                padding: 10,
            },
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <View className="" >
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Home Screen</Text>
                <Button
                    title="Go to Deta"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
           
        </View>
    );
}
