// Skills management functionality
import { getCurrentUser } from './auth.js';
import { getUserSkills, addUserSkill, removeUserSkill, updateUserSkill, getAvailableSkills, createSkill, addActivityLog } from './database.js';

// Global state
let userSkills = [];
let availableSkills = [];
let currentFilter = 'all';

// Load skills data
export async function loadSkillsData() {
    const user = getCurrentUser();
    if (!user) {
        console.error('No user logged in');
        return;
    }
    
    try {
        // Load user skills and available skills
        [userSkills, availableSkills] = await Promise.all([
            getUserSkills(user.uid),
            getAvailableSkills()
        ]);
        
        // Display user skills
        displayUserSkills();
        
    } catch (error) {
        console.error('Error loading skills data:', error);
        showNotification('Error loading skills data', 'error');
    }
}

// Display user skills
function displayUserSkills() {
    const skillsGrid = document.getElementById('user-skills-grid');
    if (!skillsGrid) return;
    
    // Filter skills based on current filter
    let filteredSkills = userSkills;
    if (currentFilter !== 'all') {
        filteredSkills = userSkills.filter(skill => skill.level === currentFilter);
    }
    
    if (filteredSkills.length === 0) {
        skillsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>No skills found</h3>
                <p>${currentFilter === 'all' ? 'Start adding skills to track your progress' : `No ${currentFilter} level skills found`}</p>
                <button onclick="showAddSkillModal()" class="btn btn-primary">Add Your First Skill</button>
            </div>
        `;
        return;
    }
    
    skillsGrid.innerHTML = filteredSkills.map(skill => createUserSkillCard(skill)).join('');
}

// Create user skill card
function createUserSkillCard(skill) {
    return `
        <div class="skill-card" data-skill-id="${skill.id}">
            <div class="skill-header">
                <div class="skill-name">${skill.skillName}</div>
                <div class="skill-level ${skill.level}">${skill.level}</div>
            </div>
            <div class="skill-category">${skill.category}</div>
            <div class="skill-actions">
                <button onclick="editSkill('${skill.id}')" class="btn btn-secondary btn-sm">Edit</button>
                <button onclick="removeSkill('${skill.id}')" class="btn btn-outline btn-sm">Remove</button>
                ${skill.videoLink ? `<a href="${skill.videoLink}" target="_blank" class="btn btn-primary btn-sm">Watch Video</a>` : ''}
            </div>
        </div>
    `;
}

// Filter skills by level
export function filterSkills(level) {
    currentFilter = level;
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === level || (level === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Display filtered skills
    displayUserSkills();
}

// Show add skill modal
export function showAddSkillModal() {
    const modal = document.getElementById('add-skill-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Clear form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Close add skill modal
export function closeAddSkillModal() {
    const modal = document.getElementById('add-skill-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Add new skill
export async function addNewSkill(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    const skillName = document.getElementById('new-skill-name').value;
    const skillLevel = document.getElementById('new-skill-level').value;
    const videoLink = document.getElementById('new-skill-video').value;
    
    if (!skillName || !skillLevel) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    try {
        // Check if skill already exists for this user at this level
        const existingSkill = userSkills.find(skill => 
            skill.skillName.toLowerCase() === skillName.toLowerCase() && 
            skill.level === skillLevel
        );
        
        if (existingSkill) {
            showNotification('You already have this skill at this level', 'warning');
            return;
        }
        
        // Check if skill exists in available skills, if not create it
        let availableSkill = availableSkills.find(skill => 
            skill.name.toLowerCase() === skillName.toLowerCase()
        );
        
        if (!availableSkill) {
            // Create new skill in available skills
            const skillId = await createSkill({
                name: skillName,
                category: 'User Added'
            });
            
            availableSkill = { id: skillId, name: skillName, category: 'User Added' };
            availableSkills.push(availableSkill);
        }
        
        // Add skill to user's skills
        const userSkillData = {
            skillId: availableSkill.id,
            skillName: skillName,
            level: skillLevel,
            category: availableSkill.category || 'General'
        };
        
        if (videoLink) {
            userSkillData.videoLink = videoLink;
        }
        
        const userSkillId = await addUserSkill(user.uid, userSkillData);
        
        // Add to local array
        userSkills.push({
            id: userSkillId,
            ...userSkillData
        });
        
        // Log activity
        await addActivityLog(user.uid, {
            type: 'skill_added',
            description: `Added skill: ${skillName}`,
            data: { skillName: skillName, level: skillLevel }
        });
        
        showNotification('Skill added successfully!', 'success');
        closeAddSkillModal();
        displayUserSkills();
        
    } catch (error) {
        console.error('Error adding skill:', error);
        showNotification('Error adding skill. Please try again.', 'error');
    }
}

// Edit skill
export function editSkill(skillId) {
    const skill = userSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    // For now, we'll use a simple prompt - in a real app, you'd want a proper modal
    const newLevel = prompt(`Change level for ${skill.skillName} (current: ${skill.level})`, skill.level);
    
    if (newLevel && newLevel !== skill.level && ['newbie', 'intermediate', 'advanced'].includes(newLevel)) {
        updateSkillLevel(skillId, newLevel);
    }
}

// Update skill level
async function updateSkillLevel(skillId, newLevel) {
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        await updateUserSkill(skillId, { level: newLevel });
        
        // Update local array
        const skillIndex = userSkills.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
            const oldLevel = userSkills[skillIndex].level;
            userSkills[skillIndex].level = newLevel;
            
            // Log activity
            await addActivityLog(user.uid, {
                type: 'skill_updated',
                description: `Updated ${userSkills[skillIndex].skillName} from ${oldLevel} to ${newLevel}`,
                data: { 
                    skillName: userSkills[skillIndex].skillName, 
                    oldLevel: oldLevel,
                    newLevel: newLevel 
                }
            });
        }
        
        showNotification('Skill level updated successfully!', 'success');
        displayUserSkills();
        
    } catch (error) {
        console.error('Error updating skill:', error);
        showNotification('Error updating skill. Please try again.', 'error');
    }
}

// Remove skill
export async function removeSkill(skillId) {
    const skill = userSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    if (!confirm(`Are you sure you want to remove "${skill.skillName}" from your skills?`)) {
        return;
    }
    
    const user = getCurrentUser();
    if (!user) return;
    
    try {
        await removeUserSkill(skillId);
        
        // Remove from local array
        userSkills = userSkills.filter(s => s.id !== skillId);
        
        // Log activity
        await addActivityLog(user.uid, {
            type: 'skill_removed',
            description: `Removed skill: ${skill.skillName}`,
            data: { skillName: skill.skillName, level: skill.level }
        });
        
        showNotification('Skill removed successfully!', 'success');
        displayUserSkills();
        
    } catch (error) {
        console.error('Error removing skill:', error);
        showNotification('Error removing skill. Please try again.', 'error');
    }
}

// Search skills
export function searchSkills(query) {
    const searchResults = userSkills.filter(skill => 
        skill.skillName.toLowerCase().includes(query.toLowerCase()) ||
        skill.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Display search results
    const skillsGrid = document.getElementById('user-skills-grid');
    if (skillsGrid) {
        if (searchResults.length === 0) {
            skillsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No skills found</h3>
                    <p>No skills match your search query "${query}"</p>
                </div>
            `;
        } else {
            skillsGrid.innerHTML = searchResults.map(skill => createUserSkillCard(skill)).join('');
        }
    }
}

// Export skill data
export function exportSkills() {
    if (userSkills.length === 0) {
        showNotification('No skills to export', 'warning');
        return;
    }
    
    const skillsData = userSkills.map(skill => ({
        name: skill.skillName,
        level: skill.level,
        category: skill.category,
        videoLink: skill.videoLink || ''
    }));
    
    const dataStr = JSON.stringify(skillsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'my-skills.json';
    link.click();
    
    showNotification('Skills exported successfully!', 'success');
}

// Initialize skills page
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality if search input exists
    const searchInput = document.getElementById('skills-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.trim();
                if (query) {
                    searchSkills(query);
                } else {
                    displayUserSkills();
                }
            }, 300);
        });
    }
});

// Make functions available globally
window.loadSkillsData = loadSkillsData;
window.filterSkills = filterSkills;
window.showAddSkillModal = showAddSkillModal;
window.closeAddSkillModal = closeAddSkillModal;
window.addNewSkill = addNewSkill;
window.editSkill = editSkill;
window.removeSkill = removeSkill;
window.exportSkills = exportSkills;