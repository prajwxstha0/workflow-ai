import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZN8Znzdp1BzZ2jFmu9raRjYPa5lsdy04",
  authDomain: "mobpro-22989f1f.firebaseapp.com",
  projectId: "mobpro-22989f1f",
  storageBucket: "mobpro-22989f1f.firebasestorage.app",
  messagingSenderId: "450498471626",
  appId: "1:450498471626:web:42c3cc34e48bd878ac3633",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;
