import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgucHlCI3a22WTHW499LiBIne8UDebh5k",
  authDomain: "fitness-tracker-b31bb.firebaseapp.com",
  projectId: "fitness-tracker-b31bb",
  storageBucket: "fitness-tracker-b31bb.appspot.com",
  messagingSenderId: "1043527030850",
  appId: "1:1043527030850:web:4ae5c0b7eabbad58ff35db",
  measurementId: "G-D2JCH5WY1W"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)