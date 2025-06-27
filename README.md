# EmployeManage_Front


EmployeManage_Front is the frontend application for the Employee Management System.  
It is built with **React.js** and provides a user-friendly interface for admins and employees to manage tasks, employees, and authentication.

## Features

- User authentication (signup, login)
- Admin dashboard with sidebar navigation
- Task management (add, edit, delete, view)
- Employee management
- Responsive UI
- Integration with backend API

## Tech Stack

- React.js (with hooks and context)
- Axios for API requests
- React Router for routing
- React Icons for UI icons
- CSS for styling

## Project Structure

```
src/
  ├── Componenets/         # Reusable components (Admin, Auth, Redux, etc.)
  ├── Context/             # React context for global state
  ├── GlobalUrl.js         # Backend API base URL
  ├── App.jsx              # Main app component with routes
  └── index.js             # Entry point
```

## Getting Started

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/EmployeManage_Front.git
   cd EmployeManage_Front
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up backend API URL**

   Edit `src/GlobalUrl.js` and set your backend API base URL:
   ```js
   export const GlobarRenderUrl = "https://your-backend-url.onrender.com";
   ```

4. **Run the app**
   ```
   npm run dev
   ```
