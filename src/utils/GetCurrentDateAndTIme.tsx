export function getCurrentDate() {
    const currentDate = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = currentDate.getMonth();
    const month = months[monthIndex];
    const day = currentDate.getDate();
    const dayOfWeek = currentDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[dayOfWeek];
    return `${month} ${day} ${dayName}`;
}

export function getFutureDate(offset: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;
    return `${year}-${formattedMonth}-${formattedDay}`;
}

export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };