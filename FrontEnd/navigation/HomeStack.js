// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';

import { ItemPage } from '../screens/Item';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen({ navigation, route }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ data: 'dad' }} // Puedes pasar cualquier dato inicial aquí
        options={{ headerShown: false }}
      />

      <HomeStack.Screen 
        name="Item" 
        component={ItemPage}
        options={{ headerShown: true,
         headerTitle: 'Regresar',
         }} 
      />

    </HomeStack.Navigator>
  );
}
