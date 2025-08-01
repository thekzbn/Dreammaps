// Authentication functionality
import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { createUserProfile, getUserProfile } from './database.js';

// Global authentication state
let currentUser = null;

// Initialize authentication state listener
export function initAuth() {
    onAuthStateChanged(auth, async (user) => {
        currentUser = user;
        if (user) {
            console.log('User signed in:', user.email);
            await handleUserSignedIn(user);
        } else {
            console.log('User signed out');
            handleUserSignedOut();
        }
    });
}

// Handle user registration
export async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    try {
        showLoading(true);
        
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with display name
        await updateProfile(user, {
            displayName: name
        });
        
        // Create user profile in Firestore
        await createUserProfile(user.uid, {
            name: name,
            email: email,
            createdAt: new Date(),
            onboardingCompleted: false,
            additionalDetailsCompleted: false,
            skillsCompleted: false
        });
        
        showMessage('Account created successfully!', 'success');
        closeAuthModal();
        
    } catch (error) {
        console.error('Registration error:', error);
        showMessage(getErrorMessage(error.code), 'error');
    } finally {
        showLoading(false);
    }
}

// Handle user login
export async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        showLoading(true);
        
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        showMessage('Logged in successfully!', 'success');
        closeAuthModal();
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage(getErrorMessage(error.code), 'error');
    } finally {
        showLoading(false);
    }
}

// Handle user logout
export async function logout() {
    try {
        await signOut(auth);
        showMessage('Logged out successfully!', 'success');
    } catch (error) {
        console.error('Logout error:', error);
        showMessage('Error logging out', 'error');
    }
}

// Handle user signed in
async function handleUserSignedIn(user) {
    try {
        // Get user profile from Firestore
        const userProfile = await getUserProfile(user.uid);
        
        if (userProfile) {
            // Check onboarding status
            if (!userProfile.onboardingCompleted) {
                showOnboardingFlow(userProfile);
            } else {
                showDashboard(userProfile);
            }
        } else {
            // Create new user profile if it doesn't exist
            await createUserProfile(user.uid, {
                name: user.displayName || user.email,
                email: user.email,
                createdAt: new Date(),
                onboardingCompleted: false,
                additionalDetailsCompleted: false,
                skillsCompleted: false
            });
            showOnboardingFlow();
        }
        
        // Show navigation
        document.getElementById('navbar').classList.remove('hidden');
        
    } catch (error) {
        console.error('Error handling user sign in:', error);
        showMessage('Error loading user data', 'error');
    }
}

// Handle user signed out
function handleUserSignedOut() {
    // Hide navigation
    document.getElementById('navbar').classList.add('hidden');
    
    // Show welcome page
    showPage('welcome');
}

// Show onboarding flow
function showOnboardingFlow(userProfile = null) {
    showPage('onboarding');
    
    if (userProfile) {
        if (!userProfile.additionalDetailsCompleted) {
            showOnboardingStep('additional-details');
        } else if (!userProfile.skillsCompleted) {
            showOnboardingStep('skill-selection');
        }
    } else {
        showOnboardingStep('additional-details');
    }
}

// Show dashboard
function showDashboard(userProfile) {
    showPage('dashboard');
    
    // Update user name in dashboard
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && userProfile) {
        userNameElement.textContent = userProfile.name || 'User';
    }
}

// Get current user
export function getCurrentUser() {
    return currentUser;
}

// Get user-friendly error messages
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered. Please use a different email or try logging in.',
        'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection and try again.',
        'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.'
    };
    
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

// Show loading state
function showLoading(isLoading) {
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    });
}

// Show message to user
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Insert message at the top of auth forms
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (!form.classList.contains('hidden')) {
            form.insertBefore(messageElement.cloneNode(true), form.firstChild);
        }
    });
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
    }, 5000);
}

// Make functions available globally
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;