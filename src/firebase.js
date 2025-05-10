// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyNo4hhvTjQ1uu4Ol01X553kaHHrfISYE", 
  authDomain: "student-point-37a51.firebaseapp.com",
  projectId: "student-point-37a51",
  storageBucket: "student-point-37a51.firebasestorage.app",
  messagingSenderId: "770426509784",
  appId: "1:770426509784:web:3a4fe13ee6df0238147aad",
  databaseURL:"https://student-point-37a51-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);