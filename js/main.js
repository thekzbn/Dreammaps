// Main application controller
import { initAuth } from './auth.js';
import { initializeDefaultData } from './database.js';

// Global state
let currentPage = 'welcome';

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DreamMaps app initializing...');
    
    try {
        // Initialize Firebase Auth
        initAuth();
        
        // Initialize default data
        await initializeDefaultData();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 1500);
        
        console.log('DreamMaps app initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        // Hide loading screen even if there's an error
        document.getElementById('loading-screen').classList.add('hidden');
    }
});

// Page navigation
export function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
        
        // Update navigation active state
        updateNavigationState(pageId);
        
        // Load page-specific data
        loadPageData(pageId);
    }
}

// Update navigation active state
function updateNavigationState(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(activePageId)) {
            link.classList.add('active');
        }
    });
}

// Load page-specific data
async function loadPageData(pageId) {
    switch (pageId) {
        case 'dashboard':
            if (window.loadDashboardData) {
                await window.loadDashboardData();
            }
            break;
        case 'skills':
            if (window.loadSkillsData) {
                await window.loadSkillsData();
            }
            break;
        case 'profile':
            if (window.loadProfileData) {
                await window.loadProfileData();
            }
            break;
    }
}

// Authentication modal functions
export function showAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    modal.classList.remove('hidden');
    
    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

export function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    
    // Clear form fields
    const forms = modal.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Clear any error messages
    const messages = modal.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

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
    
    // Clear any error messages
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Onboarding functions
export function showOnboardingStep(stepId) {
    // Hide all onboarding steps
    const steps = document.querySelectorAll('.onboarding-step');
    steps.forEach(step => step.classList.add('hidden'));
    
    // Show selected step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    }
}

// Utility functions
export function formatDate(date) {
    if (!date) return '';
    
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function formatTime(date) {
    if (!date) return '';
    
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function getTimeAgo(date) {
    if (!date) return '';
    
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diffInMs = now - d;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) {
        return 'Just now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
        return formatDate(d);
    }
}

// Show notification
export function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">&times;</button>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }
            
            .notification-info { background: #3b82f6; }
            .notification-success { background: #10b981; }
            .notification-warning { background: #f59e0b; }
            .notification-error { background: #ef4444; }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0.8;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// Modal click outside to close
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const visibleModals = document.querySelectorAll('.modal:not(.hidden)');
        visibleModals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});

// Make functions available globally
window.showPage = showPage;
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthMode = switchAuthMode;
window.showOnboardingStep = showOnboardingStep;
window.showNotification = showNotification;