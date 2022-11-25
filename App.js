import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from './router';

export default function App() {
  const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return <NavigationContainer>{routing}</NavigationContainer>;
}
