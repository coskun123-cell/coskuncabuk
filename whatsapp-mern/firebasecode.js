// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5r-X1FX857lyRl2CO8sWU7zrHNpzPxFU",
  authDomain: "whatsapp1-ec8b8.firebaseapp.com",
  projectId: "whatsapp1-ec8b8",
  storageBucket: "whatsapp1-ec8b8.appspot.com",
  messagingSenderId: "949445787214",
  appId: "1:949445787214:web:86594df5776035bbcb0d1f",
  measurementId: "G-VMG80PT085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);