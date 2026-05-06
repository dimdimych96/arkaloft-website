// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbJFlKrzVJP5kMVbM6QUFhbgdt1AfWVhw",
  authDomain: "arka-loft-a2a7b.firebaseapp.com",
  projectId: "arka-loft-a2a7b",
  storageBucket: "arka-loft-a2a7b.firebasestorage.app",
  messagingSenderId: "952982602048",
  appId: "1:952982602048:web:2f71d1d731164f6c11baa5",
  measurementId: "G-J5D3B0551R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);