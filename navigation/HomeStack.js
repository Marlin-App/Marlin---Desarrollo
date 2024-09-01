// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import { DetailsScreen } from '../screens/Details';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ data: 'dad' }} // Puedes pasar cualquier dato inicial aquí
      />
      <HomeStack.Screen 
        name="Details" 
        component={DetailsScreen} 
      />
    </HomeStack.Navigator>
  );
}
