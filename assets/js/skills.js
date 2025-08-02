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
        videoUrl: document.getElementById('new-skill-video').value,
        courseContent: document.getElementById('new-skill-content').value,
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
    const levelBadge = document.getElementById('skill-detail-level');
    levelBadge.textContent = skill.level;
    levelBadge.className = `skill-badge ${skill.level}`;
    document.getElementById('skill-detail-category').textContent = skill.category || 'Other';
    document.getElementById('skill-detail-progress').textContent = `${skill.progress || 0}%`;
    
    // Show/hide video section
    const videoSection = document.getElementById('skill-video-section');
    if (skill.videoUrl) {
        videoSection.style.display = 'block';
        displayVideo(skill.videoUrl);
    } else {
        videoSection.style.display = 'none';
    }
    
    // Show/hide course content section
    const contentSection = document.getElementById('skill-content-section');
    if (skill.courseContent) {
        contentSection.style.display = 'block';
        document.getElementById('skill-detail-content').innerHTML = formatCourseContent(skill.courseContent);
    } else {
        contentSection.style.display = 'none';
    }
    
    // Show/hide notes section
    const notesSection = document.getElementById('skill-notes-section');
    if (skill.notes) {
        notesSection.style.display = 'block';
        document.getElementById('skill-detail-notes').textContent = skill.notes;
    } else {
        notesSection.style.display = 'none';
    }
    
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

// Display video in skill modal
function displayVideo(videoUrl) {
    const container = document.getElementById('skill-video-container');
    
    if (isYouTubeURL(videoUrl)) {
        const videoId = extractYouTubeID(videoUrl);
        container.innerHTML = `
            <iframe class="video-player" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen>
            </iframe>
        `;
    } else if (isVideoURL(videoUrl)) {
        container.innerHTML = `
            <video class="video-player" controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        container.innerHTML = `
            <div class="video-placeholder">
                <div class="video-placeholder-icon">📹</div>
                <h5>Invalid Video URL</h5>
                <p>Please provide a valid YouTube or video file URL</p>
            </div>
        `;
    }
}

// Check if URL is YouTube
function isYouTubeURL(url) {
    return url.includes('youtube.com/watch') || url.includes('youtu.be/');
}

// Extract YouTube video ID
function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Check if URL is a video file
function isVideoURL(url) {
    return /\.(mp4|webm|ogg|avi|mov)$/i.test(url);
}

// Format course content with basic markdown-like formatting
function formatCourseContent(content) {
    if (!content) return '';
    
    let formatted = content
        // Headers
        .replace(/^### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^## (.*$)/gim, '<h5>$1</h5>')
        .replace(/^# (.*$)/gim, '<h5>$1</h5>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        // Lists
        .replace(/^\* (.+$)/gim, '<li>$1</li>')
        .replace(/^- (.+$)/gim, '<li>$1</li>')
        // Highlights
        .replace(/==(.*)==/gim, '<span class="highlight">$1</span>')
        // Line breaks
        .replace(/\n/g, '<br>');
    
    // Wrap consecutive list items in ul tags
    formatted = formatted.replace(/(<li>.*<\/li>(?:<br>)*)+/gim, function(match) {
        return '<ul>' + match.replace(/<br>/g, '') + '</ul>';
    });
    
    return formatted;
}

// Start learning function
export function startLearning() {
    showNotification('Learning mode activated! 📚', 'info');
    // Additional learning functionality can be added here
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
window.startLearning = startLearning;