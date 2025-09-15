// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config - Uses environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Log environment variables first
console.log('Environment Variables Debug:', {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? 'LOADED' : 'MISSING',
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'LOADED' : 'MISSING',
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'LOADED' : 'MISSING',
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'LOADED' : 'MISSING',
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'LOADED' : 'MISSING',
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ? 'LOADED' : 'MISSING'
});

// Debug: Log Firebase config values
console.log('Firebase Config Debug:', {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'MISSING',
  authDomain: firebaseConfig.authDomain || 'MISSING',
  projectId: firebaseConfig.projectId || 'MISSING',
  storageBucket: firebaseConfig.storageBucket || 'MISSING',
  messagingSenderId: firebaseConfig.messagingSenderId || 'MISSING',
  appId: firebaseConfig.appId ? `${firebaseConfig.appId.substring(0, 20)}...` : 'MISSING'
});

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Please check your .env file and ensure all Firebase variables are set.');
  throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
}

// Check if any config values are undefined
const undefinedKeys = Object.keys(firebaseConfig).filter(key => firebaseConfig[key] === undefined);
if (undefinedKeys.length > 0) {
  console.error('Undefined Firebase config values:', undefinedKeys);
  throw new Error(`Undefined Firebase config values: ${undefinedKeys.join(', ')}`);
}

// Initialize Firebase
console.log('Initializing Firebase app...');
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized successfully');

// Initialize Firebase Authentication and get a reference to the service
console.log('Initializing Firebase Auth...');
export const auth = getAuth(app);
console.log('Firebase Auth initialized successfully');
export default app;
