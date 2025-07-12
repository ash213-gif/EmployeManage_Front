import React from 'react';
import SidebarAdmin from './SidebarAdmin';
import AdminContent from './AdminContent';
import { Outlet } from 'react-router-dom';

export default function AdminDash() {
  return (
    <div className='flex h-screen'>
      <div className='w-1/5   p-4'>
        <SidebarAdmin />
      </div>
      <div className='w-4/5 p-4 '>
        <Outlet />
      </div>
    </div>
  );
}