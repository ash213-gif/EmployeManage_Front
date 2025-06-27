import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {  Alltask ,SignUpForm, Login, AdminDash ,  Addtask,Logout,Employees,Setting } from '../Componenets/AllComponents'
// import Counter  from '../Componenets/Redux/Counter'
export default function App() {
  return (
    <BrowserRouter>
    {/* <Counter/> */}
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />

        { /* Admin Dashboard Route */}

       <Route exact path="/" element={<AdminDash />} >
         <Route path='/tasks' element={<Addtask />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/settings" element={<Setting />} />
         <Route path="/employees" element={<Employees />} />
      </Route>


        { /* Other Routes can be added here */ }
      </Routes>


    </BrowserRouter>

  )
}
