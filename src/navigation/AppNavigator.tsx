import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import ListScreen from '../screens/ListScreen';
import FormScreen from '../screens/FormScreen';
import { TouchableOpacity ,Text} from 'react-native';

export type RootStackParamList = {
  Splash: undefined;
  List: undefined;
  Form: { itemId?: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(navigation:any) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen 
          name="List"
          component={ListScreen}
          options={{
            title: 'List Data', 
            headerStyle: { backgroundColor: '#007bff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Form"
          component={FormScreen}
          
          options={{
            title: 'Task',
            headerStyle: { backgroundColor: '#007bff' },
            headerTintColor: '#fff',
            headerShown: true,
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}