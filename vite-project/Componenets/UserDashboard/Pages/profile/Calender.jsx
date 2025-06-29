import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const daysArray = Array(daysInMonth).fill(null).map((_, index) => index + 1);
    const paddedDays = Array(firstDay).fill(null).concat(daysArray);

    setDays(paddedDays);
  }, [date]);

  return (
    <div className="calendar">
      <h2>{date.toLocaleString('default', { month: 'long' })}</h2>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;