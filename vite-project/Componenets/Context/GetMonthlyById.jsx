import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { GlobarRenderUrl } from "../../GlobalUrl";
import React from "react";

const GetMonthlyById = createContext(null); // Corrected the context name

const GetMonthlyData = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState(null);
  const userId = sessionStorage.getItem("Id"); // Ensure userId is defined
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    const getMonthly = async () => {
      try {
        const response = await axios.get(  `http://localhost:4040/getMonthlyTaskCount/${userId}/${currentYear}/${currentMonth}` ||`${GlobarRenderUrl}/getMonthlyTaskCount/${userId}/${currentYear}/${currentMonth}` );
        console.log(response);
        setMonthlyData(response.data.taskCount);
      } catch (err) {
        console.log(err);
      }
    };

    getMonthly(); // Call the function to fetch data
  }, [userId, currentYear, currentMonth]); // Dependencies for useEffect

  return (
    <GetMonthlyById.Provider value={{ monthlyData, setMonthlyData }}>
      {children}
    </GetMonthlyById.Provider>
  );
};

export { GetMonthlyById, GetMonthlyData };
