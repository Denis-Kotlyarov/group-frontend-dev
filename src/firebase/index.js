// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwCG3polsWg8UK_qGpNh3P2zywdvMJm1Q",
  authDomain: "frontend-group-marketplace.firebaseapp.com",
  projectId: "frontend-group-marketplace",
  storageBucket: "frontend-group-marketplace.appspot.com",
  messagingSenderId: "103626258749",
  appId: "1:103626258749:web:14d9e813b451f748c52d54",
  measurementId: "G-5QT0VKQK30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app, 
  analytics, 
  db,
  auth
}