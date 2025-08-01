// Dashboard module
import { getCurrentUser } from './auth.js';
import { getUserStats, getUserActivities } from './database.js';
import { showNotification, formatDate, getTimeAgo } from './main.js';
import { isDevelopment } from './firebase-config.js';

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
        
        // Load user stats
        const stats = await getUserStats(user.uid);
        updateStatsDisplay(stats);
        
        // Load recent activities
        const activities = await getUserActivities(user.uid, 5);
        updateActivitiesDisplay(activities);
        
        // Initialize charts
        initializeCharts(stats);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Error loading dashboard data.', 'error');
    }
}

// Update stats display
function updateStatsDisplay(stats) {
    document.getElementById('total-skills').textContent = stats.totalSkills;
    document.getElementById('newbie-skills').textContent = stats.newbieSkills;
    document.getElementById('intermediate-skills').textContent = stats.intermediateSkills;
    document.getElementById('advanced-skills').textContent = stats.advancedSkills;
}

// Update activities display
function updateActivitiesDisplay(activities) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-activity">
                <div class="empty-activity-icon">📝</div>
                <h4>No recent activity</h4>
                <p>Start adding skills to see your progress here!</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.map(activity => {
        const icon = getActivityIcon(activity.type);
        const message = getActivityMessage(activity);
        const timeAgo = getTimeAgo(activity.timestamp);
        
        return `
            <div class="activity-item">
                <div class="activity-icon">${icon}</div>
                <div class="activity-content">
                    <h4>${message}</h4>
                    <p>${activity.data.skillName || ''}</p>
                </div>
                <div class="activity-time">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

// Get activity icon
function getActivityIcon(type) {
    const icons = {
        skill_added: '➕',
        skill_removed: '➖',
        skill_updated: '📝',
        onboarding_completed: '🎉',
        profile_updated: '👤'
    };
    return icons[type] || '📝';
}

// Get activity message
function getActivityMessage(activity) {
    const messages = {
        skill_added: 'Added new skill',
        skill_removed: 'Removed skill',
        skill_updated: 'Updated skill',
        onboarding_completed: 'Completed onboarding',
        profile_updated: 'Updated profile'
    };
    return messages[activity.type] || 'Activity';
}

// Initialize charts
function initializeCharts(stats) {
    initializeSkillChart(stats);
    initializeProgressChart(stats);
}

// Initialize skill distribution chart
function initializeSkillChart(stats) {
    const ctx = document.getElementById('skillChart');
    if (!ctx) return;
    
    if (skillChart) {
        skillChart.destroy();
    }
    
    skillChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Newbie', 'Intermediate', 'Advanced'],
            datasets: [{
                data: [stats.newbieSkills, stats.intermediateSkills, stats.advancedSkills],
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
function initializeProgressChart(stats) {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    if (progressChart) {
        progressChart.destroy();
    }
    
    // Mock data for progress chart
    const data = [
        stats.newbieSkills * 0.3,
        stats.newbieSkills * 0.5,
        stats.newbieSkills * 0.7,
        stats.totalSkills * 0.8,
        stats.totalSkills
    ];
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Skills Progress',
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
    loadDashboardData();
    showNotification('Charts refreshed!', 'success', 2000);
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