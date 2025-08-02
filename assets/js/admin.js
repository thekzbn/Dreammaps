// Admin panel functionality
import { signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth, db, isDevelopment } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    where
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { showNotification } from './main.js';

// Admin credentials
const ADMIN_EMAIL = 'thekzbn.work@gmail.com';

// Current admin state
let currentAdminPage = 'courses';
let adminCourses = [];
let adminUsers = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    if (isDevelopment) {
        console.log('🔐 Admin panel initializing...');
    }
    
    // Hide loading screen after delay
    setTimeout(() => {
        hideLoadingScreen();
    }, 1000);
    
    // Check if already logged in as admin
    auth.onAuthStateChanged((user) => {
        if (user && user.email === ADMIN_EMAIL) {
            showAdminDashboard();
        } else {
            showAdminLogin();
        }
    });
});

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

// Show admin login page
function showAdminLogin() {
    document.getElementById('admin-login-page').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
}

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('admin-login-page').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    
    // Load initial data
    loadAdminData();
}

// Handle admin login
export async function handleAdminLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    if (email !== ADMIN_EMAIL) {
        showNotification('Invalid admin credentials', 'error');
        return;
    }
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        showNotification('Welcome, Administrator!', 'success');
        showAdminDashboard();
    } catch (error) {
        console.error('Admin login error:', error);
        showNotification('Invalid admin credentials', 'error');
    }
}

// Admin logout
export async function adminLogout() {
    try {
        await signOut(auth);
        showNotification('Logged out successfully', 'success');
        showAdminLogin();
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Error logging out', 'error');
    }
}

// Show admin page
export function showAdminPage(pageId) {
    // Hide all admin pages
    const pages = document.querySelectorAll('.admin-content-page');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    const targetPage = document.getElementById(`admin-${pageId}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentAdminPage = pageId;
        
        // Update navigation
        updateAdminNavigation(pageId);
        
        // Load page-specific data
        loadAdminPageData(pageId);
    }
}

// Update admin navigation
function updateAdminNavigation(pageId) {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Load admin data
async function loadAdminData() {
    try {
        await Promise.all([
            loadCourses(),
            loadUsers(),
            loadAnalytics()
        ]);
    } catch (error) {
        console.error('Error loading admin data:', error);
        showNotification('Error loading admin data', 'error');
    }
}

// Load page-specific data
async function loadAdminPageData(pageId) {
    switch (pageId) {
        case 'courses':
            await loadCourses();
            break;
        case 'users':
            await loadUsers();
            break;
        case 'analytics':
            await loadAnalytics();
            break;
    }
}

// Load courses
async function loadCourses() {
    try {
        if (isDevelopment) {
            console.log('📚 Loading admin courses...');
        }
        
        // Create default courses if they don't exist
        await createDefaultCourses();
        
        const coursesQuery = query(
            collection(db, 'courses'),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(coursesQuery);
        adminCourses = [];
        
        querySnapshot.forEach((doc) => {
            adminCourses.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayCourses();
        
    } catch (error) {
        console.error('Error loading courses:', error);
        showNotification('Error loading courses', 'error');
    }
}

// Create default courses
async function createDefaultCourses() {
    try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        
        if (coursesSnapshot.empty) {
            if (isDevelopment) {
                console.log('📚 Creating default courses...');
            }
            
            const defaultCourses = [
                {
                    title: 'HTML Fundamentals',
                    category: 'web-development',
                    level: 'beginner',
                    duration: 6,
                    description: 'Learn the basics of HTML including elements, attributes, and semantic markup.',
                    videoUrl: '',
                    content: `# HTML Fundamentals

## Learning Objectives
- Understand HTML structure and syntax
- Learn about HTML elements and attributes
- Master semantic markup
- Create well-structured web pages

## Module 1: Introduction to HTML
HTML (HyperText Markup Language) is the foundation of web development...

## Module 2: HTML Elements
Learn about different HTML elements and their purposes...`,
                    status: 'published'
                },
                {
                    title: 'CSS Styling',
                    category: 'web-development',
                    level: 'beginner',
                    duration: 8,
                    description: 'Master CSS styling, selectors, and layout techniques.',
                    videoUrl: '',
                    content: `# CSS Styling

## Learning Objectives
- Understand CSS syntax and selectors
- Learn about styling properties
- Master layout techniques
- Create responsive designs`,
                    status: 'published'
                },
                {
                    title: 'JavaScript Basics',
                    category: 'web-development',
                    level: 'intermediate',
                    duration: 12,
                    description: 'Learn JavaScript programming fundamentals and DOM manipulation.',
                    videoUrl: '',
                    content: `# JavaScript Basics

## Learning Objectives
- Understand JavaScript syntax
- Learn variables, functions, and objects
- Master DOM manipulation
- Handle events and user interactions`,
                    status: 'published'
                },
                {
                    title: 'React.js Development',
                    category: 'web-development',
                    level: 'advanced',
                    duration: 16,
                    description: 'Build modern web applications with React.js.',
                    videoUrl: '',
                    content: `# React.js Development

## Learning Objectives
- Understand React concepts
- Learn components and JSX
- Master state management
- Build complete applications`,
                    status: 'published'
                },
                {
                    title: 'Microsoft Word Mastery',
                    category: 'microsoft-office',
                    level: 'beginner',
                    duration: 4,
                    description: 'Master document creation and formatting in Microsoft Word.',
                    videoUrl: '',
                    content: `# Microsoft Word Mastery

## Learning Objectives
- Navigate Word interface
- Format documents professionally
- Use templates and styles
- Collaborate on documents`,
                    status: 'published'
                },
                {
                    title: 'Excel Data Analysis',
                    category: 'microsoft-office',
                    level: 'intermediate',
                    duration: 10,
                    description: 'Learn data analysis and visualization in Microsoft Excel.',
                    videoUrl: '',
                    content: `# Excel Data Analysis

## Learning Objectives
- Master Excel formulas
- Create charts and graphs
- Analyze data patterns
- Use pivot tables`,
                    status: 'published'
                },
                {
                    title: 'PowerPoint Presentations',
                    category: 'microsoft-office',
                    level: 'beginner',
                    duration: 3,
                    description: 'Create engaging presentations with Microsoft PowerPoint.',
                    videoUrl: '',
                    content: `# PowerPoint Presentations

## Learning Objectives
- Design compelling slides
- Use animations and transitions
- Present effectively
- Share presentations`,
                    status: 'published'
                },
                {
                    title: 'Publisher Design',
                    category: 'microsoft-office',
                    level: 'beginner',
                    duration: 5,
                    description: 'Design professional publications with Microsoft Publisher.',
                    videoUrl: '',
                    content: `# Publisher Design

## Learning Objectives
- Create brochures and flyers
- Design newsletters
- Use templates effectively
- Print and share designs`,
                    status: 'published'
                },
                {
                    title: 'Access Database Management',
                    category: 'microsoft-office',
                    level: 'intermediate',
                    duration: 8,
                    description: 'Manage databases and create reports with Microsoft Access.',
                    videoUrl: '',
                    content: `# Access Database Management

## Learning Objectives
- Design database structures
- Create forms and reports
- Query and filter data
- Maintain data integrity`,
                    status: 'published'
                },
                {
                    title: 'UI/UX Design Principles',
                    category: 'design',
                    level: 'intermediate',
                    duration: 12,
                    description: 'Learn user interface and user experience design principles.',
                    videoUrl: '',
                    content: `# UI/UX Design Principles

## Learning Objectives
- Understand design principles
- Learn user research methods
- Create wireframes and prototypes
- Test and iterate designs`,
                    status: 'published'
                }
            ];
            
            for (const course of defaultCourses) {
                await addDoc(collection(db, 'courses'), {
                    ...course,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            }
            
            if (isDevelopment) {
                console.log('✅ Default courses created');
            }
        }
    } catch (error) {
        console.error('Error creating default courses:', error);
    }
}

// Display courses
function displayCourses() {
    const coursesGrid = document.getElementById('admin-courses-grid');
    if (!coursesGrid) return;
    
    if (adminCourses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No courses yet</h3>
                <p>Add your first course to get started.</p>
                <button onclick="showAddCourseModal()" class="btn btn-primary">Add Course</button>
            </div>
        `;
        return;
    }
    
    coursesGrid.innerHTML = adminCourses.map(course => `
        <div class="course-card category-${course.category}">
            <div class="course-header">
                <h3 class="course-title">${course.title}</h3>
                <span class="course-level ${course.level}">${course.level}</span>
            </div>
            <div class="course-meta">
                <span>📂 ${getCategoryName(course.category)}</span>
                <span>⏱️ ${course.duration}h</span>
                <span class="status-indicator status-${course.status}">
                    ${course.status}
                </span>
            </div>
            <p class="course-description">${course.description}</p>
            <div class="course-actions">
                <button onclick="editCourse('${course.id}')" class="btn btn-secondary btn-small">Edit</button>
                <button onclick="viewCourse('${course.id}')" class="btn btn-primary btn-small">View</button>
                <button onclick="deleteCourse('${course.id}')" class="btn btn-danger btn-small">Delete</button>
            </div>
        </div>
    `).join('');
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'web-development': 'Web Development',
        'microsoft-office': 'Microsoft Office',
        'design': 'UI/UX Design'
    };
    return names[category] || category;
}

// Load users
async function loadUsers() {
    try {
        if (isDevelopment) {
            console.log('👥 Loading users...');
        }
        
        const usersQuery = query(collection(db, 'users'));
        const querySnapshot = await getDocs(usersQuery);
        adminUsers = [];
        
        querySnapshot.forEach((doc) => {
            adminUsers.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayUsers();
        updateUserStats();
        
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('Error loading users', 'error');
    }
}

// Display users
function displayUsers() {
    const usersTable = document.getElementById('admin-users-table');
    if (!usersTable) return;
    
    if (adminUsers.length === 0) {
        usersTable.innerHTML = `
            <div class="empty-state">
                <h3>No users yet</h3>
                <p>Users will appear here when they register.</p>
            </div>
        `;
        return;
    }
    
    usersTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>School</th>
                    <th>Department</th>
                    <th>Joined</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${adminUsers.map(user => `
                    <tr>
                        <td>${user.name || 'N/A'}</td>
                        <td>${user.email || 'N/A'}</td>
                        <td>${user.school || 'N/A'}</td>
                        <td>${user.department || 'N/A'}</td>
                        <td>${formatDate(user.createdAt?.toDate())}</td>
                        <td><span class="user-status active">Active</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Update user stats
function updateUserStats() {
    document.getElementById('total-users').textContent = adminUsers.length;
    document.getElementById('active-users').textContent = adminUsers.length; // Simplified for now
}

// Load analytics
async function loadAnalytics() {
    if (isDevelopment) {
        console.log('📊 Loading analytics...');
    }
    
    // For now, we'll create mock analytics
    // In a real implementation, you'd fetch actual usage data
    setTimeout(() => {
        createCompletionChart();
        createPopularityChart();
    }, 500);
}

// Create completion chart
function createCompletionChart() {
    const ctx = document.getElementById('completion-chart');
    if (!ctx) return;
    
    // Mock data for course completion rates
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Create popularity chart
function createPopularityChart() {
    const ctx = document.getElementById('popularity-chart');
    if (!ctx) return;
    
    // Mock data for popular courses
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Word', 'Excel'],
            datasets: [{
                label: 'Enrollments',
                data: [45, 38, 42, 28, 35, 30],
                backgroundColor: '#6366f1',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Show add course modal
export function showAddCourseModal() {
    const modal = document.getElementById('add-course-modal');
    modal.classList.remove('hidden');
}

// Close add course modal
export function closeAddCourseModal() {
    const modal = document.getElementById('add-course-modal');
    modal.classList.add('hidden');
    modal.querySelector('form').reset();
}

// Add new course
export async function addNewCourse(event) {
    event.preventDefault();
    
    const courseData = {
        title: document.getElementById('course-title').value,
        category: document.getElementById('course-category').value,
        level: document.getElementById('course-level').value,
        duration: parseInt(document.getElementById('course-duration').value),
        description: document.getElementById('course-description').value,
        videoUrl: document.getElementById('course-video-url').value || '',
        content: document.getElementById('course-content').value || '',
        status: 'published'
    };
    
    try {
        await addDoc(collection(db, 'courses'), {
            ...courseData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        showNotification('Course added successfully!', 'success');
        closeAddCourseModal();
        loadCourses();
        
    } catch (error) {
        console.error('Error adding course:', error);
        showNotification('Error adding course', 'error');
    }
}

// Edit course (placeholder)
export function editCourse(courseId) {
    showNotification('Edit functionality coming soon!', 'info');
}

// View course (placeholder)
export function viewCourse(courseId) {
    const course = adminCourses.find(c => c.id === courseId);
    if (course) {
        showNotification(`Viewing: ${course.title}`, 'info');
    }
}

// Delete course
export async function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
        await deleteDoc(doc(db, 'courses', courseId));
        showNotification('Course deleted successfully!', 'success');
        loadCourses();
    } catch (error) {
        console.error('Error deleting course:', error);
        showNotification('Error deleting course', 'error');
    }
}

// Format date
function formatDate(date) {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Make functions globally available
window.handleAdminLogin = handleAdminLogin;
window.adminLogout = adminLogout;
window.showAdminPage = showAdminPage;
window.showAddCourseModal = showAddCourseModal;
window.closeAddCourseModal = closeAddCourseModal;
window.addNewCourse = addNewCourse;
window.editCourse = editCourse;
window.viewCourse = viewCourse;
window.deleteCourse = deleteCourse;