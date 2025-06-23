// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6SnohgJAwQJQbuFgScngCEctLzAD65SQ",
  authDomain: "auth-chat-2025.firebaseapp.com",
  databaseURL: "https://auth-chat-2025-default-rtdb.firebaseio.com",
  projectId: "auth-chat-2025",
  storageBucket: "auth-chat-2025.firebasestorage.app",
  messagingSenderId: "1049831232289",
  appId: "1:1049831232289:web:21913afb13c726c84da460",
  measurementId: "G-YWVHSP5Q9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
