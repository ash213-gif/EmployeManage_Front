import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

export default function UserSideBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/User/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/User/profile', icon: FaUser, label: 'Profile' },
    { path: '/User/settings', icon: FaCog, label: 'Settings' },
    { path: '/User/help', icon: FaQuestionCircle, label: 'Help' },
    { path: '/User/userlogout', icon: FaSignOutAlt, label: 'Logout' },
  ];

  return (
    <div className="w-54  rounded-2xl bg-gray-100 text-gray-900 h-screen p-6 fixed top-0 left-0 shadow-lg">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">User Panel</h2>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-4">
            <Link
              to={item.path}
              className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 ease-in-out ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'hover:bg-gray-700 hover:shadow-md'
              }`}
            >
              <item.icon className={`mr-4 text-xl ${isActive(item.path) ? 'text-white' : 'text-purple-300'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}