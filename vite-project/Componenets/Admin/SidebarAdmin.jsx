import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ backgroundColor: '#0D1B2A' }}>
      <div className="sidebar-header" style={{ backgroundColor: '#1B263B', color: '#E0E1DD' }}>
        <h2>Task Manager</h2>
      </div>
      <ul className="sidebar-menu">
        <li style={{ backgroundColor: '#415A77', color: '#E0E1DD' }}>
          <a href="#" style={{ color: '#E0E1DD' }}>
            Dashboard
          </a>
        </li>
        <li style={{ backgroundColor: '#778DA9', color: '#0D1B2A' }}>
          <a href="#" style={{ color: '#0D1B2A' }}>
            Tasks
          </a>
        </li>
        <li style={{ backgroundColor: '#415A77', color: '#E0E1DD' }}>
          <a href="#" style={{ color: '#E0E1DD' }}>
            Reports
          </a>
        </li>
        <li style={{ backgroundColor: '#778DA9', color: '#0D1B2A' }}>
          <a href="#" style={{ color: '#0D1B2A' }}>
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;