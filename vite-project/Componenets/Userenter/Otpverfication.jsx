import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobarRenderUrl } from '../../GlobalUrl'

export default function Otpverfication() {

  const [otp, setotp] = useState('')
  const navigate = useNavigate();
  const Sigupid = sessionStorage.getItem('SignupId');
  const [success, setsuccess] = useState(null)
  const [error, seterror] = useState(null)

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${GlobarRenderUrl}/verifyotp/${Sigupid}`, { otp: otp })
    if (await response.data.status === true) {
      setsuccess(response.data.msg);
      seterror(null);
      navigate('/User');
    } else {
      seterror(response.data.msg);
      setsuccess(null);
    
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.msg) {
      seterror(err.response.data.msg);
      setsuccess(null);
    } else {
      seterror("Error during OTP verification.");
      setsuccess(null);
    }
    console.error("Error during OTP verification:", err);
  }
}

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="number"
          className="otp-input"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit" className="otp-btn">SUBMIT</button>
      </form>
      {success && <div className="otp-success">{success}</div>}
      {error && <div className="otp-error">{error}</div>}
    </div>
  )
}