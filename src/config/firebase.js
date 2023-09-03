// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcfsPRf-4TEB9k0ACKyaDsSaH5z_RpZyk",
  authDomain: "tiktok-e9a35.firebaseapp.com",
  databaseURL: "https://tiktok-e9a35-default-rtdb.firebaseio.com",
  projectId: "tiktok-e9a35",
  storageBucket: "tiktok-e9a35.appspot.com",
  messagingSenderId: "847309485498",
  appId: "1:847309485498:web:8486b8edca7d1d0c36d983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;