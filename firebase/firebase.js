// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCf-JqA88JIZ3z-HYhWsbuZOyNtFXHq-XE",
    authDomain: "trendtalk-6ab14.firebaseapp.com",
    projectId: "trendtalk-6ab14",
    storageBucket: "trendtalk-6ab14.appspot.com",
    messagingSenderId: "970267155300",
    appId: "1:970267155300:web:f2e3046cb6a573bc47b871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);