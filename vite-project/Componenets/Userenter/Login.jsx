import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobarRenderUrl } from '../../GlobalUrl'
import { FaEnvelope, FaLock } from 'react-icons/fa' 
import { ToastContainer,toast } from 'react-toastify'

export default function Login() {
  const [data, setdata] = useState({
    email: "",
    password: ""
  })


  const navigate = useNavigate();

  const form = [
    { label: "Email", type: "email", name: "email", placeholder: "Enter your email", icon: <FaEnvelope /> },
    { label: "Password", type: "password", name: "password", placeholder: "Enter your password", icon: <FaLock /> }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${GlobarRenderUrl}/login`, data);
      toast.success(response.data.msg);
      toast.error(null);
      sessionStorage.setItem('Id', response.data.user._id);
      if (response.data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/User');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Login failed"
      );
      toast.success(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-md w-[380px] h-[46 0px] space-y-8 bg-white p-10 rounded-3xl shadow-2xl transform transition-all hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Login to access your account
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform transition hover:-translate-y-0.5">
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-lg transform transition hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {form.map((item, index) => (
                <div key={index} className="relative">
                  <label htmlFor={item.name} className="sr-only">
                    {item.label}
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {item.icon}
                  </div>
                  
                  <input
                    id={item.name}
                    name={item.name}
                    type={item.type}
                    required
                    className="appearance-none rounded-3xl relative block w-full pl-10 p-3 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={item.placeholder}
                    value={data[item.name]}
                    onChange={(e) => setdata({ ...data, [item.name]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform transition hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
           <div className="text-sm text-center">
          <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition" onClick={() => navigate('/signup')}>
            Don't have an account? Sign Up
          </span>
        </div>
      </div>
    </div>
  )
}