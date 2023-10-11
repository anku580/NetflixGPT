// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz0LHxazISkYsJIlZ6ruCOnSDPWEyC5-U",
  authDomain: "netflixgpt-1f5c3.firebaseapp.com",
  projectId: "netflixgpt-1f5c3",
  storageBucket: "netflixgpt-1f5c3.appspot.com",
  messagingSenderId: "688943942426",
  appId: "1:688943942426:web:1c987d5e1e7859abf73aa3",
  measurementId: "G-K2Q0ZL4TLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
