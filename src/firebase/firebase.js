// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAop_GJ6FtIjC9KgsI8RJxBD55wpnBiBLg",
  authDomain: "clicker-21daa.firebaseapp.com",
  databaseURL: "https://clicker-21daa-default-rtdb.firebaseio.com",
  projectId: "clicker-21daa",
  storageBucket: "clicker-21daa.appspot.com",
  messagingSenderId: "449174372264",
  appId: "1:449174372264:web:4695e99f85d306ea04e79d",
  measurementId: "G-GVJ0S8XF8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
