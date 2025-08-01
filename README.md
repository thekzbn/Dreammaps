# DreamMaps - Learning Management System (LMS)

A modern, vanilla JavaScript Learning Management System with Firebase backend for tracking skills and learning progress.

## Overview

**DreamMaps** is a simplified Learning Management System (LMS) combined with a Student Skills and Interests Tracker. Built with pure HTML, CSS, and JavaScript, it uses Firebase for authentication and data storage. The system allows users to track their skills, categorize them into different proficiency levels (**newbie**, **intermediate**, **advanced**), and follow a structured onboarding process.

## Key Features

- **Pure Vanilla Web Technologies**: Built with HTML5, CSS3, and ES6 JavaScript (no frameworks)
- **Firebase Backend**: Authentication, Firestore database, and real-time updates
- **User Authentication**: Secure email/password registration and login
- **Skill Tracking**: Users can select and track their skills, categorizing them into different levels
- **Interactive Onboarding**: Multi-step onboarding experience with skill selection
- **Modern Dashboard**: Statistics, charts, and activity tracking
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live data synchronization with Firebase

## Screenshots

- **Dashboard**:
<img width="896" alt="Screenshot 2024-08-22 at 00 36 46" src="https://github.com/user-attachments/assets/c3e86fb5-0d58-48ff-953f-d7fc25603868">

### **Onboarding Process**
- **Sign in**:
  <img width="1737" alt="Screenshot 2024-08-22 at 00 35 26" src="https://github.com/user-attachments/assets/18974717-c59e-4881-b6d6-abcddf557253">
- **Sign up**:
  <img width="1737" alt="Screenshot 2024-08-22 at 00 36 02" src="https://github.com/user-attachments/assets/00da579e-9dde-4119-aee6-1d1352536ba2">
- **Additional Details**:
  <img width="1766" alt="Screenshot 2024-08-22 at 00 38 55" src="https://github.com/user-attachments/assets/8cff3acc-80d5-4965-984d-6be7035af002">
- **Skill Selection**
    <img width="1737" alt="Screenshot 2024-08-22 at 00 51 31" src="https://github.com/user-attachments/assets/9f289578-3f08-47fa-9ba3-54ade1ab6e37">

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Authentication + Firestore)
- **Charts**: Chart.js
- **Styling**: Custom CSS with modern design patterns
- **Architecture**: Modular ES6 modules

## File Structure

```
/
├── index.html                          # Main application file
├── styles/
│   ├── main.css                       # Base styles and layout
│   ├── auth.css                       # Authentication components
│   ├── dashboard.css                  # Dashboard specific styles
│   └── onboarding.css                 # Onboarding flow styles
├── js/
│   ├── firebase-config.js             # Firebase initialization
│   ├── auth.js                        # Authentication logic
│   ├── database.js                    # Firestore operations
│   ├── main.js                        # App initialization & navigation
│   ├── onboarding.js                  # Onboarding flow logic
│   ├── dashboard.js                   # Dashboard functionality
│   ├── skills.js                      # Skills management
│   └── profile.js                     # Profile management
├── FIREBASE_SETUP_TUTORIAL.md         # Firebase setup guide
└── JAVASCRIPT_LOGIC_DOCUMENTATION.md  # Code architecture docs
```

## Setup Instructions

### Prerequisites
- A modern web browser
- A Google account (for Firebase)
- Basic web server (for local development)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/dreammaps.git
   cd dreammaps
   ```

2. **Set up Firebase:**
   Follow the detailed instructions in `FIREBASE_SETUP_TUTORIAL.md`

3. **Configure Firebase:**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `js/firebase-config.js`

4. **Run the Application:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:8000`

## Usage

1. **Signup and Onboarding:**
   - Create an account with email and password
   - Complete the onboarding process with personal details
   - Select your skills across different proficiency levels

2. **Dashboard:**
   - View your skill statistics and progress
   - See interactive charts of your learning journey
   - Track recent activities

3. **Skills Management:**
   - Add new skills with optional video links
   - Edit skill levels as you progress
   - Filter and search your skills
   - Export your skills data

4. **Profile Management:**
   - Update personal information
   - Track profile completion
   - Export profile data

## Features

### Authentication
- Secure email/password registration
- Login with error handling
- Password strength validation
- Session management

### Onboarding
- Personal details collection
- Interactive skill selection
- Progress tracking
- Completion animation

### Dashboard
- Animated statistics cards
- Interactive Chart.js visualizations
- Recent activity feed
- Quick action buttons

### Skills Management
- CRUD operations for skills
- Level-based filtering
- Search functionality
- Data export capabilities

### Profile Management
- Personal information editing
- Completion percentage tracking
- Data export functionality

## Development

### Code Architecture
The application follows a modular architecture:

- **Separation of Concerns**: Each module handles specific functionality
- **Event-Driven**: Uses event listeners for user interactions
- **Asynchronous**: Async/await for Firebase operations
- **Modular**: ES6 modules for clean organization
- **Reactive**: UI updates based on data changes

### Security
- Input validation on client and server side
- Firebase security rules for data protection
- Authentication required for all operations
- Secure user data handling

### Performance
- Lazy loading of data
- Efficient Firebase queries
- Local state caching
- Debounced search
- Chart performance optimization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing code structure
2. Use vanilla JavaScript (no frameworks)
3. Maintain Firebase security rules
4. Test all functionality thoroughly
5. Update documentation as needed

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## License

This project is licensed under the MIT License.

## Support

For detailed setup instructions, see `FIREBASE_SETUP_TUTORIAL.md`
For code architecture details, see `JAVASCRIPT_LOGIC_DOCUMENTATION.md`

---

**Note**: This is a pure vanilla JavaScript application with no build process required. Simply set up Firebase and serve the files!
