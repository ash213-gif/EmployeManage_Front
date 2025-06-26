import React, { useState } from 'react';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../GlobalUrl';
export default function Addtask() {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fields = [
    { type: 'text', placeholder: 'Enter your title', name: 'title' },
    { type: 'text', placeholder: 'Enter your description', name: 'description' }
  ];

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(`${GlobarRenderUrl}/createTask`, task);
      if (response.data.status === true) {
        setSuccess(response.data.msg);
        setTask({ title: '', description: '' });
      } else {
        setError(response.data.msg || "Failed to add task");
      }
      // Only store UserId if it exists in response
      if (response.data.data && response.data.data._id) {
       const StoreID=  await  sessionStorage.setItem('UserId', response.data.data._id);
      }
    } catch (error) {
      setError(error.response?.data?.msg || error.message || "Something went wrong");
    }
  };

  return (
    <div className="add-task-container">
      <h1 className="add-task-title">Add Task</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        {fields.map((field, i) => (
          <div key={i} className="form-group">
            <input
              type={field.type}
              name={field.name}
              value={task[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </form>
    </div>
  );
}