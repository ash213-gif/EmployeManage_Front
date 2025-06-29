import React from 'react'
import SidebarAdmin from './SidebarAdmin'
import AdminContent from './AdminContent'
import { Outlet } from 'react-router-dom'

export default function AdminDash() {
  return (
    <div className='HomeContainer' >
        <div  ><SidebarAdmin /></div>
        <div className='AdminContent' ><Outlet/></div>

    </div>
  )
}
