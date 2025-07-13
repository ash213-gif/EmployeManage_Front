import React, { useState, useContext } from "react";
import { ImStatsBars } from "react-icons/im";
import { FaTasks, FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GetMonthlyById } from "../../Context/GetMonthlyById";
import { ToastContainer } from "react-toastify";
import { HiMenu } from "react-icons/hi";

const Dashboard = () => {
  const {
    monthlyData,
    setMonthlyData,
    dailyData,
    yearlyData,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    currentDay,
    yearlydata,
    setyaerlydata,
  } = useContext(GetMonthlyById);

  const [div, setdiv] = useState(false);

  const currentYearValue = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYearValue - i);
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(parseInt(event.target.value, 10));
  };

  const handleFetchData = () => {
    // Fetch data based on the selected year and month
    console.log("Fetching data for:", currentYear, currentMonth);
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md flex items-center justify-between hover:scale-105 transition-all cursor-pointer">
          <div>
            <h2 className="text-xl font-semibold">Monthly Tasks</h2>
            <p className="text-2xl">{monthlyData}</p>
          </div>
          <FaCalendarAlt className="text-4xl" />
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow-md flex items-center justify-between hover:scale-105 transition-all">
          <div>
            <h2 className="text-xl font-semibold">Yearly Tasks</h2>
            <p className="text-2xl">{yearlydata}</p>
          </div>
          <ImStatsBars className="text-4xl" />
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md flex items-center justify-between hover:scale-105 transition-all">
          <div>
            <h2 className="text-xl font-semibold">Daily Tasks</h2>
            <p className="text-2xl">{dailyData}</p>
          </div>
          <FaRegClock className="text-4xl" />
        </div>


        <div class="flex items-center p-4  bg-cyan-500 rounded-2xl shadow-md">
          <span class="text-lg font-semibold text-gray-800">
            Get data by their own
          </span>
          <HiMenu 
          onClick={()=>setdiv(!div)}
          className="ml-4 text-4xl text-white  hover:text-gray-800 cursor-pointer" />
        </div>
      </div>

       {  div && 
       
       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
       <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Select Year:
            </label>
            <select
              value={currentYear}
              onChange={handleYearChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="" disabled>
                Select Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Select Month:
            </label>
            <select
              value={currentMonth}
              onChange={handleMonthChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="" disabled>
                Select Month
              </option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleFetchData}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Fetch Data
            </button>
          </div>
        </div>
        </div>
        }
  

      

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
