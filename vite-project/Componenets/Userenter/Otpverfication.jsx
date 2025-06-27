import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import{ GlobarRenderUrl } from '../../GlobalUrl'


export default function Otpverfication() {

const [otp,setotp]= useState('')
const navigate = useNavigate();
const Sigupid = sessionStorage.getItem('SignupId');

const  handleSubmit = async (e) => {
  e.preventDefault();

  try{
const response = await axios.post(`${GlobarRenderUrl}/verifyotp/${Sigupid}`, otp)
console.log(response);
  }
  catch(err){
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
    </div>
  )
}
