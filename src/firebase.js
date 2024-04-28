// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfX0N0SYG_iSXC3WQThuLh7Grd44s05g4",
  authDomain: "car-rental-system-5c47c.firebaseapp.com",
  projectId: "car-rental-system-5c47c",
  storageBucket: "car-rental-system-5c47c.appspot.com",
  messagingSenderId: "1010553096422",
  appId: "1:1010553096422:web:b4c3a1ceb93e18c2dfd327",
  measurementId: "G-LXQDX9BVYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;
