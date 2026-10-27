// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg8ITVmBz6hE3kO7x3izzoFnLc4kHEyY8",
  authDomain: "netflixgpt-39502.firebaseapp.com",
  projectId: "netflixgpt-39502",
  storageBucket: "netflixgpt-39502.firebasestorage.app",
  messagingSenderId: "76582459980",
  appId: "1:76582459980:web:30a0175321fdc5373432e9",
  measurementId: "G-MER9ZN8503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();