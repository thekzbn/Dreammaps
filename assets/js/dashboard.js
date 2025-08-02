// Dashboard module
import { getCurrentUser } from './auth.js';
import { 
    collection, 
    query, 
    where, 
    getDocs,
    orderBy,
    limit
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db, isDevelopment } from './firebase-config.js';
import { showNotification, formatDate, getTimeAgo } from './main.js';

// Dashboard state
let skillChart = null;
let progressChart = null;

// Load dashboard data
export async function loadDashboardData() {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        if (isDevelopment) {
            console.log('📊 Loading dashboard data...');
        }
        
        // Load user enrolled courses stats
        const enrolledCourses = await getUserEnrolledCourses(user.uid);
        updateDashboardStats(enrolledCourses);
        
        // Load recent activities (simplified)
        updateRecentActivity(enrolledCourses);
        
        // Initialize charts
        initializeSimpleCharts(enrolledCourses);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Show simplified dashboard instead of error
        updateDashboardStats([]);
        updateRecentActivity([]);
        initializeSimpleCharts([]);
    }
}

// Get user enrolled courses
async function getUserEnrolledCourses(userId) {
    try {
        const enrollmentsQuery = query(
            collection(db, 'enrollments'),
            where('userId', '==', userId)
        );
        
        const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
        const courseIds = [];
        
        enrollmentsSnapshot.forEach((doc) => {
            courseIds.push(doc.data().courseId);
        });
        
        if (courseIds.length === 0) return [];
        
        // Get course details
        const coursesQuery = query(collection(db, 'courses'));
        const coursesSnapshot = await getDocs(coursesQuery);
        const enrolledCourses = [];
        
        coursesSnapshot.forEach((doc) => {
            if (courseIds.includes(doc.id)) {
                enrolledCourses.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        
        return enrolledCourses;
        
    } catch (error) {
        console.error('Error getting enrolled courses:', error);
        return [];
    }
}

// Update dashboard stats
function updateDashboardStats(enrolledCourses) {
    const totalCourses = enrolledCourses.length;
    const beginnerCourses = enrolledCourses.filter(c => c.level === 'beginner').length;
    const intermediateCourses = enrolledCourses.filter(c => c.level === 'intermediate').length;
    const advancedCourses = enrolledCourses.filter(c => c.level === 'advanced').length;
    
    document.getElementById('total-courses').textContent = totalCourses;
    document.getElementById('beginner-courses').textContent = beginnerCourses;
    document.getElementById('intermediate-courses').textContent = intermediateCourses;
    document.getElementById('advanced-courses').textContent = advancedCourses;
}

// Update recent activity
function updateRecentActivity(enrolledCourses) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    if (enrolledCourses.length === 0) {
        activityList.innerHTML = `
            <div class="empty-activity">
                <div class="empty-activity-icon">📚</div>
                <h4>No enrolled courses</h4>
                <p>Browse our course catalog to get started!</p>
                <button onclick="showPage('courses')" class="btn btn-primary">View Courses</button>
            </div>
        `;
        return;
    }
    
    // Show recent enrolled courses
    activityList.innerHTML = enrolledCourses.slice(0, 5).map(course => {
        return `
            <div class="activity-item">
                <div class="activity-icon">📚</div>
                <div class="activity-content">
                    <h4>Enrolled in course</h4>
                    <p>${course.title}</p>
                </div>
                <div class="activity-time">Recently</div>
            </div>
        `;
    }).join('');
}

// Simple refresh function
export function refreshDashboard() {
    loadDashboardData();
    showNotification('Dashboard refreshed!', 'success', 2000);
}

// Initialize simple charts
function initializeSimpleCharts(enrolledCourses) {
    initializeCourseChart(enrolledCourses);
    initializeProgressChart(enrolledCourses);
}

// Initialize course distribution chart
function initializeCourseChart(enrolledCourses) {
    const ctx = document.getElementById('skillChart');
    if (!ctx) return;
    
    if (skillChart) {
        skillChart.destroy();
    }
    
    const beginnerCount = enrolledCourses.filter(c => c.level === 'beginner').length;
    const intermediateCount = enrolledCourses.filter(c => c.level === 'intermediate').length;
    const advancedCount = enrolledCourses.filter(c => c.level === 'advanced').length;
    
    skillChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Beginner', 'Intermediate', 'Advanced'],
            datasets: [{
                data: [beginnerCount, intermediateCount, advancedCount],
                backgroundColor: ['#48bb78', '#ed8936', '#f56565'],
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

// Initialize progress chart
function initializeProgressChart(enrolledCourses) {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    if (progressChart) {
        progressChart.destroy();
    }
    
    // Simple progress data
    const totalCourses = enrolledCourses.length;
    const data = [0, totalCourses * 0.2, totalCourses * 0.4, totalCourses * 0.6, totalCourses];
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Course Progress',
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4
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

// Refresh charts
export function refreshCharts() {
    refreshDashboard();
}

// Update progress chart timeframe
export function updateProgressChart() {
    const timeframe = document.getElementById('progress-timeframe').value;
    showNotification(`Updated to ${timeframe} view`, 'info', 2000);
    // In a real app, this would fetch different data based on timeframe
}

// Make functions globally available
window.refreshCharts = refreshCharts;
window.updateProgressChart = updateProgressChart;