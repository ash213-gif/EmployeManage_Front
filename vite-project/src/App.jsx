import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Alltask,
  SignUpForm,
  Login,
  AdminDash,
  Otpverfication,
  Addtask,
  Logout,
  Employees,
  Setting,
  UserHome,
  UserLogout,
  Profile,
  Help,
  Settings,
  Dashboad,
  Seaarch,
  Search
} from "../Componenets/AllComponents";
// import Counter  from '../Componenets/Redux/Counter'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication of user  */}
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverfication/:id" element={<Otpverfication />} />

        {/* User DashBoard  */}
        <Route exact path="/User" element={<UserHome />}>
          <Route path="/User/profile" element={<Profile />} />
          <Route path="/User/settings" element={<Settings />} />
          <Route path="/User/userlogout" element={<UserLogout />} />
          <Route path="/User/help" element={<Help />} />
          <Route path="/User/dashboard" element={<Dashboad />} />
          <Route path="/User/messages" element={<Seaarch />} />
        </Route>

        {/* Autherization ofuser and admin*/}

        <Route path="/" element={<SignUpForm />} />

        {/* Admin Dashboard Route */}
        <Route exact path="/admin" element={<AdminDash />}>
          <Route index path="/admin/addtask" element={<Addtask />} />
          <Route path="/admin/tasks" element={<Alltask />} />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/message" element={<Search />} />
        </Route>

        {/* Other Routes can be added here */}
      </Routes>
    </BrowserRouter>
  );
}
