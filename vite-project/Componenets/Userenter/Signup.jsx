import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobarRenderUrl } from '../../GlobalUrl';

const SignUpForm = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const formFields = [
    { label: 'Name', type: 'text', name: 'name', placeholder: 'enter your name ' },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'enter your email ' },
    { label: 'Password', type: 'password', name: 'password', placeholder: 'enter your password  ' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${GlobarRenderUrl}/signup`, formData);
      if (response.data.status === true) {
        setFormData(response.data.user)
        sessionStorage.setItem('SignupId', response.data.user._id)
        navigate(`/otpverfication/${response.data.user._id}`)
      }

    } catch (error) {
      setError(
        error?.response?.data?.msg ||
        error?.response?.msg ||
        error?.message ||
        'Signup failed. Please try again.'
      )
      console.log(error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup Form</h2>
      <div className="tab-buttons">
        <button className="active">Sign Up</button>
        <button onClick={() => navigate('/login')}>Login</button>

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
      </form>
      <div className="login-link">
        Already have an account? <a href="#">Login</a>
      </div>
    </div>
  );
};

export default SignUpForm;