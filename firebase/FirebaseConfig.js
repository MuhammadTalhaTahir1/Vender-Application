// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-v561BF12N8bCsbUiBduVqMPjkxfF8TU",
  authDomain: "firstproject-19bfb.firebaseapp.com",
  projectId: "firstproject-19bfb",
  storageBucket: "firstproject-19bfb.appspot.com",
  messagingSenderId: "668205846045",
  appId: "1:668205846045:web:9152881ab517ba42e9c0f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
