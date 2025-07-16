import React from 'react';
import { FaTasks, FaPlus, FaUsers, FaCog, FaSignOutAlt, FaExclamationCircle } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/admin/tasks', icon: FaTasks, text: 'All Tasks', color: 'sky' },
  { to: '/admin/addtask', icon: FaPlus, text: 'Add Task', color: 'emerald' },
  { to: '/admin/employees', icon: FaUsers, text: 'All Employees', color: 'amber' },
  { to: '/admin/message', icon: FaExclamationCircle, text: 'Message', color: 'rose' }, // New Issues item
  { to: '/admin/settings', icon: FaCog, text: 'Settings', color: 'rose' },
];

const colorClasses = {
  sky: {
    active: 'bg-sky-100 text-sky-600 font-semibold',
    hover: 'hover:text-sky-600',
    icon: 'text-sky-500',
  },
  emerald: {
    active: 'bg-emerald-100 text-emerald-600 font-semibold',
    hover: 'hover:text-emerald-600',
    icon: 'text-emerald-500',
  },
  amber: {
    active: 'bg-amber-100 text-amber-600 font-semibold',
    hover: 'hover:text-amber-600',
    icon: 'text-amber-500',
  },
  rose: {
    active: 'bg-rose-100 text-rose-600 font-semibold',
    hover: 'hover:text-rose-600',
    icon: 'text-rose-500',
  },
};

export default function SidebarAdmin() {
  return (
    <div className="flex flex-col bg-white w-54 rounded-2xl h-screen p-4 border-r border-slate-200">
      {/* Header */}
      <div className="p-2 mb-8">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaTasks className="text-white h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `flex items-center p-2.5 font-medium rounded-lg transition-colors duration-200 text-slate-600 hover:bg-slate-100 ${
                    isActive
                      ? colorClasses[item.color].active
                      : colorClasses[item.color].hover
                  }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${colorClasses[item.color].icon}`} />
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-slate-200">
        <ul>
          <li>
            <Link
              to="/admin/logout"
              className="flex items-center p-2.5 font-medium text-slate-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
