import React from 'react'
import UseSideBr from './UseSideBr'
import UserContente from './UserContente'
import { Outlet } from 'react-router-dom'


export default function UserHome() {
  return (
    <div className="user-home-container">
      
      <div className="user-sidebar-section">
        <UseSideBr />
      </div>

      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}