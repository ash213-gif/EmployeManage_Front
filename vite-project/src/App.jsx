import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
 import { Sidebar,SignUpForm,Login } from '../Componenets/AllComponents'
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  )
}
