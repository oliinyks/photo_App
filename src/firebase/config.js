import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTRgbvWLMFLdXShmHLdcXehsujITU8LEM',
  authDomain: 'photo-app-79419.firebaseapp.com',
  projectId: 'photo-app-79419',
  storageBucket: 'photo-app-79419.appspot.com',
  messagingSenderId: '919388901811',
  appId: '1:919388901811:web:4fec419434e5fd5eaebbc6',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
