import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobarRenderUrl } from '../../GlobalUrl'
import { FaLock } from 'react-icons/fa'; // Import the lock icon
import { ToastContainer,toast } from 'react-toastify';

export default function Otpverfication() {
  const [otp, setotp] = useState('')
  const navigate = useNavigate();
  const Sigupid = sessionStorage.getItem('Id');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${GlobarRenderUrl}/verifyotp/${Sigupid}`, { otp: otp })
      if (response.data.status === true) {
        toast.success(response.data.msg)
        toast.error(null)
        navigate('/User')
      } else {
        toast.error(response.data.msg)
        toast.success(null)
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'An error occurred')
      toast.success(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <ToastContainer/>
      <div className="max-w-md w-[380px] space-y-8 bg-white p-10 rounded-4xl h-[380px] shadow-2xl transform transition-all hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the OTP sent to your email
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="otp" className="sr-only">
                OTP
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
         </div>
    </div>
  )
}

