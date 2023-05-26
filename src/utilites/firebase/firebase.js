import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAbowq7LRXFYM1UfUkapEWd3av1J0yMED8",
    authDomain: "oleg-wine.firebaseapp.com",
    projectId: "oleg-wine",
    storageBucket: "oleg-wine.appspot.com",
    messagingSenderId: "1090181033741",
    appId: "1:1090181033741:web:c346180647a2e8d84a8a44",
    measurementId: "G-99JE0TVPQ1"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;