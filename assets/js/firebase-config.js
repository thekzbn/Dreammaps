// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC_Uto15s4BKu8TvYogB6IJzqnx3rLl0IQ",
    authDomain: "dreammaps-6800c.firebaseapp.com",
    projectId: "dreammaps-6800c",
    storageBucket: "dreammaps-6800c.firebasestorage.app",
    messagingSenderId: "618647613231",
    appId: "1:618647613231:web:abcd0e202ab962fa61bbda"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Export the app instance
export default app;

// Development mode detection
export const isDevelopment = window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1' || 
                             window.location.hostname === '';

// Console logging for development
if (isDevelopment) {
    console.log('🔥 Firebase initialized in development mode');
    console.log('📱 App:', app);
    console.log('🔐 Auth:', auth);
    console.log('🗄️ Firestore:', db);
}

// Firebase connection status
let isFirebaseConnected = false;

// Test Firebase connection
export async function testFirebaseConnection() {
    try {
        // Test Firestore connection
        await db._delegate._databaseId;
        isFirebaseConnected = true;
        
        if (isDevelopment) {
            console.log('✅ Firebase connection successful');
        }
        
        return true;
    } catch (error) {
        isFirebaseConnected = false;
        
        if (isDevelopment) {
            console.error('❌ Firebase connection failed:', error);
        }
        
        return false;
    }
}

// Get Firebase connection status
export function getFirebaseConnectionStatus() {
    return isFirebaseConnected;
}

// Firebase error handler
export function handleFirebaseError(error) {
    const errorMessages = {
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password should be at least 6 characters long.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'permission-denied': 'You do not have permission to perform this action.',
        'unavailable': 'Service is currently unavailable. Please try again later.',
        'not-found': 'The requested resource was not found.',
        'already-exists': 'The resource already exists.',
        'resource-exhausted': 'Resource quota exceeded. Please try again later.',
        'failed-precondition': 'Operation failed due to a failed precondition.',
        'aborted': 'Operation was aborted. Please try again.',
        'out-of-range': 'Operation was attempted past the valid range.',
        'unimplemented': 'Operation is not implemented or supported.',
        'internal': 'Internal server error. Please try again later.',
        'data-loss': 'Unrecoverable data loss or corruption.',
        'unauthenticated': 'Please sign in to continue.'
    };

    const userFriendlyMessage = errorMessages[error.code] || 
                               errorMessages[error.message] || 
                               'An unexpected error occurred. Please try again.';

    if (isDevelopment) {
        console.error('🚨 Firebase Error:', {
            code: error.code,
            message: error.message,
            userMessage: userFriendlyMessage,
            stack: error.stack
        });
    }

    return {
        code: error.code,
        message: error.message,
        userMessage: userFriendlyMessage
    };
}

// Initialize Firebase connection on module load
testFirebaseConnection();
