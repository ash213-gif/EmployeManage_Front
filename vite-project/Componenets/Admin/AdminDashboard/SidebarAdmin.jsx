import React from 'react';
import { FaTasks, FaPlus, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SidebarAdmin() {
  return (
    <div className="Adminside">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/tasks"><FaTasks /> All Tasks</Link></li>
        <li><Link to="/admin/addtask"><FaPlus /> Add Task</Link></li>
        <li><Link to="/admin/employees"><FaUsers /> All Employees</Link></li>
        <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
        <li><Link to="/admin/logout"><FaSignOutAlt /> Logout</Link></li>
      </ul>
    </div>
  );
}