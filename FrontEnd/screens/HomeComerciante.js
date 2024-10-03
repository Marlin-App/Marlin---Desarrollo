 
import { Text, View, Button, Item, FlatList, TextInput, SafeAreaView, SectionList, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
 export function HomeComercianteScreen({ navigation }){

    return (
        <View >
            <Text >Home Comerciante</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
 }