import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCnrPNXDHmjKgxQKI1gn0UB-Eor6nutfJQ",
	authDomain: "photo-23ace.firebaseapp.com",
	projectId: "photo-23ace",
	storageBucket: "photo-23ace.appspot.com",
	messagingSenderId: "353247941",
	appId: "1:353247941:web:bd39cd6ba59227fa9b86ac"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
