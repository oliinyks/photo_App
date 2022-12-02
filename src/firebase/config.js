import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCTRgbvWLMFLdXShmHLdcXehsujITU8LEM',
  authDomain: 'photo-app-79419.firebaseapp.com',
  projectId: 'photo-app-79419',
  storageBucket: 'photo-app-79419.appspot.com',
  messagingSenderId: '919388901811',
  appId: '1:919388901811:web:4fec419434e5fd5eaebbc6',
};

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const storage = getStorage(app);
