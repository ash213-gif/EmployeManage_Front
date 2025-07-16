import React, { useEffect, useState, useContext } from "react";
import { Getusers } from "../../../Context/Getusefunction";
import Message from "../Mesage/Messages";

export default function Search() {
  const { getusers } = useContext(Getusers);
  const [showAdmin, setShowAdmin] = useState([]);
  const [selectadmin, setselectadmin] = useState(null);

  useEffect(() => {
    const filteredAdmins = getusers.filter((user) => user.role === "admin");
    setShowAdmin(filteredAdmins);
  }, [getusers]);

  return (
    <div className="flex h-screen m-0 p-0  space-x-5 ">
      <div className="bg-white rounded-lg w-1/4 shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chat with Admin</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search admins..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ul className="divide-y divide-gray-200">
          {showAdmin.map((admin, index) => (
            <li
              key={index}
              className={`py-4 cursor-pointer hover:bg-gray-50 rounded-md px-2 ${
                selectadmin === admin ? "bg-indigo-50" : ""
              }`}
              onClick={() => setselectadmin(admin)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
        {selectadmin ? (
          <Message selectedAdmin={selectadmin} />
        ) : (
          <Message selectedAdmin={null} />
        )}
      </div>
    </div>
  );
}