import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration (safe to expose in frontend)
const firebaseConfig = {
  apiKey: "AIzaSyD29X8CZ5X-Scp1D-OMNBvJGVb7zoh4Wxo",
  authDomain: "vardaan-ai.firebaseapp.com",
  projectId: "vardaan-ai",
  storageBucket: "vardaan-ai.firebasestorage.app",
  messagingSenderId: "337507807240",
  appId: "1:337507807240:web:47020d87a88a13ba7c61bd",
  measurementId: "G-40WH9144E9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;