# DreamMaps - Simplified Learning Management System (LMS) + Student Skills and Interests Tracker

## Overview
**DreamMaps** is a modern and simplified Learning Management System (LMS) combined with a Student Skills and Interests Tracker. The system allows users to track their skills, categorize them into different proficiency levels (**newbie**, **intermediate**, **advanced**), and follow a structured onboarding process after signup. DreamMaps ensures that users complete their onboarding before accessing the dashboard, enhancing the user experience and guiding them through the system.

## Key Features
- **User Roles**: Role-based access control to manage users and their privileges.
- **Skill Tracking**: Users can select and track their skills, categorizing them into different levels.
- **Onboarding Process**: A multi-step onboarding experience to ensure users provide necessary information before accessing the platform.
- **Video Links for Skills**: Associated video links to help users improve their skills.
- **Responsive Frontend**: Built with Vue.js and Inertia.js for a smooth user experience.
- **Secure Backend**: Powered by Laravel with authentication using Laravel Breeze.

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
- **Learning**:
<img width="1737" alt="Screenshot 2024-08-22 at 00 37 11" src="https://github.com/user-attachments/assets/7494594a-745c-4f1a-9263-d5e847152371">
<img width="1737" alt="Screenshot 2024-08-22 at 00 37 25" src="https://github.com/user-attachments/assets/7c2279d1-f2c6-4026-a01e-0cc9546144d0">

## Setup Instructions
### Prerequisites
- PHP 8.0+
- Composer
- Node.js and npm
- MySQL / PostgreSQL / Sqlite
- Laravel 9+
- Vue.js 3.x
- Inertia.js

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/yourusername/dreammaps.git
cd dreammaps
```

2. **Install PHP Dependencies:**

```bash
composer install
```

3. **Install Node.js Dependencies:**

```bash
npm install
```

4. **Setup Environment Variables:**

```bash
cp .env.example .env
php artisan key:generate
```
5. **Configure Database:**

   - Update your .env file with the correct database credentials.

6. **Run Migrations and Seeders:**

```bash
php artisan migrate --seed
```

7. **Run the Development Server:**

```bash
npm run dev
php artisan serve
```

8. **Build for Production:**

```bash
npm run build
```


## Usage
1. Signup and Onboarding:
    After signing up, the system will guide users through the onboarding process, where they can provide additional details and select their skills.

2. Skill Management:
    Users can manage their skills, categorize them into different proficiency levels, and access resources to improve them.

3. Dashboard:
    The dashboard provides an overview of the user's progress and activities.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.
