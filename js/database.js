// Database functionality using Firestore
import { db } from './firebase-config.js';
import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    deleteDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// User Profile Operations
export async function createUserProfile(userId, userData) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log('User profile created successfully');
        return true;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
}

export async function getUserProfile(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        } else {
            console.log('No user profile found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
}

export async function updateUserProfile(userId, userData) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...userData,
            updatedAt: serverTimestamp()
        });
        console.log('User profile updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

// Skills Operations
export async function getAvailableSkills() {
    try {
        const skillsRef = collection(db, 'skills');
        const skillsSnap = await getDocs(skillsRef);
        
        const skills = [];
        skillsSnap.forEach((doc) => {
            skills.push({ id: doc.id, ...doc.data() });
        });
        
        return skills;
    } catch (error) {
        console.error('Error getting skills:', error);
        throw error;
    }
}

export async function createSkill(skillData) {
    try {
        const skillsRef = collection(db, 'skills');
        const docRef = await addDoc(skillsRef, {
            ...skillData,
            createdAt: serverTimestamp()
        });
        console.log('Skill created with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating skill:', error);
        throw error;
    }
}

// User Skills Operations
export async function getUserSkills(userId) {
    try {
        const userSkillsRef = collection(db, 'userSkills');
        const q = query(userSkillsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const userSkills = [];
        querySnapshot.forEach((doc) => {
            userSkills.push({ id: doc.id, ...doc.data() });
        });
        
        return userSkills;
    } catch (error) {
        console.error('Error getting user skills:', error);
        throw error;
    }
}

export async function addUserSkill(userId, skillData) {
    try {
        const userSkillsRef = collection(db, 'userSkills');
        const docRef = await addDoc(userSkillsRef, {
            userId: userId,
            ...skillData,
            createdAt: serverTimestamp()
        });
        console.log('User skill added with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding user skill:', error);
        throw error;
    }
}

export async function removeUserSkill(userSkillId) {
    try {
        const userSkillRef = doc(db, 'userSkills', userSkillId);
        await deleteDoc(userSkillRef);
        console.log('User skill removed successfully');
        return true;
    } catch (error) {
        console.error('Error removing user skill:', error);
        throw error;
    }
}

export async function updateUserSkill(userSkillId, skillData) {
    try {
        const userSkillRef = doc(db, 'userSkills', userSkillId);
        await updateDoc(userSkillRef, {
            ...skillData,
            updatedAt: serverTimestamp()
        });
        console.log('User skill updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating user skill:', error);
        throw error;
    }
}

// Categories Operations
export async function getCategories() {
    try {
        const categoriesRef = collection(db, 'categories');
        const categoriesSnap = await getDocs(categoriesRef);
        
        const categories = [];
        categoriesSnap.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        
        return categories;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

// Activity Log Operations
export async function addActivityLog(userId, activityData) {
    try {
        const activitiesRef = collection(db, 'activities');
        const docRef = await addDoc(activitiesRef, {
            userId: userId,
            ...activityData,
            timestamp: serverTimestamp()
        });
        console.log('Activity logged with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error logging activity:', error);
        throw error;
    }
}

export async function getUserActivities(userId, limit = 10) {
    try {
        const activitiesRef = collection(db, 'activities');
        const q = query(
            activitiesRef, 
            where('userId', '==', userId),
            orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        
        const activities = [];
        let count = 0;
        querySnapshot.forEach((doc) => {
            if (count < limit) {
                activities.push({ id: doc.id, ...doc.data() });
                count++;
            }
        });
        
        return activities;
    } catch (error) {
        console.error('Error getting user activities:', error);
        throw error;
    }
}

// Initialize default data
export async function initializeDefaultData() {
    try {
        // Check if skills already exist
        const skills = await getAvailableSkills();
        if (skills.length === 0) {
            // Create default skills
            const defaultSkills = [
                { name: 'JavaScript', category: 'Programming' },
                { name: 'Python', category: 'Programming' },
                { name: 'HTML/CSS', category: 'Web Development' },
                { name: 'React', category: 'Web Development' },
                { name: 'Node.js', category: 'Backend Development' },
                { name: 'Database Design', category: 'Database' },
                { name: 'UI/UX Design', category: 'Design' },
                { name: 'Project Management', category: 'Management' },
                { name: 'Data Analysis', category: 'Data Science' },
                { name: 'Machine Learning', category: 'Data Science' },
                { name: 'Digital Marketing', category: 'Marketing' },
                { name: 'Content Writing', category: 'Content' },
                { name: 'Photography', category: 'Creative' },
                { name: 'Video Editing', category: 'Creative' },
                { name: 'Public Speaking', category: 'Communication' }
            ];
            
            for (const skill of defaultSkills) {
                await createSkill(skill);
            }
            
            console.log('Default skills created');
        }
        
        // Check if categories already exist
        const categories = await getCategories();
        if (categories.length === 0) {
            // Create default categories
            const defaultCategories = [
                { name: 'newbie', displayName: 'Newbie', description: 'Just starting out' },
                { name: 'intermediate', displayName: 'Intermediate', description: 'Some experience' },
                { name: 'advanced', displayName: 'Advanced', description: 'Highly skilled' }
            ];
            
            const categoriesRef = collection(db, 'categories');
            for (const category of defaultCategories) {
                await addDoc(categoriesRef, {
                    ...category,
                    createdAt: serverTimestamp()
                });
            }
            
            console.log('Default categories created');
        }
        
    } catch (error) {
        console.error('Error initializing default data:', error);
    }
}

// Statistics Operations
export async function getUserStats(userId) {
    try {
        const userSkills = await getUserSkills(userId);
        
        const stats = {
            totalSkills: userSkills.length,
            newbieSkills: userSkills.filter(skill => skill.level === 'newbie').length,
            intermediateSkills: userSkills.filter(skill => skill.level === 'intermediate').length,
            advancedSkills: userSkills.filter(skill => skill.level === 'advanced').length
        };
        
        return stats;
    } catch (error) {
        console.error('Error getting user stats:', error);
        throw error;
    }
}