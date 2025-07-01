import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobarRenderUrl } from '../../GlobalUrl';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
       await  sessionStorage.setItem('Id', response.data.user._id);
        setSuccess(response.data.msg);
        setError(null);
       await navigate(`/otpverfication/${response.data.user._id}`);
      } else {
        setError(response.data.msg || 'Signup failed');
        setSuccess(null);
      }
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'An error occurred during signup'
      );
      setSuccess(null);
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup Form</h2>
      <div className="tab-buttons">
        <button className="active">Sign Up</button>
        <button type="button" onClick={() => navigate('/login')}>Login</button>
      </div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              
           
            />
          </div>
        ))}
        <button type="submit">Signup</button>
        {success && <div className="signup-success">{success}</div>}
        {error && <div className="signup-error">{error}</div>}
      </form>
      <div className="login-link">
        Already have an account? <span className="login-link-btn" onClick={() => navigate('/login')}>Login</span>
      </div>
    </div>
  );
};

export default SignUpForm;