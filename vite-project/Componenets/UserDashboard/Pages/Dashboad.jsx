import React, { useState } from 'react';
import { GlobarRenderUrl } from '../../../GlobalUrl';
import { ImCircleRight } from "react-icons/im";
import { useContext } from 'react';
import { GetMonthlyById, GetMonthlyData } from '../../Context/GetMonthlyById';
 
const MonthlyTaskCount = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [from, setForm] = useState(false);
    const [taskCount, setTaskCount] = useState(null);
    const [error, setError] = useState('');
    const userId = sessionStorage.getItem('Id');

    const { monthlyData} = useContext(GetMonthlyById)
    console.log(monthlyData);

    // Generate an array of years for the dropdown
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years
    const months = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.get(`${GlobarRenderUrl}/getMonthlyTaskCount/${userId}/${year}/${month}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTaskCount(data.taskCount);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('Error fetching task count.');
        }
    };

    return (
        <div className="monthly-task-count">
            <div className="header">
                <h1>Monthly Task Count</h1>
                <div className="total-tasks">
                    Total Tasks: {taskCount}
                    <ImCircleRight className="icon" onClick={() => setForm(true)} />
                </div>
            </div>

            {from && (
                <form onSubmit={handleSubmit} className="task-form">
                    <label>
                        User ID:
                        <input type="text" value={userId} readOnly className="input-field" />
                    </label>
                    <label>
                        Year:
                        <select value={year} onChange={(e) => setYear(e.target.value)} required className="select-field">
                            <option value="" disabled>Select Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Month:
                        <select value={month} onChange={(e) => setMonth(e.target.value)} required className="select-field">
                            <option value="" disabled>Select Month</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className="submit-button">Get Task Count</button>
                    <button type="button" onClick={() => setForm(false)} className="cancel-button">Cancel</button>
                </form>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default MonthlyTaskCount;
