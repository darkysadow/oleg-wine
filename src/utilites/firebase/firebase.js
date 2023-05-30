import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAbowq7LRXFYM1UfUkapEWd3av1J0yMED8",
    authDomain: "oleg-wine.firebaseapp.com",
    projectId: "oleg-wine",
    storageBucket: "oleg-wine.appspot.com",
    messagingSenderId: "1090181033741",
    appId: "1:1090181033741:web:c346180647a2e8d84a8a44",
    measurementId: "G-99JE0TVPQ1"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;