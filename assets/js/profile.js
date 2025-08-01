// Profile management module
import { getCurrentUser } from './auth.js';
import { getUserProfile, updateUserProfile, getUserStats } from './database.js';
import { showNotification, formatDate } from './main.js';
import { isDevelopment } from './firebase-config.js';

// Load profile data
export async function loadProfileData() {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        const profile = await getUserProfile(user.uid);
        const stats = await getUserStats(user.uid);
        
        if (profile) {
            populateProfileForm(profile);
            updateProfileStats(stats);
        }
        
        // Update profile info
        document.getElementById('profile-email').textContent = user.email;
        
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
    
    // Update join date (mock data for now)
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - 2); // 2 months ago
    document.getElementById('profile-join-date').textContent = formatDate(joinDate, { month: 'short', year: 'numeric' });
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