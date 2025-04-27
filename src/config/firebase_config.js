// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATvE_nQEwE5wwlXnaXCdXZnUJniL06qdU",
  authDomain: "ecommerce-dda77.firebaseapp.com",
  projectId: "ecommerce-dda77",
  storageBucket: "ecommerce-dda77.firebasestorage.app",
  messagingSenderId: "981968553967",
  appId: "1:981968553967:web:99ccacb3f3a010c426181a",
  measurementId: "G-NH9WS5YH6Y"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);