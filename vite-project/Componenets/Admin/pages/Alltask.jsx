import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/Gettask';
import { FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import axios from 'axios';
import { GlobarRenderUrl } from '../../../GlobalUrl';
import { ToastContainer, toast } from 'react-toastify';

// --- Reusable Tailwind CSS classes for buttons and inputs ---
const baseButtonClasses = "inline-flex items-center justify-center gap-2 font-bold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";
const inputClasses = "w-full p-2 mb-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow";

export default function Alltask() {
  const { data } = useContext(Context);

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
        toast.success(response.data.msg);
        setTasks(prev => prev.filter(task => task._id !== taskId));
      } else {
        toast.error(response.data.msg || "Failed to delete task");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message || "Something went wrong");
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
        toast.success(response.data.msg);
        setTasks(prev =>
          prev.map(task =>
            task._id === taskId ? { ...task, ...editTask } : task
          )
        );
        setEditingId(null);
      } else {
        toast.error(response.data.msg || "Failed to update task");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks && tasks.length > 0 ? tasks.map((task, index) => (
          <div
            key={task._id}
            className={`bg-white shadow-lg rounded-xl p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              index % 3 === 0 ? 'border-l-4 border-indigo-500' : index % 3 === 1 ? 'border-l-4 border-green-500' : 'border-l-4 border-orange-500'
            }`}
          >
            {editingId === task._id ? (
              <div className="flex flex-col h-full">
                <input
                  type="text"
                  value={editTask.title}
                  onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                  placeholder="Title"
                  className={inputClasses}
                />
                <textarea
                  value={editTask.description}
                  onChange={e => setEditTask({ ...editTask, description: e.target.value })}
                  placeholder="Description"
                  className={`${inputClasses} flex-grow resize-none`}
                  rows="3"
                />
                <div className="mt-auto flex justify-end">
                  <button
                    className={`${baseButtonClasses} bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400`}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${baseButtonClasses} bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 ml-2`}
                    onClick={() => HandleUpdate(task._id)}
                  >
                    <FaSync />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    index % 3 === 0 ? 'text-indigo-500' : index % 3 === 1 ? 'text-green-500' : 'text-orange-500'
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-grow whitespace-pre-wrap">{task.description}</p>
                <div className="mt-auto flex justify-end">
                  <button
                    className={`${baseButtonClasses} bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-500`}
                    onClick={() => startEdit(task)}
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    className={`${baseButtonClasses} bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 ml-2`}
                    onClick={() => HandleDelete(task._id)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center text-slate-500 col-span-1 md:col-span-2 lg:col-span-3 mt-10">
            <h2 className="text-2xl font-semibold">No tasks found.</h2>
            <p>Create a new task to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

