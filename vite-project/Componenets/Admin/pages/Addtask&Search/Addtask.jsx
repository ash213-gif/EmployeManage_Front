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
      const response = await axios.post(
        "http://localhost:4040/createTask" || `${GlobarRenderUrl}/createTask`,
        task
      );
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
      toast.error(error.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center p-4">
        <ToastContainer />
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Add Task</h1>
          <form onSubmit={handleSubmit}>
            {fields.map((field, i) => (
              <div key={i} className="mb-4">
                <input
                  type={field.type}
                  name={field.name}
                  value={task[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Assign To:
              </label>
              <select
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Deadline:
              </label>
              <input
                type="date"
                name="deadline"
                value={task.deadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
        <Seacrch />
      </div>
    </>
  );
}