import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarComponentProps {
  onDateChange: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <Calendar
        onChange={() => handleDateChange(date)}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
