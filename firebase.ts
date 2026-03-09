// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwO6KUZvr1wQodDBfWeWIKObvqz8A1X2g",
  authDomain: "smsverfication-ce73d.firebaseapp.com",
  projectId: "smsverfication-ce73d",
  storageBucket: "smsverfication-ce73d.firebasestorage.app",
  messagingSenderId: "1005306614015",
  appId: "1:1005306614015:web:28c5c8499ee5b638d7fcca",
  measurementId: "G-DLLEG4TX4Y",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth };
// const analytics = getAnalytics(app);
