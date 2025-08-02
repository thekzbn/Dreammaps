# Firebase Setup Guide for DreamMaps

This guide will walk you through setting up Firebase for the DreamMaps Learning Management System built with vanilla HTML, CSS, JavaScript, and Firebase.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Firebase Project](#create-firebase-project)
3. [Configure Authentication](#configure-authentication)
4. [Set Up Firestore Database](#set-up-firestore-database)
5. [Configure Security Rules](#configure-security-rules)
6. [Get Firebase Configuration](#get-firebase-configuration)
7. [Update Application Configuration](#update-application-configuration)
8. [Test the Setup](#test-the-setup)
9. [Production Deployment](#production-deployment)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

- A Google account
- Basic understanding of web development
- A web server for local development (or use `python -m http.server` or `npx serve`)
- The DreamMaps application files

## Create Firebase Project

1. **Go to Firebase Console**
   - Navigate to [Firebase Console](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click **"Create a project"**
   - Enter project name: `dreammaps-lms` (or your preferred name)
   - Choose whether to enable Google Analytics (recommended for tracking)
   - If enabled, select or create a Google Analytics account
   - Click **"Create project"**

3. **Wait for Project Creation**
   - Firebase will set up your project (this may take a few minutes)
   - Click **"Continue"** when ready

## Configure Authentication

1. **Navigate to Authentication**
   - In the Firebase Console, click **"Authentication"** in the left sidebar
   - Go to the **"Sign-in method"** tab

2. **Enable Email/Password Authentication**
   - Click on **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

3. **Optional: Enable Google Sign-In**
   - Click on **"Google"**
   - Toggle **"Enable"** to ON
   - Enter your project's support email
   - Click **"Save"**

4. **Configure Authorized Domains** (for production)
   - In the **"Sign-in method"** tab, scroll to **"Authorized domains"**
   - Add your production domain (e.g., `yourdomain.com`)
   - `localhost` is automatically included for development

## Set Up Firestore Database

1. **Create Firestore Database**
   - Click **"Firestore Database"** in the left sidebar
   - Click **"Create database"**

2. **Choose Security Rules Mode**
   - Select **"Start in test mode"** for development
   - Choose a location for your database (select the region closest to your users)
   - Click **"Done"**

3. **Database Structure**
   The application will create the following collections automatically:
   ```
   /users/{userId}
   /userSkills/{skillId}
   /skills/{skillId}
   /categories/{categoryId}
   /activities/{activityId}
   ```

## Configure Security Rules

Replace the default Firestore security rules with these production-ready rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile data
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
      allow write: if request.auth != null; // Users can add custom skills
    }
    
    match /categories/{categoryId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins should modify categories
    }
  }
}
```

### How to Update Security Rules

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the existing rules with the code above
3. Click **"Publish"**

## Get Firebase Configuration

1. **Access Project Settings**
   - Click the gear icon (⚙️) next to "Project Overview"
   - Select **"Project settings"**

2. **Add Web App**
   - Scroll down to **"Your apps"** section
   - Click the **Web app** icon (`</>`)
   - Enter app nickname: `DreamMaps Web App`
   - **Optional**: Check "Also set up Firebase Hosting"
   - Click **"Register app"**

3. **Copy Configuration**
   - Copy the Firebase configuration object that appears
   - It should look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```

## Update Application Configuration

1. **Open Firebase Configuration File**
   - Navigate to `assets/js/firebase-config.js`

2. **Replace Placeholder Configuration**
   ```javascript
   // Replace this placeholder configuration
   const firebaseConfig = {
       apiKey: "your-api-key-here",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "123456789012",
       appId: "1:123456789012:web:abcdef123456789"
   };
   
   // With your actual Firebase configuration
   const firebaseConfig = {
       apiKey: "AIzaSyC...", // Your actual API key
       authDomain: "dreammaps-lms.firebaseapp.com", // Your actual domain
       projectId: "dreammaps-lms", // Your actual project ID
       storageBucket: "dreammaps-lms.appspot.com", // Your actual storage bucket
       messagingSenderId: "123456789012", // Your actual sender ID
       appId: "1:123456789012:web:abcdef123456" // Your actual app ID
   };
   ```

3. **Save the File**
   - Make sure to save the file after updating the configuration

## Test the Setup

1. **Start Local Server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or any other local server
   ```

2. **Open Application**
   - Navigate to `http://localhost:8000` (or your server's URL)
   - You should see the DreamMaps welcome page

3. **Test Registration**
   - Click **"Sign Up"**
   - Fill in the registration form
   - Submit the form
   - Check Firebase Console > Authentication > Users to see the new user

4. **Test Onboarding**
   - Complete the onboarding process
   - Add some skills
   - Check Firestore Database to see the created documents

5. **Test Dashboard**
   - Navigate to the dashboard
   - Verify that charts and statistics display correctly

## Production Deployment

### Option 1: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Choose `.` as your public directory
   - Configure as single-page app: **Yes**
   - Set up automatic builds and deploys: **No** (for now)

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Option 2: Other Hosting Providers

1. **Update Authorized Domains**
   - Go to Firebase Console > Authentication > Sign-in method
   - Add your production domain to authorized domains

2. **Upload Files**
   - Upload all files to your hosting provider
   - Ensure the file structure is maintained

3. **Configure HTTPS**
   - Firebase requires HTTPS in production
   - Most modern hosting providers offer SSL certificates

## Troubleshooting

### Common Issues and Solutions

#### 1. "Firebase: Error (auth/configuration-not-found)"
**Cause**: Incorrect Firebase configuration
**Solution**: 
- Double-check your Firebase configuration in `assets/js/firebase-config.js`
- Ensure all values are correct and match your Firebase project

#### 2. "Missing or insufficient permissions"
**Cause**: Firestore security rules are too restrictive
**Solution**:
- Check your Firestore security rules
- Ensure users are authenticated before accessing data
- Verify the rules match the structure in this guide

#### 3. "Firebase: Error (auth/network-request-failed)"
**Cause**: Network connectivity issues
**Solution**:
- Check your internet connection
- Verify Firebase project is active and not suspended
- Try again after a few minutes

#### 4. CORS Errors in Development
**Cause**: Opening HTML files directly in browser
**Solution**:
- Use a local web server instead of opening files directly
- Try: `python -m http.server 8000` or `npx serve .`

#### 5. Charts Not Displaying
**Cause**: Chart.js library not loading
**Solution**:
- Check internet connection (Chart.js loads from CDN)
- Verify the Chart.js script tag in `index.html`
- Check browser console for JavaScript errors

#### 6. Skills Not Loading During Onboarding
**Cause**: Default skills not created in Firestore
**Solution**:
- The app should create default skills automatically
- If not working, check browser console for errors
- Verify Firestore security rules allow reading from `/skills` collection

### Debug Mode

Enable debug mode to get more detailed error information:

```javascript
// Add this to your browser console
localStorage.debug = 'firebase:*';
```

### Checking Firebase Connection

The application includes a connection test. Check the browser console for:
- ✅ Firebase connection successful
- ❌ Firebase connection failed

## Security Best Practices

1. **API Key Security**
   - Firebase API keys for web apps are safe to include in client-side code
   - They're used to identify your Firebase project, not authenticate users
   - Real security comes from Firestore security rules

2. **Security Rules**
   - Always use production-ready security rules
   - Test rules thoroughly before deploying
   - Regularly review and update rules

3. **User Authentication**
   - Always verify user authentication before accessing sensitive data
   - Use Firebase Auth state listeners to track authentication status

4. **Data Validation**
   - Validate data on both client and server (security rules) side
   - Sanitize user inputs to prevent XSS attacks

5. **Monitoring**
   - Enable Firebase Analytics to monitor usage
   - Set up billing alerts to avoid unexpected charges
   - Monitor authentication and database usage

## Advanced Configuration

### Environment Variables (Optional)

For better security management, you can use environment variables:

```javascript
// For build tools that support environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "fallback-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "fallback-domain",
  projectId: process.env.FIREBASE_PROJECT_ID || "fallback-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "fallback-bucket",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "fallback-sender-id",
  appId: process.env.FIREBASE_APP_ID || "fallback-app-id"
};
```

### Multiple Environments

For development, staging, and production environments:

1. Create separate Firebase projects for each environment
2. Use different configuration files or environment variables
3. Deploy to different hosting targets

## Next Steps

After completing the basic setup, consider these enhancements:

1. **Firebase Cloud Functions** - Add server-side logic
2. **Firebase Storage** - Store user profile images and files
3. **Firebase Analytics** - Track user behavior and app performance
4. **Firebase Performance Monitoring** - Monitor app performance
5. **Firebase Cloud Messaging** - Send push notifications
6. **Firebase Remote Config** - Manage app configuration remotely

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase YouTube Channel](https://www.youtube.com/user/Firebase)

## Conclusion

You should now have a fully functional DreamMaps application connected to Firebase. The setup includes:

- ✅ User authentication with email/password
- ✅ Firestore database for storing user data and skills
- ✅ Security rules to protect user data
- ✅ Real-time data synchronization
- ✅ Responsive web interface

Remember to keep your Firebase configuration secure and regularly update your security rules as your application grows.

---

**Important**: After completing the setup, consider deleting this file from your production deployment for security reasons, as it contains detailed information about your Firebase configuration process.