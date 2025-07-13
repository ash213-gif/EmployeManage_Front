import React from 'react';
import UseSideBr from './UseSideBr';
import UserContente from './UserContente';
import { Outlet } from 'react-router-dom';

export default function UserHome() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 md:w-1/5 lg:w-2/6 xl:w-1/6  p-4 fixed top-0 left-0 h-screen">
        <UseSideBr />
      </div>

      <div className="w-full md:w-4/5 lg:w-4/6 xl:w-5/6 ml-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <Outlet />
      </div>
    </div>
  );
}