import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {  Alltask ,SignUpForm, Login, AdminDash , Otpverfication ,  Addtask,Logout,Employees,Setting } from '../Componenets/AllComponents'
// import Counter  from '../Componenets/Redux/Counter'
export default function App() {
  return (
    <BrowserRouter>
    {/* <Counter/> */}
      <Routes>
        {/* Authentication of user  */}
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverfication" element={<Otpverfication />} />
        <Route path="/otpverfication/:id" element={<Otpverfication />} />

        { /* Admin Dashboard Route */}

       <Route exact path="/" element={<AdminDash />} >
         <Route index path='/addtask' element={<Addtask />} />
         <Route path='/tasks' element={<Alltask />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/settings" element={<Setting />} />
         <Route path="/employees" element={<Employees />} />
      </Route>


        { /* Other Routes can be added here */ }
      </Routes>


    </BrowserRouter>

  )
}
