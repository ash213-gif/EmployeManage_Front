import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaUserCircle, FaBriefcase } from 'react-icons/fa';
import Calendar from './Calender';
import ProjectCard from './Projects';
import DetailedInformation from './Detaled';
import Inbox from './Inbox';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../../GlobalUrl';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
   const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [err, seterr] = useState(null);
  const [succes, setsucess] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   useEffect(() => {
    const userId = sessionStorage.getItem('Id');
    setId(userId);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getuser/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        seterr("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUser();
    else setLoading(false);
  }, []);

  const handlerole = async () => {
    try {
      const response = await axios.put(`${GlobarRenderUrl}/changerole/${id}`, { role: 'admin' });
      if (response.data.status === true) {
        setsucess(response.data.msg);
        seterr(null);
        const updatedUser = await axios.get(`${GlobarRenderUrl}/getuser/${id}`);
        setUser(updatedUser.data.user);
        if(updatedUser.data.user.role === 'admin') {
          navigate('/admin')
        }
      } else {
        seterr(response.data.msg);
        setsucess(null);
      }
    } catch (e) {
      seterr(e.response?.data?.msg || e.message);
      setsucess(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }



  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 xl:w-1/4 p-6 bg-white rounded-2xl h-full shadow-lg border-2 border-indigo-200">
          <div className="flex flex-col items-center">
            {user && user.ProfileImg ? (
              <img
                src={user.ProfileImg}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400"
              />
            ) : (
              <FaUserCircle size={100} className="text-indigo-500" />
            )}
            <h2 className="text-2xl font-bold mt-4 text-indigo-700">{user ? user.name : 'Loading...'}</h2>
            <div className="flex items-center gap-2 mt-2 text-purple-600">
              <FaBriefcase />
              <span>{user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}</span>
            </div>
            <div className="flex flex-col gap-3 mt-6 w-full">
              <span className="flex items-center gap-3 text-blue-600">
                <FaEnvelope className="text-lg" />
                <span className="text-blue-800">{user ? user.email : ''}</span>
              </span>
              <span className="flex items-center gap-3 text-blue-600">
                <FaPhone className="text-lg" />
                <span className="text-blue-800">{user && user.phone ? user.phone : '(not set)'}</span>
              </span>
            </div>
            {user && user.role !== 'admin' && (
              <button
                className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handlerole}
              >
                Become an Admin
              </button>
            )}
            {succes && <div className="mt-4 text-green-600 font-semibold">{succes}</div>}
            {err && <div className="mt-4 text-red-600 font-semibold">{err}</div>}
          </div>
        </div>
        <div className="lg:w-2/3 xl:w-3/4 space-y-6">

          <div className="   ">
            <ProjectCard />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
              <DetailedInformation />
            </div>
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
              <Inbox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}