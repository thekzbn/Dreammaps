// Main application controller
import { initAuth, setupFormValidation } from './auth.js';
import { initializeDefaultData } from './database.js';
import { isDevelopment } from './firebase-config.js';

// Global state
let currentPage = 'welcome';
let notificationTimeout = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    if (isDevelopment) {
        console.log('🚀 DreamMaps app initializing...');
    }
    
    try {
        // Initialize Firebase Auth
        initAuth();
        
        // Initialize default data
        await initializeDefaultData();
        
        // Setup form validation
        setupFormValidation();
        
        // Setup global event listeners
        setupGlobalEventListeners();
        
        // Hide loading screen
        setTimeout(() => {
            hideLoadingScreen();
        }, 1500);
        
        if (isDevelopment) {
            console.log('✅ DreamMaps app initialized successfully');
        }
        
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        showNotification('Failed to initialize application. Please refresh the page.', 'error');
        hideLoadingScreen();
    }
});

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

// Page navigation
export function showPage(pageId) {
    if (isDevelopment) {
        console.log('📄 Navigating to page:', pageId);
    }
    
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
        
        // Update page title
        updatePageTitle(pageId);
    } else {
        console.error('Page not found:', pageId);
        showNotification('Page not found.', 'error');
    }
}

// Update navigation active state
function updateNavigationState(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Load page-specific data
async function loadPageData(pageId) {
    try {
        switch (pageId) {
            case 'dashboard':
                const { loadDashboardData } = await import('./dashboard.js');
                await loadDashboardData();
                break;
            case 'courses':
                const { loadCoursesData } = await import('./courses.js');
                await loadCoursesData();
                break;
            case 'profile':
                const { loadProfileData } = await import('./profile.js');
                await loadProfileData();
                break;
            case 'onboarding':
                const { initializeOnboarding } = await import('./onboarding.js');
                await initializeOnboarding();
                break;
        }
    } catch (error) {
        console.error('Error loading page data:', error);
        showNotification('Error loading page data. Please try again.', 'error');
    }
}

// Update page title
function updatePageTitle(pageId) {
    const titles = {
        welcome: 'DreamMaps - Learning Management System',
        dashboard: 'Dashboard - DreamMaps',
        courses: 'Available Courses - DreamMaps',
        profile: 'Profile - DreamMaps',
        onboarding: 'Getting Started - DreamMaps'
    };
    
    document.title = titles[pageId] || 'DreamMaps';
}

// Notification system
export function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    
    if (!notification || !messageElement) {
        console.warn('Notification elements not found');
        return;
    }
    
    // Clear existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    // Set message and type
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    // Auto-hide notification
    if (duration > 0) {
        notificationTimeout = setTimeout(() => {
            hideNotification();
        }, duration);
    }
    
    if (isDevelopment) {
        console.log(`📢 Notification [${type}]:`, message);
    }
}

export function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('hidden');
    }
    
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
}

// Mobile navigation toggle
export function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Dark mode toggle
export function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        localStorage.setItem('darkMode', 'false');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'true');
    }
    
    showNotification(`${isDarkMode ? 'Light' : 'Dark'} mode enabled`, 'success', 2000);
}

// Initialize dark mode from localStorage
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Global event listeners
function setupGlobalEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        // Escape key to close modals
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal:not(.hidden)');
            openModals.forEach(modal => {
                modal.classList.add('hidden');
            });
        }
        
        // Ctrl/Cmd + K for quick search (future feature)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            // Future: Open quick search modal
            showNotification('Quick search coming soon!', 'info', 2000);
        }
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
        showNotification('Connection restored', 'success', 3000);
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are offline. Some features may not work.', 'warning', 5000);
    });
    
    // Initialize dark mode
    initializeDarkMode();
}

// Utility functions
export function formatDate(date, options = {}) {
    if (!date) return '';
    
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    
    try {
        // Handle Firestore timestamp
        if (date.toDate && typeof date.toDate === 'function') {
            return date.toDate().toLocaleDateString('en-US', formatOptions);
        }
        
        // Handle regular Date object
        if (date instanceof Date) {
            return date.toLocaleDateString('en-US', formatOptions);
        }
        
        // Handle date string
        return new Date(date).toLocaleDateString('en-US', formatOptions);
    } catch (error) {
        console.warn('Error formatting date:', error);
        return '';
    }
}

export function getTimeAgo(date) {
    if (!date) return '';
    
    try {
        let dateObj;
        
        // Handle Firestore timestamp
        if (date.toDate && typeof date.toDate === 'function') {
            dateObj = date.toDate();
        } else if (date instanceof Date) {
            dateObj = date;
        } else {
            dateObj = new Date(date);
        }
        
        const now = new Date();
        const diffInSeconds = Math.floor((now - dateObj) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
    } catch (error) {
        console.warn('Error calculating time ago:', error);
        return '';
    }
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Loading state helpers
export function setLoading(element, loading = true) {
    if (!element) return;
    
    if (loading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Form helpers
export function resetForm(formElement) {
    if (!formElement) return;
    
    formElement.reset();
    
    // Remove validation classes
    const formGroups = formElement.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

export function validateFormField(field, validator, errorMessage) {
    const formGroup = field.closest('.form-group');
    const isValid = validator(field.value);
    
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        
        // Show error message
        let errorElement = formGroup.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        
        return false;
    }
}

// Local storage helpers
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
        return false;
    }
}

export function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.warn('Failed to load from localStorage:', error);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('Failed to remove from localStorage:', error);
        return false;
    }
}

// Performance monitoring
export function measurePerformance(name, fn) {
    return async function(...args) {
        const start = performance.now();
        const result = await fn.apply(this, args);
        const end = performance.now();
        
        if (isDevelopment) {
            console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
        }
        
        return result;
    };
}

// Error boundary
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('An unexpected error occurred. Please try again.', 'error');
});

// Make functions globally available
window.showPage = showPage;
window.showNotification = showNotification;
window.hideNotification = hideNotification;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleDarkMode = toggleDarkMode;

// Export current page getter
export function getCurrentPage() {
    return currentPage;
}