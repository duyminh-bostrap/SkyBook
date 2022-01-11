// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxUssVf9PVMd0YvXMeHiCkdVjTyFxrtdY",
  authDomain: "graphql-image.firebaseapp.com",
  projectId: "graphql-image",
  storageBucket: "graphql-image.appspot.com",
  messagingSenderId: "656569939837",
  appId: "1:656569939837:web:40c378b47bfd50e4f1be14",
  measurementId: "G-5STPQS0GW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);