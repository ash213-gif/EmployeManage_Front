import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaUserCircle, FaBriefcase } from 'react-icons/fa';
import Calendar from './Calender';
import ProjectCard from './Projects';
import DetailedInformation from './Detaled';
import Inbox from './Inbox';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../../GlobalUrl'

export default function Profile() {
  const [user, setUser] = useState(null);
useEffect(() => {
  const fetchUser = async () => {
    const id = sessionStorage.getItem('Id');
    console.log(id);
    try {
      const response = await axios.get(`${GlobarRenderUrl}/getuser/${id}`);
      setUser(response.data.user); // Set user state if your backend returns { user: ... }
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  fetchUser();
}, []);

  return (
    <div className='fullprofile'>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {/* {user && user.ProfileImg ? (
              <img
                src={user.ProfileImg}
                alt={user.name}
                style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2d7ff9' }}
              />
            ) : (
              <FaUserCircle size={90} color="#2d7ff9" />
            )} */}
            {user && user.name}
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
              {/* You can add phone field in user schema and show here */}
              {user && user.phone ? user.phone : '(not set)'}
            </span>
            <button>Become an Admin</button>
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