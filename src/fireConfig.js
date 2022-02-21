import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDANNRsk73lRwyWFp7YilIjsunmP3C3IBY",
  authDomain: "firecommerce-b7f90.firebaseapp.com",
  projectId: "firecommerce-b7f90",
  storageBucket: "firecommerce-b7f90.appspot.com",
  messagingSenderId: "1067907937801",
  appId: "1:1067907937801:web:fd564494730eb22fc02ad8",
  measurementId: "G-LXVRCK1BCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
