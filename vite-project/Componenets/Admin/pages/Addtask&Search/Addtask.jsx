import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobarRenderUrl } from "../../../../GlobalUrl";
import { toast, ToastContainer } from "react-toastify";
import Seacrch from "./Seacrch";
import { Getusers } from "../../../Context/Getusefunction";

export default function Addtask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  const { getusers } = useContext(Getusers);

  const [employees, setEmployees] = useState([]);

  const fields = [
    { type: "text", placeholder: "Enter your title", name: "title" },
    {
      type: "text",
      placeholder: "Enter your description",
      name: "description",
    },
  ];

  useEffect(() => {
    if (getusers && Array.isArray(getusers)) {
      const filteredUsers = getusers.filter((user) => user.role === "user");
      setEmployees(filteredUsers);
    }
  }, [getusers]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${GlobarRenderUrl}/createTask`, task);
    console.log(response);
    if (response.data.status) {
      toast.success(response.data.msg);
      setTask({ title: "", description: "", assignedTo: "", deadline: "" });
    } else {
      toast.error(response.data.msg || "Failed to add task");
    }

    if (response.data.data && response.data.data._id) {
      sessionStorage.setItem("UserId", response.data.data._id);
      console.log("UserId stored in sessionStorage:", response.data.data._id);
    }
  } catch (error) {
    console.error("Error occurred during task submission:", error); // Log error details
    toast.error(error.response?.data?.msg || "Error occurred");
  }
};

  return (
    <>
       <div className="min-h-screen flex items-center justify-center p-4">
      <ToastContainer />
      <div className="w-[370px] max-w-md bg-white rounded-4xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 ">
          <h1 className="text-2xl font-bold text-white text-center">Add Task</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {fields.map((field, i) => (
            <div key={i}>
              <input
                type={field.type}
                name={field.name}
                value={task[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To:
            </label>
            <select
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              required
            >
              <option value="">Select Employee</option>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))
              ) : (
                <option disabled>No employees available</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline:
            </label>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              required
            />
          </div>
          <div className="flex justify-center" >
 <button
            type="submit"
            className="w-2/3 bg-gradient-to-r flex  justify-center from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-3xl hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Submit Task
          </button>
          </div>
         
        </form>
      </div>
    </div>
    </>
  );
}