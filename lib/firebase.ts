import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArMcN_HLSJJ5IMLlP4P5C9CxG8akK5SSE",
  authDomain: "afasdfsd-bd68e.firebaseapp.com",
  projectId: "afasdfsd-bd68e",
  storageBucket: "afasdfsd-bd68e.firebasestorage.app",
  messagingSenderId: "389482303675",
  appId: "1:389482303675:web:daedcacb2053492dc5d99e",
  measurementId: "G-4Q0TZYYFJB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
