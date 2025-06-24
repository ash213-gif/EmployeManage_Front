import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({});

  const formFields = [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to handle form submission
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;