import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration - Project needs to be properly set up
const firebaseConfig = {
  apiKey: "AIzaSyCFxh6ODdFOSUghlKOQkI8S7bGReC1NYZ8",
  authDomain: "closwork-web.firebaseapp.com",
  projectId: "closwork-web",
  storageBucket: "closwork-web.firebasestorage.app",
  messagingSenderId: "304002514641",
  appId: "1:304002514641:web:b1abe9833ec267aa324ff0",
  measurementId: "G-C6LN3K8GL3"
};

// Initialize Firebase with error handling
let app = null;
let analytics = null;
let db = null;
let auth = null;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    console.log('⚠️ Using localStorage fallback for data storage');
    // Create fallback objects to prevent crashes
    app = null;
    analytics = null;
    db = null;
    auth = null;
  }
} else {
  console.log('⚠️ Not in browser environment, using localStorage fallback');
}

export { app, analytics, db, auth };
