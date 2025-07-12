import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { GlobarRenderUrl } from "../../GlobalUrl";
import React from "react";

const GetMonthlyById = createContext(null);

const GetMonthlyData = ({ children }) => {
  const userId = sessionStorage.getItem("Id");
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [yearlydata, setyaerlydata] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(new Date().getDate()); // Changed to getDate()
  const [err, seterr] = useState(null);

  useEffect(() => {
    const getMonthly = async () => {
      try {
        const response = await axios.get(
          `${GlobarRenderUrl}/getTaskCounts/${userId}/${currentYear}/${currentMonth}/${currentDay}`
        );
        setMonthlyData(response.data.monthlyTaskCount);
        setDailyData(response.data.dailyTaskCount);
        setyaerlydata(response.data.yearlyTaskCount);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          seterr(err.response.data.message);
        } else {
          seterr(err.message);
        }
        console.log(err);
      }
    };

    getMonthly();
  }, [userId, currentYear, currentMonth, currentDay]);

  return (
    <GetMonthlyById.Provider
      value={{
        monthlyData,
        setMonthlyData,
        dailyData,
        setDailyData,
        currentYear,
        setCurrentYear,
        currentMonth,
        setCurrentMonth,
        currentDay,
        setCurrentDay,
        yearlydata,
        setyaerlydata,
      }}
    >
      {children}
    </GetMonthlyById.Provider>
  );
};

export { GetMonthlyById, GetMonthlyData };