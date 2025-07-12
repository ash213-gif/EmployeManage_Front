import React from 'react';
import { FaTasks, FaPlus, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SidebarAdmin() {
  return (
    <div className="flex flex-col bg-gray-800 text-white w-54 h-screen p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/tasks" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
            <FaTasks className="mr-2" /> All Tasks
          </Link>
        </li>
        <li>
          <Link to="/admin/addtask" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
            <FaPlus className="mr-2" /> Add Task
          </Link>
        </li>
        <li>
          <Link to="/admin/employees" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
            <FaUsers className="mr-2" /> All Employees
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
            <FaCog className="mr-2" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/admin/logout" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
            <FaSignOutAlt className="mr-2" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
