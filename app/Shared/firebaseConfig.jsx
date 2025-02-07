// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "project-showcase-3e346.firebaseapp.com",
  projectId: "project-showcase-3e346",
  storageBucket: "project-showcase-3e346.appspot.com",
  messagingSenderId: "414360381452",
  appId: "1:414360381452:web:9b7620109aaf086dc3e629",
  measurementId: "G-0KYX6FSRX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;