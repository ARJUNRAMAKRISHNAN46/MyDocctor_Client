import React, { useState } from 'react';
import dayjs from 'dayjs';

const DatePicker: React.FC = () => {
  const [currentStartDate, setCurrentStartDate] = useState(dayjs());

  const generateDates = (startDate: dayjs.Dayjs, numDays: number) => {
    return Array.from({ length: numDays }, (_, i) => ({
      day: startDate.add(i, 'day').format('ddd'),
      date: startDate.add(i, 'day').date(),
      fullDate: startDate.add(i, 'day').toDate(),
    }));
  };

  const handlePrevClick = () => {
    setCurrentStartDate(currentStartDate.subtract(10, 'day'));
  };

  const handleNextClick = () => {
    setCurrentStartDate(currentStartDate.add(10, 'day'));
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const fetchSlots = (date: Date) => {
    // Placeholder function to simulate fetching slots
    console.log(`Fetching slots for date: ${date}`);
  };

  const dates = generateDates(currentStartDate, 10);

  return (
    <div className="flex items-center justify-center p-4">
      <button className="p-2 bg-red-500 text-white rounded-full mx-2" onClick={handlePrevClick}>&lt;</button>
      <div className="flex overflow-x-auto">
        {dates.map((d, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-2 cursor-pointer ${selectedDate?.toDateString() === d.fullDate.toDateString() ? 'text-red-500' : 'text-gray-700'}`}
            onClick={() => handleDateClick(d.fullDate)}
          >
            <span>{d.day}</span>
            <span className={`rounded-full p-2 ${selectedDate?.toDateString() === d.fullDate.toDateString() ? 'bg-red-500 text-white' : ''}`}>{d.date}</span>
          </div>
        ))}
      </div>
      <button className="p-2 bg-red-500 text-white rounded-full mx-2" onClick={handleNextClick}>&gt;</button>
    </div>
  );
};

export default DatePicker;
