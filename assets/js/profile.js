// Profile management module
import { getCurrentUser } from './auth.js';
import { getUserProfile, updateUserProfile, getUserStats, getUserActivities } from './database.js';
import { showNotification, formatDate, getTimeAgo } from './main.js';
import { isDevelopment } from './firebase-config.js';

// Load profile data
export async function loadProfileData() {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        const [profile, stats, activities] = await Promise.all([
            getUserProfile(user.uid),
            getUserStats(user.uid),
            getUserActivities(user.uid, 5)
        ]);
        
        if (profile) {
            populateProfileForm(profile);
            updateProfileStats(stats);
        }
        
        // Update profile info
        document.getElementById('profile-email').textContent = user.email;
        
        // Load recent activities
        updateProfileActivities(activities);
        
        // Update achievements
        updateAchievements(stats);
        
    } catch (error) {
        console.error('Error loading profile:', error);
        showNotification('Error loading profile data.', 'error');
    }
}

// Populate profile form
function populateProfileForm(profile) {
    document.getElementById('profile-gender').value = profile.gender || '';
    document.getElementById('profile-dob').value = profile.dateOfBirth || '';
    document.getElementById('profile-school').value = profile.school || '';
    document.getElementById('profile-school-level').value = profile.schoolLevel || '';
    document.getElementById('profile-department').value = profile.department || '';
    
    // Update profile display name
    if (profile.name) {
        document.getElementById('profile-name').textContent = profile.name;
    }
}

// Update profile stats
function updateProfileStats(stats) {
    document.getElementById('profile-total-skills').textContent = stats.totalSkills;
    
    // Calculate user level based on skills
    const userLevel = calculateUserLevel(stats);
    document.getElementById('profile-level').textContent = userLevel;
    
    // Update join date (mock data for now)
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - 2); // 2 months ago
    document.getElementById('profile-join-date').textContent = formatDate(joinDate, { month: 'short', year: 'numeric' });
}

// Calculate user level based on skills
function calculateUserLevel(stats) {
    const totalSkills = stats.totalSkills;
    const advancedSkills = stats.advancedSkills;
    const intermediateSkills = stats.intermediateSkills;
    
    if (totalSkills === 0) return 'Newbie';
    if (advancedSkills >= 5) return 'Expert';
    if (advancedSkills >= 2 || intermediateSkills >= 5) return 'Advanced';
    if (intermediateSkills >= 2 || totalSkills >= 5) return 'Intermediate';
    return 'Beginner';
}

// Update profile activities timeline
function updateProfileActivities(activities) {
    const timeline = document.getElementById('profile-activity-timeline');
    if (!timeline) return;
    
    if (activities.length === 0) {
        timeline.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-icon">📝</div>
                <div class="timeline-content">
                    <h5>No recent activity</h5>
                    <p>Start adding skills to see your progress here!</p>
                </div>
            </div>
        `;
        return;
    }
    
    timeline.innerHTML = activities.map(activity => {
        const icon = getActivityIcon(activity.type);
        const timeAgo = getTimeAgo(activity.timestamp);
        
        return `
            <div class="timeline-item">
                <div class="timeline-icon">${icon}</div>
                <div class="timeline-content">
                    <h5>${getActivityMessage(activity)}</h5>
                    <p>${activity.data.skillName || ''} • ${timeAgo}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Update achievements based on stats
function updateAchievements(stats) {
    const achievementsContainer = document.getElementById('achievement-cards');
    if (!achievementsContainer) return;
    
    const achievements = calculateAchievements(stats);
    
    achievementsContainer.innerHTML = achievements.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        </div>
    `).join('');
}

// Calculate available achievements
function calculateAchievements(stats) {
    const achievements = [
        {
            title: 'First Steps',
            description: 'Added your first skill',
            icon: '🎯',
            unlocked: stats.totalSkills >= 1
        },
        {
            title: 'Skill Collector',
            description: 'Added 5 skills to your profile',
            icon: '📚',
            unlocked: stats.totalSkills >= 5
        },
        {
            title: 'Diverse Learner',
            description: 'Skills across 3 categories',
            icon: '🌟',
            unlocked: Object.keys(stats.categoryCounts).length >= 3
        },
        {
            title: 'Skill Master',
            description: 'Reached advanced level in a skill',
            icon: '🏆',
            unlocked: stats.advancedSkills >= 1
        },
        {
            title: 'Expert Level',
            description: '10 skills in your arsenal',
            icon: '💎',
            unlocked: stats.totalSkills >= 10
        },
        {
            title: 'Learning Champion',
            description: '5 advanced level skills',
            icon: '👑',
            unlocked: stats.advancedSkills >= 5
        }
    ];
    
    return achievements;
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

// Update profile
export async function updateProfile(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) return;
    
    const profileData = {
        gender: document.getElementById('profile-gender').value,
        dateOfBirth: document.getElementById('profile-dob').value,
        school: document.getElementById('profile-school').value,
        schoolLevel: document.getElementById('profile-school-level').value,
        department: document.getElementById('profile-department').value
    };
    
    try {
        await updateUserProfile(user.uid, profileData);
        showNotification('Profile updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('Error updating profile.', 'error');
    }
}

// Reset profile form
export function resetProfileForm() {
    loadProfileData();
    showNotification('Form reset to saved values.', 'info', 2000);
}

// Change avatar (placeholder)
export function changeAvatar() {
    showNotification('Avatar change coming soon!', 'info', 2000);
}

// Make functions globally available
window.updateProfile = updateProfile;
window.resetProfileForm = resetProfileForm;
window.changeAvatar = changeAvatar;