import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkzYrSxDXVvvVFSoKvus6nUdDTJDsFEKw",
  authDomain: "website-e889d.firebaseapp.com",
  projectId: "website-e889d",
  storageBucket: "website-e889d.firebasestorage.app",
  messagingSenderId: "862348849039",
  appId: "1:862348849039:web:e1ae845c9bf951ca77a5fa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
