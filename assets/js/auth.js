// Authentication module
import { auth, handleFirebaseError, isDevelopment } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

import { createUserProfile, getUserProfile } from './database.js';
import { showNotification, showPage } from './main.js';

// Current user state
let currentUser = null;
let authInitialized = false;

// Authentication state change listener
export function initAuth() {
    if (isDevelopment) {
        console.log('🔐 Initializing authentication...');
    }

    onAuthStateChanged(auth, async (user) => {
        currentUser = user;
        
        if (user) {
            if (isDevelopment) {
                console.log('👤 User signed in:', {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified
                });
            }
            
            await handleUserSignedIn(user);
        } else {
            if (isDevelopment) {
                console.log('👤 User signed out');
            }
            
            handleUserSignedOut();
        }
        
        if (!authInitialized) {
            authInitialized = true;
            if (isDevelopment) {
                console.log('✅ Authentication initialized');
            }
        }
    });
}

// Handle user signed in
async function handleUserSignedIn(user) {
    try {
        // Hide auth modal if open
        closeAuthModal();
        
        // Check if user profile exists in Firestore
        const userProfile = await getUserProfile(user.uid);
        
        if (userProfile && userProfile.onboardingCompleted) {
            // User has completed onboarding, show dashboard
            showAuthenticatedApp(user);
            showPage('dashboard');
        } else {
            // New user or incomplete onboarding, show onboarding
            showAuthenticatedApp(user);
            showPage('onboarding');
        }
        
        // Update last login time
        await updateLastLogin(user.uid);
        
    } catch (error) {
        console.error('Error handling user sign in:', error);
        showNotification('Error loading user profile. Please try again.', 'error');
    }
}

// Handle user signed out
function handleUserSignedOut() {
    // Hide navbar and show welcome page
    document.getElementById('navbar').classList.add('hidden');
    showPage('welcome');
    
    // Clear any cached user data
    clearUserCache();
}

// Show authenticated app interface
function showAuthenticatedApp(user) {
    // Show navbar
    document.getElementById('navbar').classList.remove('hidden');
    
    // Update user name in navbar and pages
    updateUserDisplayName(user.displayName || user.email);
}

// Update user display name in UI
function updateUserDisplayName(name) {
    const userNameElements = document.querySelectorAll('#user-name, #profile-name');
    userNameElements.forEach(element => {
        if (element) {
            element.textContent = name;
        }
    });
}

// Login handler
export async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    // Validate inputs
    if (!email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    try {
        if (isDevelopment) {
            console.log('🔐 Attempting login for:', email);
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (isDevelopment) {
            console.log('✅ Login successful:', userCredential.user.uid);
        }
        
        showNotification('Welcome back! Signed in successfully.', 'success');
        
    } catch (error) {
        const firebaseError = handleFirebaseError(error);
        showNotification(firebaseError.userMessage, 'error');
        
        // Clear password field on error
        document.getElementById('login-password').value = '';
        
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// Register handler
export async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    try {
        if (isDevelopment) {
            console.log('🔐 Attempting registration for:', email);
        }
        
        // Create user account
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
            onboardingCompleted: false
        });
        
        if (isDevelopment) {
            console.log('✅ Registration successful:', user.uid);
        }
        
        showNotification('Account created successfully! Welcome to DreamMaps.', 'success');
        
        // Send email verification
        try {
            await sendEmailVerification(user);
            showNotification('Verification email sent. Please check your inbox.', 'info');
        } catch (emailError) {
            console.warn('Failed to send verification email:', emailError);
        }
        
    } catch (error) {
        const firebaseError = handleFirebaseError(error);
        showNotification(firebaseError.userMessage, 'error');
        
        // Clear password fields on error
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm-password').value = '';
        
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// Logout handler
export async function logout() {
    try {
        if (isDevelopment) {
            console.log('🔐 Signing out user...');
        }
        
        await signOut(auth);
        showNotification('Signed out successfully.', 'success');
        
        if (isDevelopment) {
            console.log('✅ Sign out successful');
        }
        
    } catch (error) {
        const firebaseError = handleFirebaseError(error);
        showNotification(firebaseError.userMessage, 'error');
    }
}

// Password reset
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        showNotification('Password reset email sent. Please check your inbox.', 'success');
        return true;
    } catch (error) {
        const firebaseError = handleFirebaseError(error);
        showNotification(firebaseError.userMessage, 'error');
        return false;
    }
}

// Get current user
export function getCurrentUser() {
    return currentUser;
}

// Check if user is authenticated
export function isAuthenticated() {
    return currentUser !== null;
}

// Check if auth is initialized
export function isAuthInitialized() {
    return authInitialized;
}

// Update last login time
async function updateLastLogin(userId) {
    try {
        const { updateUserProfile } = await import('./database.js');
        await updateUserProfile(userId, {
            lastLogin: new Date()
        });
    } catch (error) {
        console.warn('Failed to update last login:', error);
    }
}

// Clear user cache
function clearUserCache() {
    // Clear any cached user data
    currentUser = null;
    
    // Reset forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
}

// Set button loading state
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Show auth modal
export function showAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
    
    modal.classList.remove('hidden');
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input:not([type="hidden"])');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

// Close auth modal
export function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    
    // Reset forms
    const forms = modal.querySelectorAll('form');
    forms.forEach(form => {
        form.reset();
        // Remove any error states
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
        });
    });
}

// Switch auth mode
export function switchAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
    
    // Focus on first input
    setTimeout(() => {
        const activeForm = mode === 'login' ? loginForm : registerForm;
        const firstInput = activeForm.querySelector('input:not([type="hidden"])');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

// Form validation helpers
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}

// Real-time form validation
export function setupFormValidation() {
    // Login form validation
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
    if (loginEmail) {
        loginEmail.addEventListener('blur', () => {
            const formGroup = loginEmail.closest('.form-group');
            if (loginEmail.value && !validateEmail(loginEmail.value)) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
            } else if (loginEmail.value) {
                formGroup.classList.add('success');
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.remove('error', 'success');
            }
        });
    }
    
    // Register form validation
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm-password');
    
    if (registerEmail) {
        registerEmail.addEventListener('blur', () => {
            const formGroup = registerEmail.closest('.form-group');
            if (registerEmail.value && !validateEmail(registerEmail.value)) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
            } else if (registerEmail.value) {
                formGroup.classList.add('success');
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.remove('error', 'success');
            }
        });
    }
    
    if (registerPassword) {
        registerPassword.addEventListener('input', () => {
            const formGroup = registerPassword.closest('.form-group');
            if (registerPassword.value && !validatePassword(registerPassword.value)) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
            } else if (registerPassword.value) {
                formGroup.classList.add('success');
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.remove('error', 'success');
            }
        });
    }
    
    if (confirmPassword) {
        confirmPassword.addEventListener('blur', () => {
            const formGroup = confirmPassword.closest('.form-group');
            if (confirmPassword.value && confirmPassword.value !== registerPassword.value) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
            } else if (confirmPassword.value) {
                formGroup.classList.add('success');
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.remove('error', 'success');
            }
        });
    }
}

// Make functions globally available
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthMode = switchAuthMode;