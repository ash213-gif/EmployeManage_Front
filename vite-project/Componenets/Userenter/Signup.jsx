import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobarRenderUrl } from '../../GlobalUrl';
import { ToastContainer,toast } from 'react-toastify';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
 

  const navigate = useNavigate();
  
  const formFields = [
    { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'Enter your email' },
    { label: 'Password', type: 'password', name: 'password', placeholder: 'Enter your password' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(`${GlobarRenderUrl}/signup`, formData);
      if (response.data.status === true) {
         sessionStorage.setItem('Id', response.data.user._id);
        toast.success(response.data.msg);
       await navigate(`/otpverfication/${response.data.user._id}`);
      } else {
        toast.error(response.data.msg || 'Signup failed');
toast.success(null)      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'An error occurred during signup'
      );
      toast.success(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r  ">
      <div className="w-[380px] max-w-md bg-white bg-opacity-90 rounded-2xl shadow-2xl p-5  h-[450px] animate-fadeInDown">
        <h2 className="text-2xl font-extrabold text-center mb-2 text-gradient bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <div className="flex justify-center   mb-2 space-x-10">
          <button
            aria-current="page"
            className=" p-2  font-bold rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg transform transition hover:scale-105 focus:ring-4 focus:ring-purple-500 focus:outline-none animate-pulse"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="p-2  font-semibold rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md transform transition hover:scale-105 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
          >
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2 justify-center  w-full flex flex-col items-center  ">
          {formFields.map((field, index) => (
            <div key={index}>
             
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 transition"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-2/3 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-extrabold rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            Sign Up
          </button>
         
        </form>
        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-bold hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }
        .animate-shake {
          animation: shake 0.4s ease;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;