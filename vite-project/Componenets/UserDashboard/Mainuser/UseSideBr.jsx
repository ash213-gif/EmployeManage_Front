import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

export default function UseSideBr() {
  return (
    <div className="user-sidebar">
      <div className="sidebar-header">
        <h2>User Panel</h2>
      </div>
      <ul className="sidebar-list">
        <li>
          <Link to="/User" className="sidebar-link">
            <FaTachometerAlt className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/User/profile" className="sidebar-link">
            <FaUser className="sidebar-icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/User/settings" className="sidebar-link">
            <FaCog className="sidebar-icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/User/help" className="sidebar-link">
            <FaQuestionCircle className="sidebar-icon" /> Help
          </Link>
        </li>
        <li>
          <Link to="/logout" className="sidebar-link">
            <FaSignOutAlt className="sidebar-icon" /> Logout
          </Link>
        </li>
         <li>
         
        </li>
      </ul>
    </div>
  );
}