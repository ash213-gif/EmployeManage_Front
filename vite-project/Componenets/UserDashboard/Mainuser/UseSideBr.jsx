import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

export default function UserSideBar() {
  return (
    <div className="w-54 bg-gray-800 text-white h-screen p-4 fixed top-0 left-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">User Panel</h2>
      </div>
      <ul>
        <li className="mb-2">
          <Link to="/User/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaTachometerAlt className="mr-4" /> Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/User/profile" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaUser className="mr-4" /> Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/User/settings" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaCog className="mr-4" /> Settings
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/User/help" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaQuestionCircle className="mr-4" /> Help
          </Link>
        </li>
        <li>
          <Link to="/User/userlogout" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaSignOutAlt className="mr-4" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}