// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq_LP8v2CwYUch07pdRRWS9e7GO6WlFRE",
  authDomain: "cozerastore.firebaseapp.com",
  projectId: "cozerastore",
  storageBucket: "cozerastore.appspot.com",
  messagingSenderId: "586261003934",
  appId: "1:586261003934:web:5e56d2330cf730d4bf458f",
  measurementId: "G-6JL93CBN1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }