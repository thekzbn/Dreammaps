// Skills management module
import { getCurrentUser } from './auth.js';
import { getUserSkills, addUserSkill, updateUserSkill, deleteUserSkill, filterUserSkillsByLevel, searchUserSkills } from './database.js';
import { showNotification, debounce } from './main.js';
import { isDevelopment } from './firebase-config.js';

// Skills state
let currentSkills = [];
let currentFilter = 'all';
let currentSkillId = null;

// Load skills data
export async function loadSkillsData() {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        currentSkills = await getUserSkills(user.uid);
        displaySkills(currentSkills);
        updateNoSkillsMessage();
    } catch (error) {
        console.error('Error loading skills:', error);
        showNotification('Error loading skills.', 'error');
    }
}

// Display skills
function displaySkills(skills) {
    const skillsGrid = document.getElementById('user-skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card" data-skill-id="${skill.id}" onclick="showSkillDetail('${skill.id}')">
            <div class="skill-badge ${skill.level}">${skill.level}</div>
            <div class="skill-name">${skill.skillName}</div>
            <div class="skill-category">${skill.category || 'Other'}</div>
        </div>
    `).join('');
}

// Filter skills
export function filterSkills(level) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === level) {
            btn.classList.add('active');
        }
    });
    
    currentFilter = level;
    
    if (level === 'all') {
        displaySkills(currentSkills);
    } else {
        const filteredSkills = currentSkills.filter(skill => skill.level === level);
        displaySkills(filteredSkills);
    }
    
    updateNoSkillsMessage();
}

// Search skills
export const searchSkills = debounce(async () => {
    const searchTerm = document.getElementById('skill-search').value;
    const user = getCurrentUser();
    
    if (!user || !searchTerm.trim()) {
        displaySkills(currentSkills);
        return;
    }
    
    try {
        const filteredSkills = await searchUserSkills(user.uid, searchTerm);
        displaySkills(filteredSkills);
        updateNoSkillsMessage();
    } catch (error) {
        console.error('Error searching skills:', error);
    }
}, 300);

// Show add skill modal
export function showAddSkillModal() {
    const modal = document.getElementById('add-skill-modal');
    modal.classList.remove('hidden');
}

// Close add skill modal
export function closeAddSkillModal() {
    const modal = document.getElementById('add-skill-modal');
    modal.classList.add('hidden');
    modal.querySelector('form').reset();
}

// Add new skill
export async function addNewSkill(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) return;
    
    const skillData = {
        skillName: document.getElementById('new-skill-name').value,
        level: document.getElementById('new-skill-level').value,
        category: document.getElementById('new-skill-category').value,
        resourceUrl: document.getElementById('new-skill-video').value,
        notes: document.getElementById('new-skill-notes').value
    };
    
    try {
        await addUserSkill(user.uid, skillData);
        showNotification('Skill added successfully!', 'success');
        closeAddSkillModal();
        loadSkillsData();
    } catch (error) {
        console.error('Error adding skill:', error);
        showNotification('Error adding skill.', 'error');
    }
}

// Show skill detail modal
export function showSkillDetail(skillId) {
    const skill = currentSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    currentSkillId = skillId;
    
    // Populate modal
    document.getElementById('skill-detail-name').textContent = skill.skillName;
    document.getElementById('skill-detail-level').textContent = skill.level;
    document.getElementById('skill-detail-category').textContent = skill.category || 'Other';
    
    // Show modal
    const modal = document.getElementById('skill-detail-modal');
    modal.classList.remove('hidden');
}

// Close skill detail modal
export function closeSkillDetailModal() {
    const modal = document.getElementById('skill-detail-modal');
    modal.classList.add('hidden');
    currentSkillId = null;
}

// Update skill level
export async function updateSkillLevel(newLevel) {
    if (!currentSkillId) return;
    
    try {
        await updateUserSkill(currentSkillId, { level: newLevel });
        showNotification('Skill level updated!', 'success');
        closeSkillDetailModal();
        loadSkillsData();
    } catch (error) {
        console.error('Error updating skill:', error);
        showNotification('Error updating skill.', 'error');
    }
}

// Delete skill
export async function deleteSkill() {
    if (!currentSkillId) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
        await deleteUserSkill(currentSkillId, user.uid);
        showNotification('Skill deleted successfully!', 'success');
        closeSkillDetailModal();
        loadSkillsData();
    } catch (error) {
        console.error('Error deleting skill:', error);
        showNotification('Error deleting skill.', 'error');
    }
}

// Update no skills message
function updateNoSkillsMessage() {
    const noSkillsMessage = document.getElementById('no-skills-message');
    const skillsGrid = document.getElementById('user-skills-grid');
    
    if (!noSkillsMessage || !skillsGrid) return;
    
    if (skillsGrid.children.length === 0) {
        noSkillsMessage.classList.remove('hidden');
    } else {
        noSkillsMessage.classList.add('hidden');
    }
}

// Make functions globally available
window.filterSkills = filterSkills;
window.searchSkills = searchSkills;
window.showAddSkillModal = showAddSkillModal;
window.closeAddSkillModal = closeAddSkillModal;
window.addNewSkill = addNewSkill;
window.showSkillDetail = showSkillDetail;
window.closeSkillDetailModal = closeSkillDetailModal;
window.updateSkillLevel = updateSkillLevel;
window.deleteSkill = deleteSkill;