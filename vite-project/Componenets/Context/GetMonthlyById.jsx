import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { GlobarRenderUrl } from "../../GlobalUrl";
import React from "react";

const GetMonthlyById = createContext(null); 

const GetMonthlyData = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState(null);
  const userId = sessionStorage.getItem("Id"); 

  // Correctly initialize state for current year and month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const getMonthly = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getMonthlyTaskCount/${userId}/${currentYear}/${currentMonth}` );
        setMonthlyData(response.data.taskCount);
      } catch (err) {
        console.log(err);
      }
    };

    getMonthly(); 
  }, [userId, currentYear, currentMonth]); 

  return (
    <GetMonthlyById.Provider value={{ monthlyData, setMonthlyData, currentYear, setCurrentYear, currentMonth, setCurrentMonth }}>
      {children}
    </GetMonthlyById.Provider>
  );
};

export { GetMonthlyById, GetMonthlyData };
