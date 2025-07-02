import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaUserCircle, FaBriefcase } from 'react-icons/fa';
import Calendar from './Calender';
import ProjectCard from './Projects';
import DetailedInformation from './Detaled';
import Inbox from './Inbox';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../../GlobalUrl'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [err, seterr] = useState(null);
  const [succes, setsucess] = useState(null);
  const navigate = useNavigate();

  // Fetch user on mount
  useEffect(() => {
    const userId = sessionStorage.getItem('Id');
    setId(userId);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getuser/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) fetchUser();
  }, []);

  // Change role and refresh user data
  const handlerole = async () => {
    try {
      const response = await axios.put(`${GlobarRenderUrl}/changerole/${id}`, { role: 'admin' });
      if (response.data.status === true) {
        setsucess(response.data.msg);
        seterr(null);
        // Fetch updated user data after role change
        const updatedUser = await axios.get(`${GlobarRenderUrl}/getuser/${id}`);
        setUser(updatedUser.data.user);
      } else {
        seterr(response.data.msg);
        setsucess(null);
      }
    } catch (e) {
      seterr(e.response?.data?.msg || e.message);
      setsucess(null);
      console.log(e);
    }
  };

  return (
    <div className='fullprofile'>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user && user.ProfileImg ? (
              <img
                src={user.ProfileImg}
                alt={user.name}
                style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2d7ff9' }}
              />
            ) : (
              <FaUserCircle size={90} color="#2d7ff9" />
            )}
          </div>
          <h2 className="profile-name">{user ? user.name : 'Loading...'}</h2>
          <div className="profile-role">
            <FaBriefcase className="profile-role-icon" />
            <span>{user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}</span>
          </div>
          <div className="contact-info">
            <span>
              <FaEnvelope className="profile-contact-icon" />
              {user ? user.email : ''}
            </span>
            <span>
              <FaPhone className="profile-contact-icon" />
              {user && user.phone ? user.phone : '(not set)'}
            </span>
            {user && user.role !== 'admin' && (
              <button onClick={handlerole}>Become an Admin</button>
            )}
            {succes && <div className="success-msg">{succes}</div>}
            {err && <div className="error-msg">{err}</div>}
          </div>
        </div>
        <ProjectCard />
      </div>
      <div className="anotherContainer">
        <div className="detailed-info-section">
          <DetailedInformation />
        </div>
        {/* <div className="calendar-section">
          <Calendar />
        </div> */}
        <div className="inbox-section">
          <Inbox />
        </div>
      </div>
    </div>
  );
}