// Database module for Firestore operations
import { db, handleFirebaseError, isDevelopment } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    addDoc,
    query, 
    where, 
    orderBy, 
    limit,
    serverTimestamp,
    writeBatch
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Collections
const COLLECTIONS = {
    USERS: 'users',
    USER_SKILLS: 'userSkills',
    SKILLS: 'skills',
    CATEGORIES: 'categories',
    ACTIVITIES: 'activities'
};

// Default skills data
const DEFAULT_SKILLS = {
    newbie: [
        { name: 'HTML Basics', category: 'Web Development', icon: '📝', description: 'Learn the fundamentals of HTML markup' },
        { name: 'CSS Fundamentals', category: 'Web Development', icon: '🎨', description: 'Style web pages with CSS' },
        { name: 'JavaScript Basics', category: 'Programming', icon: '⚡', description: 'Learn JavaScript programming fundamentals' },
        { name: 'Git Version Control', category: 'Development Tools', icon: '📚', description: 'Track changes in your code' },
        { name: 'Basic Photography', category: 'Creative', icon: '📸', description: 'Learn photography composition and basics' },
        { name: 'Social Media Marketing', category: 'Marketing', icon: '📱', description: 'Promote content on social platforms' },
        { name: 'Microsoft Office', category: 'Productivity', icon: '💼', description: 'Master Word, Excel, and PowerPoint' },
        { name: 'Time Management', category: 'Personal Development', icon: '⏰', description: 'Organize and prioritize tasks effectively' }
    ],
    intermediate: [
        { name: 'React.js', category: 'Web Development', icon: '⚛️', description: 'Build interactive user interfaces' },
        { name: 'Node.js', category: 'Backend Development', icon: '🟢', description: 'Server-side JavaScript development' },
        { name: 'Python Programming', category: 'Programming', icon: '🐍', description: 'Versatile programming language' },
        { name: 'Database Design', category: 'Data Management', icon: '🗄️', description: 'Design efficient database structures' },
        { name: 'UI/UX Design', category: 'Design', icon: '🎯', description: 'Create user-centered designs' },
        { name: 'Digital Marketing', category: 'Marketing', icon: '📊', description: 'Online marketing strategies and analytics' },
        { name: 'Project Management', category: 'Management', icon: '📋', description: 'Plan and execute projects successfully' },
        { name: 'Data Analysis', category: 'Analytics', icon: '📈', description: 'Analyze and interpret data patterns' }
    ],
    advanced: [
        { name: 'System Architecture', category: 'Software Engineering', icon: '🏗️', description: 'Design scalable system architectures' },
        { name: 'Machine Learning', category: 'AI/ML', icon: '🤖', description: 'Build intelligent applications' },
        { name: 'DevOps & CI/CD', category: 'Infrastructure', icon: '🔄', description: 'Automate deployment and operations' },
        { name: 'Cybersecurity', category: 'Security', icon: '🔒', description: 'Protect systems and data' },
        { name: 'Cloud Computing', category: 'Infrastructure', icon: '☁️', description: 'Deploy and manage cloud services' },
        { name: 'Business Strategy', category: 'Business', icon: '💡', description: 'Develop strategic business plans' },
        { name: 'Team Leadership', category: 'Leadership', icon: '👥', description: 'Lead and motivate teams effectively' },
        { name: 'Advanced Analytics', category: 'Data Science', icon: '🔬', description: 'Complex data modeling and prediction' }
    ]
};

// User Profile Operations
export async function createUserProfile(userId, profileData) {
    try {
        if (isDevelopment) {
            console.log('📝 Creating user profile for:', userId);
        }
        
        const userDoc = doc(db, COLLECTIONS.USERS, userId);
        await setDoc(userDoc, {
            ...profileData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        if (isDevelopment) {
            console.log('✅ User profile created successfully');
        }
        
        return true;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw handleFirebaseError(error);
    }
}

export async function getUserProfile(userId) {
    try {
        if (isDevelopment) {
            console.log('👤 Fetching user profile for:', userId);
        }
        
        const userDoc = doc(db, COLLECTIONS.USERS, userId);
        const userSnap = await getDoc(userDoc);
        
        if (userSnap.exists()) {
            const userData = userSnap.data();
            
            if (isDevelopment) {
                console.log('✅ User profile found:', userData);
            }
            
            return userData;
        } else {
            if (isDevelopment) {
                console.log('❌ User profile not found');
            }
            
            return null;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw handleFirebaseError(error);
    }
}

export async function updateUserProfile(userId, updates) {
    try {
        if (isDevelopment) {
            console.log('📝 Updating user profile for:', userId, updates);
        }
        
        const userDoc = doc(db, COLLECTIONS.USERS, userId);
        await updateDoc(userDoc, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        
        if (isDevelopment) {
            console.log('✅ User profile updated successfully');
        }
        
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw handleFirebaseError(error);
    }
}

// Skills Operations
export async function getUserSkills(userId) {
    try {
        if (isDevelopment) {
            console.log('🎯 Fetching user skills for:', userId);
        }
        
        const skillsQuery = query(
            collection(db, COLLECTIONS.USER_SKILLS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(skillsQuery);
        const skills = [];
        
        querySnapshot.forEach((doc) => {
            skills.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        if (isDevelopment) {
            console.log('✅ User skills fetched:', skills.length, 'skills');
        }
        
        return skills;
    } catch (error) {
        console.error('Error fetching user skills:', error);
        throw handleFirebaseError(error);
    }
}

export async function addUserSkill(userId, skillData) {
    try {
        if (isDevelopment) {
            console.log('➕ Adding user skill:', skillData);
        }
        
        const skillDoc = await addDoc(collection(db, COLLECTIONS.USER_SKILLS), {
            userId: userId,
            skillName: skillData.skillName,
            level: skillData.level,
            category: skillData.category || '',
            notes: skillData.notes || '',
            resourceUrl: skillData.resourceUrl || '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        // Log activity
        await logActivity(userId, 'skill_added', {
            skillName: skillData.skillName,
            level: skillData.level
        });
        
        if (isDevelopment) {
            console.log('✅ User skill added successfully:', skillDoc.id);
        }
        
        return skillDoc.id;
    } catch (error) {
        console.error('Error adding user skill:', error);
        throw handleFirebaseError(error);
    }
}

export async function updateUserSkill(skillId, updates) {
    try {
        if (isDevelopment) {
            console.log('📝 Updating user skill:', skillId, updates);
        }
        
        const skillDoc = doc(db, COLLECTIONS.USER_SKILLS, skillId);
        await updateDoc(skillDoc, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        
        if (isDevelopment) {
            console.log('✅ User skill updated successfully');
        }
        
        return true;
    } catch (error) {
        console.error('Error updating user skill:', error);
        throw handleFirebaseError(error);
    }
}

export async function deleteUserSkill(skillId, userId) {
    try {
        if (isDevelopment) {
            console.log('🗑️ Deleting user skill:', skillId);
        }
        
        const skillDoc = doc(db, COLLECTIONS.USER_SKILLS, skillId);
        
        // Get skill data before deletion for activity log
        const skillSnap = await getDoc(skillDoc);
        const skillData = skillSnap.data();
        
        await deleteDoc(skillDoc);
        
        // Log activity
        if (skillData) {
            await logActivity(userId, 'skill_removed', {
                skillName: skillData.skillName,
                level: skillData.level
            });
        }
        
        if (isDevelopment) {
            console.log('✅ User skill deleted successfully');
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting user skill:', error);
        throw handleFirebaseError(error);
    }
}

// Activity Logging
export async function logActivity(userId, activityType, data = {}) {
    try {
        await addDoc(collection(db, COLLECTIONS.ACTIVITIES), {
            userId: userId,
            type: activityType,
            data: data,
            timestamp: serverTimestamp()
        });
        
        if (isDevelopment) {
            console.log('📝 Activity logged:', activityType, data);
        }
    } catch (error) {
        console.warn('Failed to log activity:', error);
    }
}

export async function getUserActivities(userId, limitCount = 10) {
    try {
        if (isDevelopment) {
            console.log('📋 Fetching user activities for:', userId);
        }
        
        const activitiesQuery = query(
            collection(db, COLLECTIONS.ACTIVITIES),
            where('userId', '==', userId),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );
        
        const querySnapshot = await getDocs(activitiesQuery);
        const activities = [];
        
        querySnapshot.forEach((doc) => {
            activities.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        if (isDevelopment) {
            console.log('✅ User activities fetched:', activities.length, 'activities');
        }
        
        return activities;
    } catch (error) {
        console.error('Error fetching user activities:', error);
        throw handleFirebaseError(error);
    }
}

// Default Data Initialization
export async function initializeDefaultData() {
    try {
        if (isDevelopment) {
            console.log('🔧 Initializing default data...');
        }
        
        // Check if default skills already exist
        const skillsSnapshot = await getDocs(collection(db, COLLECTIONS.SKILLS));
        
        if (skillsSnapshot.empty) {
            if (isDevelopment) {
                console.log('📚 Creating default skills...');
            }
            
            const batch = writeBatch(db);
            
            // Add default skills for each level
            Object.keys(DEFAULT_SKILLS).forEach(level => {
                DEFAULT_SKILLS[level].forEach(skill => {
                    const skillDoc = doc(collection(db, COLLECTIONS.SKILLS));
                    batch.set(skillDoc, {
                        ...skill,
                        level: level,
                        createdAt: serverTimestamp()
                    });
                });
            });
            
            await batch.commit();
            
            if (isDevelopment) {
                console.log('✅ Default skills created successfully');
            }
        }
        
        // Initialize categories if they don't exist
        await initializeCategories();
        
    } catch (error) {
        console.error('Error initializing default data:', error);
        // Don't throw error here as it's not critical for app functionality
    }
}

async function initializeCategories() {
    try {
        const categoriesSnapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
        
        if (categoriesSnapshot.empty) {
            if (isDevelopment) {
                console.log('📂 Creating default categories...');
            }
            
            const categories = [
                { name: 'newbie', displayName: 'Newbie', description: 'Just starting out', color: '#48bb78' },
                { name: 'intermediate', displayName: 'Intermediate', description: 'Some experience', color: '#ed8936' },
                { name: 'advanced', displayName: 'Advanced', description: 'Highly skilled', color: '#f56565' }
            ];
            
            const batch = writeBatch(db);
            
            categories.forEach(category => {
                const categoryDoc = doc(db, COLLECTIONS.CATEGORIES, category.name);
                batch.set(categoryDoc, {
                    ...category,
                    createdAt: serverTimestamp()
                });
            });
            
            await batch.commit();
            
            if (isDevelopment) {
                console.log('✅ Default categories created successfully');
            }
        }
    } catch (error) {
        console.warn('Failed to initialize categories:', error);
    }
}

// Get default skills for onboarding
export async function getDefaultSkills() {
    try {
        if (isDevelopment) {
            console.log('📚 Fetching default skills...');
        }
        
        const skillsQuery = query(
            collection(db, COLLECTIONS.SKILLS),
            orderBy('createdAt', 'asc')
        );
        
        const querySnapshot = await getDocs(skillsQuery);
        const skillsByLevel = {
            newbie: [],
            intermediate: [],
            advanced: []
        };
        
        querySnapshot.forEach((doc) => {
            const skillData = doc.data();
            if (skillsByLevel[skillData.level]) {
                skillsByLevel[skillData.level].push({
                    id: doc.id,
                    ...skillData
                });
            }
        });
        
        // If no skills in database, return default skills
        if (querySnapshot.empty) {
            if (isDevelopment) {
                console.log('📚 Using fallback default skills');
            }
            
            Object.keys(DEFAULT_SKILLS).forEach(level => {
                skillsByLevel[level] = DEFAULT_SKILLS[level].map((skill, index) => ({
                    id: `default-${level}-${index}`,
                    ...skill,
                    level: level
                }));
            });
        }
        
        if (isDevelopment) {
            console.log('✅ Default skills fetched:', {
                newbie: skillsByLevel.newbie.length,
                intermediate: skillsByLevel.intermediate.length,
                advanced: skillsByLevel.advanced.length
            });
        }
        
        return skillsByLevel;
    } catch (error) {
        console.error('Error fetching default skills:', error);
        
        // Return fallback default skills
        const skillsByLevel = {
            newbie: [],
            intermediate: [],
            advanced: []
        };
        
        Object.keys(DEFAULT_SKILLS).forEach(level => {
            skillsByLevel[level] = DEFAULT_SKILLS[level].map((skill, index) => ({
                id: `fallback-${level}-${index}`,
                ...skill,
                level: level
            }));
        });
        
        return skillsByLevel;
    }
}

// Batch operations for onboarding
export async function addSelectedSkills(userId, selectedSkills) {
    try {
        if (isDevelopment) {
            console.log('➕ Adding selected skills for user:', userId, selectedSkills);
        }
        
        const batch = writeBatch(db);
        
        selectedSkills.forEach(skill => {
            const skillDoc = doc(collection(db, COLLECTIONS.USER_SKILLS));
            batch.set(skillDoc, {
                userId: userId,
                skillName: skill.name,
                level: skill.level,
                category: skill.category || '',
                notes: '',
                resourceUrl: '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        });
        
        await batch.commit();
        
        // Log activity
        await logActivity(userId, 'onboarding_completed', {
            skillsCount: selectedSkills.length,
            levels: [...new Set(selectedSkills.map(s => s.level))]
        });
        
        if (isDevelopment) {
            console.log('✅ Selected skills added successfully');
        }
        
        return true;
    } catch (error) {
        console.error('Error adding selected skills:', error);
        throw handleFirebaseError(error);
    }
}

// Statistics and Analytics
export async function getUserStats(userId) {
    try {
        if (isDevelopment) {
            console.log('📊 Calculating user stats for:', userId);
        }
        
        const skills = await getUserSkills(userId);
        
        const stats = {
            totalSkills: skills.length,
            newbieSkills: skills.filter(s => s.level === 'newbie').length,
            intermediateSkills: skills.filter(s => s.level === 'intermediate').length,
            advancedSkills: skills.filter(s => s.level === 'advanced').length,
            categoryCounts: {}
        };
        
        // Count skills by category
        skills.forEach(skill => {
            const category = skill.category || 'Other';
            stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
        });
        
        if (isDevelopment) {
            console.log('✅ User stats calculated:', stats);
        }
        
        return stats;
    } catch (error) {
        console.error('Error calculating user stats:', error);
        throw handleFirebaseError(error);
    }
}

// Search and filter
export async function searchUserSkills(userId, searchTerm) {
    try {
        const skills = await getUserSkills(userId);
        
        const filteredSkills = skills.filter(skill => 
            skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (skill.category && skill.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        return filteredSkills;
    } catch (error) {
        console.error('Error searching user skills:', error);
        throw handleFirebaseError(error);
    }
}

export async function filterUserSkillsByLevel(userId, level) {
    try {
        const skills = await getUserSkills(userId);
        
        if (level === 'all') {
            return skills;
        }
        
        return skills.filter(skill => skill.level === level);
    } catch (error) {
        console.error('Error filtering user skills:', error);
        throw handleFirebaseError(error);
    }
}