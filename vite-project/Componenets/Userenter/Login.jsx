import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobarRenderUrl } from '../../GlobalUrl'

export default function Login() {
  const [data, setdata] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate();

  const form = [
    { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter your password" }
  ]

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);
  try {
    const response = await axios.post(`${GlobarRenderUrl}/login`, data);
    setSuccess(response.data.msg);
    setError(null);
    sessionStorage.setItem('Id', response.data.user._id);
    navigate('/User');
  } catch (error) {
    setError(
      error.response?.data?.msg ||
      error.response?.data?.message ||
      "Login failed"
    );
    setSuccess(null);
  }
}

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="tab-buttons">
        <button className="active">Login</button>
        <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        {form.map((items, i) => (
          <div className="login-input-group" key={i}>
            <input
              type={items.type}
              name={items.name}
              placeholder={items.placeholder}
              value={data[items.name]}
              onChange={(e) => setdata({ ...data, [items.name]: e.target.value })}
              className="login-input"
              autoComplete="off"
              required
            />
          </div>
        ))}
        <button className="login-btn" type="submit">Submit</button>
        {success && <div className="login-success">{success}</div>}
        {error && <div className="login-error">{error}</div>}
      </form>
      <div className="login-link">
        Don't have an account? <span className="login-link-btn" onClick={() => navigate('/signup')}>Sign Up</span>
      </div>
    </div>
  )
}