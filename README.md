# DreamMaps - Learning Management System

A modern, responsive Learning Management System built with vanilla HTML, CSS, JavaScript, and Firebase. DreamMaps helps users track their skill development journey from newbie to advanced levels.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure email/password registration and login
- **User Onboarding** - Guided setup process for new users
- **Skills Management** - Add, edit, delete, and categorize skills
- **Progress Tracking** - Visual dashboard with charts and statistics
- **Skill Levels** - Three-tier system: Newbie, Intermediate, Advanced
- **Activity Logging** - Track user actions and progress over time
- **Profile Management** - Comprehensive user profile system

### User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Dark Mode Support** - Toggle between light and dark themes
- **Real-time Updates** - Instant synchronization with Firebase
- **Offline Support** - Basic functionality available offline
- **Loading States** - Visual feedback during data operations
- **Error Handling** - User-friendly error messages and recovery

### Technical Features
- **No Dependencies** - Pure HTML, CSS, and JavaScript (no frameworks)
- **ES6 Modules** - Modern JavaScript with clean module architecture
- **Firebase Integration** - Authentication, Firestore database, hosting
- **Chart.js Integration** - Beautiful, interactive charts and graphs
- **Security Rules** - Comprehensive Firestore security implementation
- **Performance Optimized** - Lazy loading, debouncing, and efficient queries

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Charts**: Chart.js
- **Icons**: Emoji-based icon system
- **Styling**: CSS Custom Properties (CSS Variables)

### Project Structure
```
DreamMaps/
├── index.html                 # Main application file
├── assets/
│   ├── css/
│   │   ├── main.css          # Core styles and layout
│   │   ├── auth.css          # Authentication form styles
│   │   ├── dashboard.css     # Dashboard-specific styles
│   │   └── onboarding.css    # Onboarding flow styles
│   ├── js/
│   │   ├── firebase-config.js # Firebase configuration
│   │   ├── auth.js           # Authentication logic
│   │   ├── database.js       # Database operations
│   │   ├── main.js           # Application controller
│   │   ├── onboarding.js     # Onboarding flow
│   │   ├── dashboard.js      # Dashboard functionality
│   │   ├── skills.js         # Skills management
│   │   └── profile.js        # Profile management
│   └── images/               # Image assets (placeholder)
├── FIREBASE_SETUP.md         # Firebase setup guide
├── JAVASCRIPT_LOGIC.md       # JavaScript documentation
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- A modern web browser
- A Google account (for Firebase)
- A local web server for development

### Installation

1. **Clone or Download** the project files
2. **Set up Firebase** following the [Firebase Setup Guide](FIREBASE_SETUP.md)
3. **Start a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
4. **Open your browser** and navigate to `http://localhost:8000`

### Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your Firebase configuration
5. Update `assets/js/firebase-config.js` with your configuration

For detailed setup instructions, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## 📱 Usage

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Complete onboarding** by providing your details and selecting initial skills
3. **Explore the dashboard** to see your skill statistics and progress
4. **Manage skills** by adding, editing, or removing skills as you progress
5. **Update your profile** with additional information

### Key Features

#### Dashboard
- View skill distribution charts
- Track learning progress over time
- See recent activity and achievements
- Quick access to add new skills

#### Skills Management
- Add custom skills with categories and notes
- Filter skills by level (Newbie, Intermediate, Advanced)
- Search through your skills
- Update skill levels as you progress
- Add learning resources and notes

#### Profile Management
- Update personal information
- View skill statistics
- Manage account settings
- Toggle dark mode

## 🔧 Development

### Code Structure

The application follows a modular architecture with clear separation of concerns:

- **firebase-config.js** - Firebase initialization and error handling
- **auth.js** - User authentication and session management
- **database.js** - All Firestore database operations
- **main.js** - Application controller and global utilities
- **onboarding.js** - New user onboarding flow
- **dashboard.js** - Dashboard data and chart management
- **skills.js** - Skills CRUD operations and UI
- **profile.js** - User profile management

For detailed code documentation, see [JAVASCRIPT_LOGIC.md](JAVASCRIPT_LOGIC.md).

### Development Mode

The application includes development mode features:
- Enhanced console logging
- Error details and stack traces
- Performance monitoring
- Firebase connection status

Development mode is automatically enabled when running on `localhost`.

### Adding New Features

1. **Create new module** in `assets/js/` if needed
2. **Import required dependencies** using ES6 imports
3. **Follow the existing patterns** for error handling and user feedback
4. **Update the navigation** in `main.js` if adding new pages
5. **Add corresponding CSS** in `assets/css/`

## 🔒 Security

### Firebase Security Rules

The application includes comprehensive Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User skills are private to each user
    match /userSkills/{skillId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Default skills are readable by authenticated users
    match /skills/{skillId} {
      allow read: if request.auth != null;
    }
  }
}
```

### Best Practices Implemented

- **Input Validation** - All user inputs are validated
- **Authentication Checks** - User authentication verified before operations
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **XSS Prevention** - User inputs properly sanitized
- **Secure Communication** - HTTPS required for production

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize hosting**:
   ```bash
   firebase init hosting
   ```

3. **Deploy**:
   ```bash
   firebase deploy
   ```

### Other Hosting Options

The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Google Cloud Storage

Make sure to:
1. Upload all files maintaining the folder structure
2. Configure HTTPS (required by Firebase)
3. Add your domain to Firebase authorized domains

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration Errors**
   - Verify your Firebase configuration in `firebase-config.js`
   - Check that Authentication and Firestore are enabled

2. **CORS Errors**
   - Use a local web server instead of opening HTML files directly
   - Try `python -m http.server 8000` or similar

3. **Charts Not Displaying**
   - Check internet connection (Chart.js loads from CDN)
   - Verify Chart.js script tag in `index.html`

4. **Skills Not Loading**
   - Check Firestore security rules
   - Verify user is authenticated
   - Check browser console for errors

For more troubleshooting help, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## 📊 Performance

### Optimization Features

- **Lazy Loading** - JavaScript modules loaded only when needed
- **Debounced Search** - Prevents excessive API calls
- **Efficient Queries** - Optimized Firestore queries
- **Minimal DOM Updates** - Batched DOM changes
- **Chart Cleanup** - Proper cleanup of Chart.js instances

### Performance Monitoring

The application includes built-in performance monitoring:
- Function execution timing
- Firebase operation tracking
- Error rate monitoring
- User action analytics

## 🤝 Contributing

This is a demonstration project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines

- Follow the existing code style and patterns
- Add comprehensive error handling
- Include user-friendly notifications
- Test on multiple devices and browsers
- Update documentation as needed

## 📄 License

This project is provided as-is for educational and demonstration purposes. Feel free to use, modify, and distribute as needed.

## 🔗 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the Firebase setup guide
3. Check the JavaScript documentation
4. Look for similar issues in common web development resources

---

**DreamMaps** - Empowering your skill development journey! 🎯
