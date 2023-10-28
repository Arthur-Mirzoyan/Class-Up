import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB65bV--P0UnmH0suVgcFEp9RYIPPVerJc",
    authDomain: "classup-3afee.firebaseapp.com",
    projectId: "classup-3afee",
    storageBucket: "classup-3afee.appspot.com",
    messagingSenderId: "260726879490",
    appId: "1:260726879490:web:03829de3c71c551193fe1b"
};

initializeApp(FIREBASE_CONFIG);
export const DB = getFirestore();
export const STORAGE = getStorage();