# Firebase Setup Tutorial for DreamMaps

This tutorial will guide you through setting up Firebase for the DreamMaps Learning Management System.

## Prerequisites

- A Google account
- Basic understanding of web development
- The DreamMaps application files

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `dreammaps-lms` (or your preferred name)
4. Choose whether to enable Google Analytics (recommended)
5. Select or create a Google Analytics account if enabled
6. Click "Create project"

## Step 2: Set Up Firebase Authentication

1. In the Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following sign-in providers:
   - **Email/Password**: Click "Enable" and save
   - **Google** (optional): Click "Enable", add your project's domain, and save

## Step 3: Set Up Cloud Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (for development)
3. Select a location for your database (choose the closest to your users)
4. Click "Done"

### Configure Firestore Security Rules

Replace the default rules with these production-ready rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User skills - users can only access their own skills
    match /userSkills/{skillId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Activities - users can only access their own activities
    match /activities/{activityId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Skills and categories are readable by all authenticated users
    match /skills/{skillId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Users can add new skills
    }
    
    match /categories/{categoryId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins should modify categories
    }
  }
}
```

## Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app (</>) icon
4. Enter app nickname: `DreamMaps Web App`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 5: Configure the Application

1. Open `js/firebase-config.js` in your DreamMaps project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 6: Set Up Initial Data (Optional)

The application will automatically create default skills and categories when first loaded. However, you can manually add them:

### Default Categories

Add these documents to the `categories` collection:

```json
// Document ID: newbie
{
  "name": "newbie",
  "displayName": "Newbie",
  "description": "Just starting out",
  "createdAt": "2024-01-01T00:00:00Z"
}

// Document ID: intermediate
{
  "name": "intermediate",
  "displayName": "Intermediate", 
  "description": "Some experience",
  "createdAt": "2024-01-01T00:00:00Z"
}

// Document ID: advanced
{
  "name": "advanced",
  "displayName": "Advanced",
  "description": "Highly skilled",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Default Skills

Add these documents to the `skills` collection:

```json
{
  "name": "JavaScript",
  "category": "Programming",
  "createdAt": "2024-01-01T00:00:00Z"
}

{
  "name": "Python", 
  "category": "Programming",
  "createdAt": "2024-01-01T00:00:00Z"
}

{
  "name": "HTML/CSS",
  "category": "Web Development",
  "createdAt": "2024-01-01T00:00:00Z"
}

{
  "name": "React",
  "category": "Web Development", 
  "createdAt": "2024-01-01T00:00:00Z"
}

{
  "name": "UI/UX Design",
  "category": "Design",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Step 7: Test the Setup

1. Open `index.html` in a web browser
2. Try registering a new account
3. Complete the onboarding process
4. Add some skills and verify they appear in the dashboard

## Step 8: Production Configuration

### Security Rules for Production

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // More restrictive rules for production
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId &&
        validateUserData(request.resource.data);
    }
    
    match /userSkills/{skillId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId &&
        validateSkillData(request.resource.data);
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId &&
        validateSkillData(request.resource.data);
    }
    
    // Helper functions
    function validateUserData(data) {
      return data.keys().hasAll(['name', 'email']) &&
        data.name is string &&
        data.email is string;
    }
    
    function validateSkillData(data) {
      return data.keys().hasAll(['skillName', 'level', 'userId']) &&
        data.skillName is string &&
        data.level in ['newbie', 'intermediate', 'advanced'] &&
        data.userId is string;
    }
  }
}
```

### Environment Variables

For production, consider using environment variables for sensitive configuration:

```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "your-app-id"
};
```

## Step 9: Deploy with Firebase Hosting (Optional)

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project directory:
   ```bash
   firebase init hosting
   ```

4. Select your Firebase project
5. Choose `./` as your public directory
6. Configure as single-page app: Yes
7. Set up automatic builds and deploys: No (for now)

8. Deploy your app:
   ```bash
   firebase deploy
   ```

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that your Firebase configuration is correct
   - Ensure Authentication is enabled in Firebase Console

2. **"Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Ensure the user is authenticated before accessing data

3. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase project is active

4. **CORS errors in development**
   - Use a local server instead of opening HTML files directly
   - Try: `python -m http.server 8000` or `npx serve .`

### Debug Mode

Enable debug mode by adding this to your console:

```javascript
// In browser console
localStorage.debug = 'firebase:*';
```

## Security Best Practices

1. **Never expose API keys in client-side code** for production apps
2. **Use Firestore Security Rules** to protect user data
3. **Implement proper authentication** before accessing sensitive data
4. **Regularly review and update** security rules
5. **Monitor usage** in Firebase Console
6. **Set up billing alerts** to avoid unexpected charges

## Next Steps

- Set up Firebase Cloud Functions for server-side logic
- Implement Firebase Storage for file uploads
- Add Firebase Analytics for user tracking
- Set up Firebase Performance Monitoring
- Configure Firebase Cloud Messaging for push notifications

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)

---

**Note**: Remember to delete this file after setup for security reasons, as it may contain sensitive information about your Firebase configuration.