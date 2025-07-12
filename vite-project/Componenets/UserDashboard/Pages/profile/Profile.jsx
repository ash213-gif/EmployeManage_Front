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
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3 xl:w-1/4 p-4 bg-white rounded shadow-md">
          <div className="flex flex-col items-center">
            {user && user.ProfileImg ? (
              <img
                src={user.ProfileImg}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <FaUserCircle size={90} color="#2d7ff9" />
            )}
            <h2 className="text-xl font-bold mt-4">{user ? user.name : 'Loading...'}</h2>
            <div className="flex items-center gap-2">
              <FaBriefcase />
              <span>{user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="flex items-center gap-2">
                <FaEnvelope />
                {user ? user.email : ''}
              </span>
              <span className="flex items-center gap-2">
                <FaPhone />
                {user && user.phone ? user.phone : '(not set)'}
              </span>
            </div>
            {user && user.role !== 'admin' && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlerole}
              >
                Become an Admin
              </button>
            )}
            {succes && <div className="text-green-500">{succes}</div>}
            {err && <div className="text-red-500">{err}</div>}
          </div>
        </div>
        <div className="lg:w-2/3 xl:w-3/4 p-4">
          <ProjectCard />
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="lg:w-1/2">
              <DetailedInformation />
            </div>
            <div className="lg:w-1/2">
              <Inbox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}