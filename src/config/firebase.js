import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIDVqvX-66uVt51OpRsLRP3-S6aH25cig",
  authDomain: "meditrack-12e58.firebaseapp.com",
  projectId: "meditrack-12e58",
  storageBucket: "meditrack-12e58.appspot.com",
  messagingSenderId: "194228169635",
  appId: "1:194228169635:web:9a132575a46f67d202c816",
  measurementId: "G-E340RN88M4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
