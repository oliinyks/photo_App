import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import './src/firebase/config';
import Main from './src/components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return null;
//   if (!db.apps.length) {
//     firebase.initializeApp({});
//   }

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
//asasa@sd.sd
//dfgdf@khkj.gng

