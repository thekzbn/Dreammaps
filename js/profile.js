// Profile management functionality
import { getCurrentUser } from './auth.js';
import { getUserProfile, updateUserProfile, addActivityLog } from './database.js';

// Load profile data
export async function loadProfileData() {
    const user = getCurrentUser();
    if (!user) {
        console.error('No user logged in');
        return;
    }
    
    try {
        // Load user profile from Firestore
        const userProfile = await getUserProfile(user.uid);
        
        if (userProfile) {
            // Populate profile form with current data
            populateProfileForm(userProfile);
            
            // Update profile display
            updateProfileDisplay(userProfile);
        }
        
    } catch (error) {
        console.error('Error loading profile data:', error);
        showNotification('Error loading profile data', 'error');
    }
}

// Populate profile form with current data
function populateProfileForm(userProfile) {
    const fields = {
        'profile-name': userProfile.name,
        'profile-email': userProfile.email,
        'profile-gender': userProfile.gender,
        'profile-dob': userProfile.dob,
        'profile-school': userProfile.school,
        'profile-school-level': userProfile.schoolLevel,
        'profile-department': userProfile.department
    };
    
    Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field && value) {
            field.value = value;
        }
    });
}

// Update profile display
function updateProfileDisplay(userProfile) {
    // Update profile header
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    
    if (profileName) {
        profileName.textContent = userProfile.name || 'User Name';
    }
    
    if (profileEmail) {
        profileEmail.textContent = userProfile.email || 'user@example.com';
    }
    
    // Update avatar with initials
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    if (avatarPlaceholder && userProfile.name) {
        const initials = getInitials(userProfile.name);
        avatarPlaceholder.textContent = initials;
    }
}

// Get initials from name
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}

// Update profile
export async function updateProfile(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('profile-name')?.value,
        gender: document.getElementById('profile-gender')?.value,
        dob: document.getElementById('profile-dob')?.value,
        school: document.getElementById('profile-school')?.value,
        schoolLevel: document.getElementById('profile-school-level')?.value,
        department: document.getElementById('profile-department')?.value
    };
    
    // Remove empty fields
    Object.keys(formData).forEach(key => {
        if (!formData[key]) {
            delete formData[key];
        }
    });
    
    try {
        // Update profile in Firestore
        await updateUserProfile(user.uid, formData);
        
        // Log activity
        await addActivityLog(user.uid, {
            type: 'profile_update',
            description: 'Updated profile information',
            data: { fields: Object.keys(formData) }
        });
        
        showNotification('Profile updated successfully!', 'success');
        
        // Refresh profile display
        await loadProfileData();
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('Error updating profile. Please try again.', 'error');
    }
}

// Change password (placeholder for future implementation)
export function changePassword() {
    showNotification('Password change functionality will be available soon', 'info');
}

// Delete account (placeholder for future implementation)
export function deleteAccount() {
    const confirmation = prompt('Are you sure you want to delete your account? Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        showNotification('Account deletion functionality will be available soon', 'info');
    }
}

// Export profile data
export async function exportProfileData() {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    try {
        const userProfile = await getUserProfile(user.uid);
        
        if (userProfile) {
            // Remove sensitive data
            const exportData = { ...userProfile };
            delete exportData.id;
            delete exportData.createdAt;
            delete exportData.updatedAt;
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'my-profile.json';
            link.click();
            
            showNotification('Profile data exported successfully!', 'success');
        }
        
    } catch (error) {
        console.error('Error exporting profile data:', error);
        showNotification('Error exporting profile data', 'error');
    }
}

// Upload profile picture (placeholder for future implementation)
export function uploadProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // For now, just show a placeholder message
            showNotification('Profile picture upload will be available soon', 'info');
            
            // In a real implementation, you would:
            // 1. Upload the file to Firebase Storage
            // 2. Get the download URL
            // 3. Update the user profile with the photo URL
            // 4. Update the UI to show the new profile picture
        }
    };
    
    input.click();
}

// Get profile completion percentage
export async function getProfileCompletion() {
    const user = getCurrentUser();
    if (!user) return 0;
    
    try {
        const userProfile = await getUserProfile(user.uid);
        if (!userProfile) return 0;
        
        const requiredFields = ['name', 'email', 'gender', 'dob', 'school', 'department'];
        const completedFields = requiredFields.filter(field => userProfile[field]);
        
        return Math.round((completedFields.length / requiredFields.length) * 100);
        
    } catch (error) {
        console.error('Error calculating profile completion:', error);
        return 0;
    }
}

// Show profile completion status
export async function showProfileCompletion() {
    const completion = await getProfileCompletion();
    
    // Create or update completion indicator
    let completionIndicator = document.getElementById('profile-completion');
    if (!completionIndicator) {
        completionIndicator = document.createElement('div');
        completionIndicator.id = 'profile-completion';
        completionIndicator.className = 'profile-completion';
        
        const profileHeader = document.querySelector('.profile-header');
        if (profileHeader) {
            profileHeader.appendChild(completionIndicator);
        }
    }
    
    completionIndicator.innerHTML = `
        <div class="completion-text">Profile ${completion}% complete</div>
        <div class="completion-bar">
            <div class="completion-fill" style="width: ${completion}%"></div>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('profile-completion-styles')) {
        const styles = document.createElement('style');
        styles.id = 'profile-completion-styles';
        styles.textContent = `
            .profile-completion {
                margin-top: 1rem;
                padding: 1rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .completion-text {
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
            }
            
            .completion-bar {
                width: 100%;
                height: 8px;
                background: #f3f4f6;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .completion-fill {
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 4px;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    // Show profile completion when profile page is loaded
    const profilePage = document.getElementById('profile-page');
    if (profilePage) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!profilePage.classList.contains('hidden')) {
                        showProfileCompletion();
                    }
                }
            });
        });
        
        observer.observe(profilePage, { attributes: true });
    }
});

// Make functions available globally
window.loadProfileData = loadProfileData;
window.updateProfile = updateProfile;
window.changePassword = changePassword;
window.deleteAccount = deleteAccount;
window.exportProfileData = exportProfileData;
window.uploadProfilePicture = uploadProfilePicture;