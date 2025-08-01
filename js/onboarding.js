// Onboarding functionality
import { getCurrentUser } from './auth.js';
import { updateUserProfile, getAvailableSkills, addUserSkill, addActivityLog } from './database.js';

// Global state for onboarding
let selectedSkills = new Set();
let availableSkills = [];
let currentSkillCategory = 'newbie';

// Handle additional details form submission
export async function handleAdditionalDetails(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    const formData = {
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        school: document.getElementById('school').value,
        schoolLevel: document.getElementById('school-level').value,
        department: document.getElementById('department').value,
        additionalDetailsCompleted: true
    };
    
    try {
        // Update user profile in Firestore
        await updateUserProfile(user.uid, formData);
        
        // Log activity
        await addActivityLog(user.uid, {
            type: 'profile_update',
            description: 'Completed additional details',
            data: { step: 'additional_details' }
        });
        
        showNotification('Details saved successfully!', 'success');
        
        // Move to skill selection step
        showOnboardingStep('skill-selection');
        await loadSkillSelection();
        
    } catch (error) {
        console.error('Error saving additional details:', error);
        showNotification('Error saving details. Please try again.', 'error');
    }
}

// Load skill selection data
async function loadSkillSelection() {
    try {
        // Get available skills from Firestore
        availableSkills = await getAvailableSkills();
        
        // Display skills for current category
        displaySkillsForCategory(currentSkillCategory);
        
    } catch (error) {
        console.error('Error loading skills:', error);
        showNotification('Error loading skills', 'error');
    }
}

// Display skills for a specific category
function displaySkillsForCategory(category) {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skillsContainer) {
        console.error('Skills container not found');
        return;
    }
    
    // Clear existing skills
    skillsContainer.innerHTML = '';
    
    if (availableSkills.length === 0) {
        skillsContainer.innerHTML = `
            <div class="skills-empty">
                <div class="skills-empty-icon">📚</div>
                <h3>No skills available</h3>
                <p>Skills are being loaded...</p>
            </div>
        `;
        return;
    }
    
    // Create skill cards
    availableSkills.forEach(skill => {
        const skillCard = createSkillCard(skill, category);
        skillsContainer.appendChild(skillCard);
    });
}

// Create a skill card element
function createSkillCard(skill, level) {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.dataset.skillId = skill.id;
    skillCard.dataset.level = level;
    
    const isSelected = selectedSkills.has(`${skill.id}-${level}`);
    if (isSelected) {
        skillCard.classList.add('selected');
    }
    
    skillCard.innerHTML = `
        <div class="skill-header">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level ${level}">${level}</div>
        </div>
        <div class="skill-category">${skill.category || 'General'}</div>
    `;
    
    // Add click handler
    skillCard.addEventListener('click', () => toggleSkillSelection(skill, level, skillCard));
    
    return skillCard;
}

// Toggle skill selection
function toggleSkillSelection(skill, level, cardElement) {
    const skillKey = `${skill.id}-${level}`;
    
    if (selectedSkills.has(skillKey)) {
        // Remove from selection
        selectedSkills.delete(skillKey);
        cardElement.classList.remove('selected');
    } else {
        // Add to selection
        selectedSkills.add(skillKey);
        cardElement.classList.add('selected');
    }
    
    // Update selected skills display
    updateSelectedSkillsDisplay();
}

// Update the selected skills display
function updateSelectedSkillsDisplay() {
    const selectedCountElement = document.getElementById('selected-count');
    const selectedSkillsList = document.getElementById('selected-skills-list');
    
    if (selectedCountElement) {
        selectedCountElement.textContent = selectedSkills.size;
    }
    
    if (selectedSkillsList) {
        selectedSkillsList.innerHTML = '';
        
        selectedSkills.forEach(skillKey => {
            const [skillId, level] = skillKey.split('-');
            const skill = availableSkills.find(s => s.id === skillId);
            
            if (skill) {
                const skillTag = document.createElement('div');
                skillTag.className = 'selected-skill-tag';
                skillTag.innerHTML = `
                    <span>${skill.name} (${level})</span>
                    <button class="remove-skill" onclick="removeSelectedSkill('${skillKey}')">×</button>
                `;
                selectedSkillsList.appendChild(skillTag);
            }
        });
    }
}

// Remove a selected skill
export function removeSelectedSkill(skillKey) {
    selectedSkills.delete(skillKey);
    
    // Update UI
    const [skillId, level] = skillKey.split('-');
    const skillCard = document.querySelector(`[data-skill-id="${skillId}"][data-level="${level}"]`);
    if (skillCard) {
        skillCard.classList.remove('selected');
    }
    
    updateSelectedSkillsDisplay();
}

// Show skills for a specific category
export function showSkillCategory(category) {
    currentSkillCategory = category;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category) {
            btn.classList.add('active');
        }
    });
    
    // Display skills for this category
    displaySkillsForCategory(category);
}

// Complete onboarding process
export async function completeOnboarding() {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    if (selectedSkills.size === 0) {
        showNotification('Please select at least one skill', 'warning');
        return;
    }
    
    try {
        // Save selected skills to Firestore
        for (const skillKey of selectedSkills) {
            const [skillId, level] = skillKey.split('-');
            const skill = availableSkills.find(s => s.id === skillId);
            
            if (skill) {
                await addUserSkill(user.uid, {
                    skillId: skillId,
                    skillName: skill.name,
                    level: level,
                    category: skill.category || 'General'
                });
            }
        }
        
        // Update user profile to mark onboarding as completed
        await updateUserProfile(user.uid, {
            skillsCompleted: true,
            onboardingCompleted: true,
            onboardingCompletedAt: new Date()
        });
        
        // Log activity
        await addActivityLog(user.uid, {
            type: 'onboarding_completed',
            description: `Completed onboarding with ${selectedSkills.size} skills`,
            data: { skillCount: selectedSkills.size }
        });
        
        showNotification('Onboarding completed successfully!', 'success');
        
        // Show completion animation
        showCompletionAnimation();
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
            window.showPage('dashboard');
        }, 3000);
        
    } catch (error) {
        console.error('Error completing onboarding:', error);
        showNotification('Error completing onboarding. Please try again.', 'error');
    }
}

// Show completion animation
function showCompletionAnimation() {
    const onboardingContainer = document.querySelector('.onboarding-container');
    
    if (onboardingContainer) {
        onboardingContainer.innerHTML = `
            <div class="completion-animation">
                <div class="completion-checkmark">✓</div>
                <div class="completion-message">
                    <h2>Welcome to DreamMaps!</h2>
                    <p>Your profile has been set up successfully. Get ready to track your learning journey!</p>
                </div>
            </div>
        `;
    }
}

// Initialize onboarding when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load skills when skill selection step is shown
    const skillSelectionStep = document.getElementById('skill-selection');
    if (skillSelectionStep) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!skillSelectionStep.classList.contains('hidden')) {
                        loadSkillSelection();
                    }
                }
            });
        });
        
        observer.observe(skillSelectionStep, { attributes: true });
    }
});

// Make functions available globally
window.handleAdditionalDetails = handleAdditionalDetails;
window.showSkillCategory = showSkillCategory;
window.completeOnboarding = completeOnboarding;
window.removeSelectedSkill = removeSelectedSkill;