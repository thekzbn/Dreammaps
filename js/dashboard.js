// Dashboard functionality
import { getCurrentUser } from './auth.js';
import { getUserProfile, getUserStats, getUserActivities, getUserSkills } from './database.js';
import { getTimeAgo } from './main.js';

// Chart instances
let skillChart = null;
let progressChart = null;

// Load dashboard data
export async function loadDashboardData() {
    const user = getCurrentUser();
    if (!user) {
        console.error('No user logged in');
        return;
    }
    
    try {
        // Load user profile and stats
        const [userProfile, userStats, userActivities, userSkills] = await Promise.all([
            getUserProfile(user.uid),
            getUserStats(user.uid),
            getUserActivities(user.uid, 5),
            getUserSkills(user.uid)
        ]);
        
        // Update dashboard with data
        updateDashboardStats(userStats);
        updateUserName(userProfile);
        updateRecentActivity(userActivities);
        updateCharts(userStats, userSkills);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Error loading dashboard data', 'error');
    }
}

// Update dashboard statistics
function updateDashboardStats(stats) {
    const elements = {
        'total-skills': stats.totalSkills,
        'newbie-skills': stats.newbieSkills,
        'intermediate-skills': stats.intermediateSkills,
        'advanced-skills': stats.advancedSkills
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            // Animate number counting
            animateNumber(element, 0, value, 1000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(start + (end - start) * easeOutQuad);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Update user name in dashboard
function updateUserName(userProfile) {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && userProfile) {
        userNameElement.textContent = userProfile.name || 'User';
    }
}

// Update recent activity section
function updateRecentActivity(activities) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No recent activity</h3>
                <p>Start adding skills to see your activity here</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${getActivityIcon(activity.type)}</div>
            <div class="activity-content">
                <h4>${activity.description}</h4>
                <p>${getActivityDetails(activity)}</p>
            </div>
            <div class="activity-time">${getTimeAgo(activity.timestamp)}</div>
        </div>
    `).join('');
}

// Get icon for activity type
function getActivityIcon(type) {
    const icons = {
        'skill_added': '📚',
        'skill_updated': '⚡',
        'skill_removed': '🗑️',
        'profile_update': '👤',
        'onboarding_completed': '🎉',
        'level_up': '🏆'
    };
    
    return icons[type] || '📝';
}

// Get activity details
function getActivityDetails(activity) {
    if (activity.data) {
        if (activity.data.skillName) {
            return `Skill: ${activity.data.skillName}`;
        }
        if (activity.data.skillCount) {
            return `${activity.data.skillCount} skills selected`;
        }
    }
    
    return '';
}

// Update charts
function updateCharts(stats, userSkills) {
    updateSkillChart(stats);
    updateProgressChart(userSkills);
}

// Update skill distribution chart
function updateSkillChart(stats) {
    const ctx = document.getElementById('skillChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (skillChart) {
        skillChart.destroy();
    }
    
    skillChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Newbie', 'Intermediate', 'Advanced'],
            datasets: [{
                data: [stats.newbieSkills, stats.intermediateSkills, stats.advancedSkills],
                backgroundColor: [
                    '#fbbf24',
                    '#3b82f6',
                    '#10b981'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Update progress chart
function updateProgressChart(userSkills) {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (progressChart) {
        progressChart.destroy();
    }
    
    // Group skills by category
    const categoryData = {};
    userSkills.forEach(skill => {
        const category = skill.category || 'Other';
        if (!categoryData[category]) {
            categoryData[category] = { newbie: 0, intermediate: 0, advanced: 0 };
        }
        categoryData[category][skill.level]++;
    });
    
    const categories = Object.keys(categoryData);
    const newbieData = categories.map(cat => categoryData[cat].newbie);
    const intermediateData = categories.map(cat => categoryData[cat].intermediate);
    const advancedData = categories.map(cat => categoryData[cat].advanced);
    
    progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Newbie',
                    data: newbieData,
                    backgroundColor: '#fbbf24',
                    borderRadius: 4
                },
                {
                    label: 'Intermediate',
                    data: intermediateData,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                },
                {
                    label: 'Advanced',
                    data: advancedData,
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Quick action handlers
export function addNewSkillQuick() {
    window.showPage('skills');
    setTimeout(() => {
        window.showAddSkillModal();
    }, 300);
}

export function viewAllSkills() {
    window.showPage('skills');
}

export function editProfile() {
    window.showPage('profile');
}

// Make functions available globally
window.loadDashboardData = loadDashboardData;
window.addNewSkillQuick = addNewSkillQuick;
window.viewAllSkills = viewAllSkills;
window.editProfile = editProfile;