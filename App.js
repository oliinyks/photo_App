import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from './router';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import db from './src/firebase/config';
import './src/firebase/config';

export default function App() {
  const [user, setUser] = useState(null);
  db.auth().onAuthStateChanged(user => setUser(user));

  const [fontsLoaded] = useFonts({
    RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  const routing = useRoute(user);

  if (!fontsLoaded) return null;
  if (!db.apps.length) {
    firebase.initializeApp({});
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
//asasa@sd.sd
//dfgdf@khkj.gng

