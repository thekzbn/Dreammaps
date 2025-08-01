// Onboarding module
import { getCurrentUser } from './auth.js';
import { updateUserProfile, getDefaultSkills, addSelectedSkills } from './database.js';
import { showNotification, showPage } from './main.js';
import { isDevelopment } from './firebase-config.js';

// Onboarding state
let currentStep = 'additional-details';
let selectedSkills = [];
let availableSkills = {};

// Initialize onboarding
export async function initializeOnboarding() {
    try {
        if (isDevelopment) {
            console.log('🎯 Initializing onboarding...');
        }
        
        // Load default skills
        availableSkills = await getDefaultSkills();
        
        // Show first step
        showOnboardingStep('additional-details');
        
        // Load skills for the skill selection step
        await loadSkillsForSelection();
        
    } catch (error) {
        console.error('Error initializing onboarding:', error);
        showNotification('Error loading onboarding. Please try again.', 'error');
    }
}

// Show onboarding step
function showOnboardingStep(stepName) {
    // Hide all steps
    const steps = document.querySelectorAll('.onboarding-step');
    steps.forEach(step => step.classList.add('hidden'));
    
    // Show selected step
    const targetStep = document.getElementById(stepName);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        currentStep = stepName;
    }
}

// Handle additional details form
export async function handleAdditionalDetails(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please sign in to continue.', 'error');
        return;
    }
    
    const formData = {
        gender: document.getElementById('gender').value,
        dateOfBirth: document.getElementById('dob').value,
        school: document.getElementById('school').value,
        schoolLevel: document.getElementById('school-level').value,
        department: document.getElementById('department').value
    };
    
    // Validate required fields
    if (!formData.gender || !formData.dateOfBirth || !formData.school || 
        !formData.schoolLevel || !formData.department) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    try {
        // Update user profile
        await updateUserProfile(user.uid, formData);
        
        // Move to skill selection
        showOnboardingStep('skill-selection');
        showNotification('Profile updated! Now select your skills.', 'success');
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('Error updating profile. Please try again.', 'error');
    }
}

// Load skills for selection
async function loadSkillsForSelection() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    // Show newbie skills by default
    showSkillCategory('newbie');
}

// Show skill category
export function showSkillCategory(category) {
    const skillsContainer = document.getElementById('skills-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (!skillsContainer || !availableSkills[category]) return;
    
    // Update active tab
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Clear container
    skillsContainer.innerHTML = '';
    
    // Add skills for category
    availableSkills[category].forEach(skill => {
        const skillCard = createSkillCard(skill);
        skillsContainer.appendChild(skillCard);
    });
}

// Create skill card element
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.setAttribute('data-skill-id', skill.id);
    
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    if (isSelected) {
        card.classList.add('selected');
    }
    
    card.innerHTML = `
        <div class="skill-level-badge ${skill.level}">${skill.level}</div>
        <div class="skill-icon">${skill.icon || '🎯'}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-description">${skill.description || ''}</div>
    `;
    
    card.addEventListener('click', () => toggleSkillSelection(skill, card));
    
    return card;
}

// Toggle skill selection
function toggleSkillSelection(skill, cardElement) {
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    
    if (isSelected) {
        // Remove skill
        selectedSkills = selectedSkills.filter(s => s.id !== skill.id);
        cardElement.classList.remove('selected');
    } else {
        // Add skill
        selectedSkills.push(skill);
        cardElement.classList.add('selected');
    }
    
    updateSelectedSkillsDisplay();
    updateCompleteButton();
}

// Update selected skills display
function updateSelectedSkillsDisplay() {
    const countElement = document.getElementById('selected-count');
    const listElement = document.getElementById('selected-skills-list');
    
    if (countElement) {
        countElement.textContent = selectedSkills.length;
    }
    
    if (listElement) {
        if (selectedSkills.length === 0) {
            listElement.innerHTML = '<div class="empty-selection">No skills selected yet</div>';
        } else {
            listElement.innerHTML = selectedSkills.map(skill => `
                <div class="selected-skill-tag">
                    ${skill.name}
                    <button class="selected-skill-remove" onclick="removeSelectedSkill('${skill.id}')">×</button>
                </div>
            `).join('');
        }
    }
}

// Remove selected skill
export function removeSelectedSkill(skillId) {
    selectedSkills = selectedSkills.filter(s => s.id !== skillId);
    
    // Update UI
    const skillCard = document.querySelector(`[data-skill-id="${skillId}"]`);
    if (skillCard) {
        skillCard.classList.remove('selected');
    }
    
    updateSelectedSkillsDisplay();
    updateCompleteButton();
}

// Update complete button state
function updateCompleteButton() {
    const completeBtn = document.getElementById('complete-btn');
    if (completeBtn) {
        completeBtn.disabled = selectedSkills.length === 0;
    }
}

// Go back to details step
export function goBackToDetails() {
    showOnboardingStep('additional-details');
}

// Complete onboarding
export async function completeOnboarding() {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please sign in to continue.', 'error');
        return;
    }
    
    if (selectedSkills.length === 0) {
        showNotification('Please select at least one skill.', 'error');
        return;
    }
    
    try {
        // Add selected skills to user profile
        await addSelectedSkills(user.uid, selectedSkills);
        
        // Mark onboarding as completed
        await updateUserProfile(user.uid, {
            onboardingCompleted: true,
            onboardingCompletedAt: new Date()
        });
        
        showNotification('Welcome to DreamMaps! Your profile is set up.', 'success');
        
        // Navigate to dashboard
        showPage('dashboard');
        
    } catch (error) {
        console.error('Error completing onboarding:', error);
        showNotification('Error completing setup. Please try again.', 'error');
    }
}

// Make functions globally available
window.handleAdditionalDetails = handleAdditionalDetails;
window.showSkillCategory = showSkillCategory;
window.removeSelectedSkill = removeSelectedSkill;
window.goBackToDetails = goBackToDetails;
window.completeOnboarding = completeOnboarding;