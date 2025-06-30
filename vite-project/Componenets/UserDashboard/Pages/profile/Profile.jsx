import React from 'react';
import { FaEnvelope, FaPhone, FaUserCircle, FaBriefcase } from 'react-icons/fa';
import Calendar from './Calender';
import ProjectCard from './Projects';
import DetailedInformation from './Detaled';
import Inbox from './Inbox';



export default function Profile() {


  const GetId= sessionStorage.getItem('SignupId')
  console.log(GetId);

  return (
    <>
    <div className='fullprofile' >
      <div className="profile-container">

        <div className="profile-card">
          <div className="profile-avatar">
            <FaUserCircle size={90} color="#2d7ff9" />
          </div>
          <h2 className="profile-name">Robert Smith</h2>
          <div className="profile-role">
            <FaBriefcase className="profile-role-icon" />
            <span>Product Designer</span>
          
          </div>
          <div className="contact-info">
            <span>
              <FaEnvelope className="profile-contact-icon" />
              robertsmith64@gmail.com
            </span>
            <span>
              <FaPhone className="profile-contact-icon" />
              (555) 555-5674
            </span>
            <button>Become an Admin </button>
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
    </>


  )
}