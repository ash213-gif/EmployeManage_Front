import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/signup');
  };

  return (
    <div className='logoutContainer' >


    <div style={{ height: "screen",
   
     
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2>Are you sure you want to logout?</h2>
      <button
        onClick={handleLogout}
        style={{

          marginTop: "20px",
          padding: "10px 32px",
          background: "black",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
        </div>
  );
}