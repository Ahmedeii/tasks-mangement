// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZOPohkYstHWsAoRca3YF_guPlY0d2sbk",
  authDomain: "ahmedstore-8b72d.firebaseapp.com",
  projectId: "ahmedstore-8b72d",
  storageBucket: "ahmedstore-8b72d.appspot.com",
  messagingSenderId: "364199195525",
  appId: "1:364199195525:web:dfb01aed38e9eb48100aec",
  measurementId: "G-1FVCDF11EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth(app);
 export const db = getFirestore(app);