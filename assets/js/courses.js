// Courses module for displaying available courses
import { getCurrentUser } from './auth.js';
import { 
    collection, 
    doc, 
    getDocs, 
    addDoc,
    query, 
    where,
    orderBy,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db, isDevelopment } from './firebase-config.js';
import { showNotification } from './main.js';

// Current state
let allCourses = [];
let filteredCourses = [];
let currentCategoryFilter = 'all';
let currentLevelFilter = 'all';

// Load courses data
export async function loadCoursesData() {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        if (isDevelopment) {
            console.log('📚 Loading available courses...');
        }
        
        // Load all available courses
        const coursesQuery = query(
            collection(db, 'courses'),
            where('status', '==', 'published'),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(coursesQuery);
        allCourses = [];
        
        querySnapshot.forEach((doc) => {
            allCourses.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // Load user's enrolled courses
        await loadUserEnrollments(user.uid);
        
        // Display courses
        filteredCourses = [...allCourses];
        displayCourses();
        
        if (isDevelopment) {
            console.log('✅ Courses loaded:', allCourses.length);
        }
        
    } catch (error) {
        console.error('Error loading courses:', error);
        showNotification('Error loading courses', 'error');
    }
}

// Load user enrollments
async function loadUserEnrollments(userId) {
    try {
        const enrollmentsQuery = query(
            collection(db, 'enrollments'),
            where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(enrollmentsQuery);
        const enrolledCourseIds = new Set();
        
        querySnapshot.forEach((doc) => {
            enrolledCourseIds.add(doc.data().courseId);
        });
        
        // Mark enrolled courses
        allCourses.forEach(course => {
            course.isEnrolled = enrolledCourseIds.has(course.id);
        });
        
    } catch (error) {
        console.error('Error loading enrollments:', error);
    }
}

// Display courses
function displayCourses() {
    const coursesGrid = document.getElementById('available-courses-grid');
    const noCoursesMessage = document.getElementById('no-courses-message');
    
    if (!coursesGrid) return;
    
    if (filteredCourses.length === 0) {
        coursesGrid.innerHTML = '';
        noCoursesMessage?.classList.remove('hidden');
        return;
    }
    
    noCoursesMessage?.classList.add('hidden');
    
    coursesGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card" onclick="showCourseDetail('${course.id}')">
            <div class="course-header">
                <div class="course-category">${getCategoryDisplayName(course.category)}</div>
                <div class="course-level ${course.level}">${course.level}</div>
            </div>
            
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-meta">
                    <div class="course-duration">
                        <span class="meta-icon">⏱️</span>
                        ${course.duration} hours
                    </div>
                    <div class="course-status">
                        ${course.isEnrolled ? 
                            '<span class="enrolled-badge">✅ Enrolled</span>' : 
                            '<span class="enroll-badge">📚 Available</span>'
                        }
                    </div>
                </div>
            </div>
            
            <div class="course-actions">
                ${course.isEnrolled ? 
                    '<button class="btn btn-primary btn-full" onclick="event.stopPropagation(); continueCourse(\'' + course.id + '\')">Continue Learning</button>' :
                    '<button class="btn btn-secondary btn-full" onclick="event.stopPropagation(); enrollInCourse(\'' + course.id + '\')">Enroll Now</button>'
                }
            </div>
        </div>
    `).join('');
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'web-development': 'Web Development',
        'microsoft-office': 'Microsoft Office',
        'design': 'UI/UX Design'
    };
    return categoryNames[category] || category;
}

// Show course detail modal
export function showCourseDetail(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    // Populate course detail modal (reusing the skill detail modal)
    document.getElementById('skill-detail-name').textContent = course.title;
    
    const levelBadge = document.getElementById('skill-detail-level');
    levelBadge.textContent = course.level;
    levelBadge.className = `skill-badge ${course.level}`;
    
    document.getElementById('skill-detail-category').textContent = getCategoryDisplayName(course.category);
    document.getElementById('skill-detail-progress').textContent = course.isEnrolled ? '25%' : '0%'; // Mock progress
    
    // Show video section if available
    const videoSection = document.getElementById('skill-video-section');
    if (course.videoUrl) {
        videoSection.style.display = 'block';
        displayCourseVideo(course.videoUrl);
    } else {
        videoSection.style.display = 'none';
    }
    
    // Show course content
    const contentSection = document.getElementById('skill-content-section');
    if (course.content) {
        contentSection.style.display = 'block';
        document.getElementById('skill-detail-content').innerHTML = formatCourseContent(course.content);
    } else {
        contentSection.style.display = 'none';
    }
    
    // Hide notes section for courses
    document.getElementById('skill-notes-section').style.display = 'none';
    
    // Update action buttons
    updateCourseModalActions(course);
    
    // Show modal
    const modal = document.getElementById('skill-detail-modal');
    modal.classList.remove('hidden');
}

// Display course video
function displayCourseVideo(videoUrl) {
    const container = document.getElementById('skill-video-container');
    
    if (isYouTubeURL(videoUrl)) {
        const videoId = extractYouTubeID(videoUrl);
        container.innerHTML = `
            <iframe class="video-player" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen>
            </iframe>
        `;
    } else if (isVideoURL(videoUrl)) {
        container.innerHTML = `
            <video class="video-player" controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        container.innerHTML = `
            <div class="video-placeholder">
                <div class="video-placeholder-icon">📹</div>
                <h5>Video Coming Soon</h5>
                <p>Course video will be available shortly</p>
            </div>
        `;
    }
}

// Update course modal actions
function updateCourseModalActions(course) {
    const actionsContainer = document.querySelector('.level-progression');
    if (!actionsContainer) return;
    
    actionsContainer.innerHTML = `
        <h4>Course Actions</h4>
        <div class="course-actions">
            ${course.isEnrolled ? 
                '<button onclick="continueCourse(\'' + course.id + '\')" class="btn btn-primary course-action">Continue Learning</button>' :
                '<button onclick="enrollInCourse(\'' + course.id + '\')" class="btn btn-secondary course-action">Enroll in Course</button>'
            }
            <button onclick="closeSkillDetailModal()" class="btn btn-outline course-action">Close</button>
        </div>
    `;
}

// Format course content
function formatCourseContent(content) {
    if (!content) return '';
    
    let formatted = content
        // Headers
        .replace(/^### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^## (.*$)/gim, '<h5>$1</h5>')
        .replace(/^# (.*$)/gim, '<h5>$1</h5>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        // Lists
        .replace(/^\* (.+$)/gim, '<li>$1</li>')
        .replace(/^- (.+$)/gim, '<li>$1</li>')
        // Highlights
        .replace(/==(.*)==/gim, '<span class="highlight">$1</span>')
        // Line breaks
        .replace(/\n/g, '<br>');
    
    // Wrap consecutive list items in ul tags
    formatted = formatted.replace(/(<li>.*<\/li>(?:<br>)*)+/gim, function(match) {
        return '<ul>' + match.replace(/<br>/g, '') + '</ul>';
    });
    
    return formatted;
}

// Check if URL is YouTube
function isYouTubeURL(url) {
    return url.includes('youtube.com/watch') || url.includes('youtu.be/');
}

// Extract YouTube video ID
function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Check if URL is a video file
function isVideoURL(url) {
    return /\.(mp4|webm|ogg|avi|mov)$/i.test(url);
}

// Enroll in course
export async function enrollInCourse(courseId) {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in to enroll in courses', 'error');
        return;
    }
    
    try {
        // Add enrollment record
        await addDoc(collection(db, 'enrollments'), {
            userId: user.uid,
            courseId: courseId,
            enrolledAt: serverTimestamp(),
            progress: 0,
            completed: false
        });
        
        // Update local state
        const course = allCourses.find(c => c.id === courseId);
        if (course) {
            course.isEnrolled = true;
        }
        
        showNotification('Successfully enrolled in course!', 'success');
        displayCourses();
        closeSkillDetailModal();
        
    } catch (error) {
        console.error('Error enrolling in course:', error);
        showNotification('Error enrolling in course', 'error');
    }
}

// Continue course
export function continueCourse(courseId) {
    showCourseDetail(courseId);
    showNotification('Continue learning from where you left off!', 'info');
}

// Filter courses by category
export function filterCoursesByCategory() {
    const categoryFilter = document.getElementById('category-filter').value;
    currentCategoryFilter = categoryFilter;
    applyFilters();
}

// Filter courses by level
export function filterCourses(level) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === level) {
            btn.classList.add('active');
        }
    });
    
    currentLevelFilter = level;
    applyFilters();
}

// Apply all filters
function applyFilters() {
    filteredCourses = allCourses.filter(course => {
        const categoryMatch = currentCategoryFilter === 'all' || course.category === currentCategoryFilter;
        const levelMatch = currentLevelFilter === 'all' || course.level === currentLevelFilter;
        return categoryMatch && levelMatch;
    });
    
    displayCourses();
}

// Search courses
export function searchCourses() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    
    if (searchTerm === '') {
        applyFilters();
        return;
    }
    
    filteredCourses = allCourses.filter(course => {
        const categoryMatch = currentCategoryFilter === 'all' || course.category === currentCategoryFilter;
        const levelMatch = currentLevelFilter === 'all' || course.level === currentLevelFilter;
        const searchMatch = course.title.toLowerCase().includes(searchTerm) ||
                           course.description.toLowerCase().includes(searchTerm) ||
                           getCategoryDisplayName(course.category).toLowerCase().includes(searchTerm);
        
        return categoryMatch && levelMatch && searchMatch;
    });
    
    displayCourses();
}

// Close course detail modal
export function closeSkillDetailModal() {
    const modal = document.getElementById('skill-detail-modal');
    modal.classList.add('hidden');
}

// Make functions globally available
window.showCourseDetail = showCourseDetail;
window.enrollInCourse = enrollInCourse;
window.continueCourse = continueCourse;
window.filterCoursesByCategory = filterCoursesByCategory;
window.filterCourses = filterCourses;
window.searchCourses = searchCourses;
window.closeSkillDetailModal = closeSkillDetailModal;