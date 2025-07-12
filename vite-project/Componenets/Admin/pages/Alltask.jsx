import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/Gettask';
import { FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../GlobalUrl';

export default function Alltask() {
  const { data } = useContext(Context);


  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState(data || []);

  // Sync local tasks with context data
  useEffect(() => {
    setTasks(data || []);
  }, [data]);

  // Delete handler
  const HandleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`${GlobarRenderUrl}/deleteTask/${taskId}`);
      if (response.data.status === true) {
        setSuccess(response.data.msg);
        setError(null);
        setTasks(prev => prev.filter(task => task._id !== taskId));
      } else {
        setError(response.data.msg || "Failed to delete task");
        setSuccess(null);
      }
    } catch (error) {
      setError(error.response?.data?.msg || error.message || "Something went wrong");
      setSuccess(null);
      console.log(error);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTask({ title: task.title, description: task.description });
  };

  // Handle update
  const HandleUpdate = async (taskId) => {
    try {
      const response = await axios.put(`${GlobarRenderUrl}/updateTask/${taskId}`, {
        id: taskId,
        title: editTask.title,
        description: editTask.description,
      });
      if (response.data.status === true) {
        setSuccess(response.data.msg);
        setError(null);
        setTasks(prev =>
          prev.map(task =>
            task._id === taskId ? { ...task, ...editTask } : task
          )
        );
        setEditingId(null);
      } else {
        setError(response.data.msg || "Failed to update task");
        setSuccess(null);
      }
    } catch (error) {
      setError(error.response?.data?.msg || error.message || "Something went wrong");
      setSuccess(null);
      console.log(error);
    }
  };

  return (
    <div className="task-container">
      {tasks && tasks.length > 0 ? tasks.map((task) => (
        <div className="task-card" key={task._id}>
          {editingId === task._id ? (
            <>
              <input
                type="text"
                value={editTask.title}
                onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                placeholder="Title"
              />
              <input
                type="text"
                value={editTask.description}
                onChange={e => setEditTask({ ...editTask, description: e.target.value })}
                placeholder="Description"
              />
              <button className="action-btn" onClick={() => HandleUpdate(task._id)}>
                <FaSync /> Save
              </button>
              <button className="action-btn" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-actions">
                <button className="action-btn" onClick={() => startEdit(task)}>
                  <FaEdit /> Edit
                </button>
                <button className="action-btn" onClick={() => HandleDelete(task._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      )) : <div>No tasks found.</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  );
}