import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../../GlobalUrl';

const DetailedInformation = () => {
  const id = sessionStorage.getItem('Id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getuser/${id}`);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="detailed-information">
      <h2>Detailed Information</h2>
      <ul>
        <li>
          <span className="label">Full Name:</span>
          <span className="value">{user ? user.name : 'Loading...'}</span>
        </li>
        <li>
          <span className="label">Email Address:</span>
          <span className="value">{user ? user.email : 'Loading...'}</span>
        </li>
        <li>
          <span className="label">Contact Number:</span>
          <span className="value">{user && user.phone ? user.phone : '(not set)'}</span>
        </li>
        <li>
          <span className="label">Designation:</span>
          <span className="value">{user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}</span>
        </li>
        <li>
          <span className="label">Availability:</span>
          <span className="value">Schedule the time slot</span>
        </li>
      </ul>
    </div>
  );
};

export default DetailedInformation;