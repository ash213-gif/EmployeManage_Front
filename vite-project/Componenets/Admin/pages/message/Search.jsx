import React, { useEffect, useState, useContext } from "react";
import { Getusers } from "../../../Context/Getusefunction";
import Message from "../message/Mssage";
import axios from "axios";
import { GlobarRenderUrl } from "../../../../GlobalUrl";

export default function Search() {
  const { getusers } = useContext(Getusers);
  const [showuser, setshowuser] = useState([]);
  const [selectadmin, setselectadmin] = useState(null);
  const [details, setdetaisls] = useState(null);
  const profileName = sessionStorage.getItem("Id");

  useEffect(() => {
    const filterUser = getusers.filter((user) => user.role === "user");
    setshowuser(filterUser);
  }, [getusers]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(  `http://localhost:4040/getuser/${profileName}` || `${GlobarRenderUrl}/getuser/${profileName}` );
        setdetaisls(response.data.user.name);
        
      } catch (err) {
        console.log(err);
      }
    }; fetchDetails()
  }, [details]);

  return (
    <div className="flex h-screen space-x-5 bg-gray-100 p-4">
      <div className="bg-white w-1/4 rounded-lg shadow-md p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Chat with User
          <span className="text-blue-800" >{  `${details}`}</span> 
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ul className="divide-y divide-gray-200">
          {showuser.map((user, index) => (
            <li
              key={index}
              className="py-4 cursor-pointer hover:bg-gray-50 rounded-md px-2"
              onClick={() => setselectadmin(user)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
        <Message selectedAdmin={selectadmin} />
      </div>
    </div>
  );
}
