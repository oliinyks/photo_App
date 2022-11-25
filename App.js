import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen'
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
		RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
	})

	if(!fontsLoaded) return null;

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
// });
