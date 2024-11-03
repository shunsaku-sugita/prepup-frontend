import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa-lOXp4nHSwuKpQ1chILAsbajULEw6rU",
  authDomain: "prepup-7d9e7.firebaseapp.com",
  projectId: "prepup-7d9e7",
  storageBucket: "prepup-7d9e7.appspot.com",
  messagingSenderId: "882555523507",
  appId: "1:882555523507:web:2ca7f05031a532340a7bc6",
  measurementId: "G-HKNVR3PSN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});