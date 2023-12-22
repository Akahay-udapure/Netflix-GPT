// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2nz6ApXtmVLtudzsLIxKOMZuYeja4F9U",
  authDomain: "netflix-gpt-66962.firebaseapp.com",
  projectId: "netflix-gpt-66962",
  storageBucket: "netflix-gpt-66962.appspot.com",
  messagingSenderId: "531581429377",
  appId: "1:531581429377:web:d890b8125ddae3095dcf80",
  measurementId: "G-3WMKM2JDTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
