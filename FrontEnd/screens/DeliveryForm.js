import React from 'react';
import { Button, Image, View, Text, Pressable, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
export function DeliveryFormScreen({ navigation }) {
    return (
        <View>
            <Text>Forma de entrega</Text>

            <Pressable onPress={() => navigation.replace('thirdScreen')}>
                <Text>Continuar</Text>
            </Pressable>
        </View>
    )
}