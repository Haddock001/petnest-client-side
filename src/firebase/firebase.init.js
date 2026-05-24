// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || import.meta.env.VITE_appId
};

const missingFirebaseConfig = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)

if (missingFirebaseConfig.length > 0) {
    throw new Error(`Missing Firebase environment variables: ${missingFirebaseConfig.join(', ')}. Add them to petnest-client-side/.env.local and restart the dev server.`)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
