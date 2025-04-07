const formatDateTime = (datein, timein) => {
  const date = new Date(datein); 
  const time = new Date(timein); // Ensure startTime is a valid date string or timestamp

  // Extract date components
  const day = String(date.getDate()).padStart(2, '0'); // Day (dd)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (mm)
  const year = date.getFullYear(); // Year (yyyy)

  // Get day of the week (3-letter abbreviation)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[date.getDay()]; // Day of the week

  // Extract time components
  const hours = String(time.getHours()).padStart(2, '0'); // Hours (hh)
  const minutes = String(time.getMinutes()).padStart(2, '0'); // Minutes (mm)

  // Get timezone offset
  const timezoneOffset = - time.getTimezoneOffset(); // Get offset in minutes
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const gmtOffset = `GMT${timezoneOffset >= 0 ? '+' : '-'}${offsetHours}:${offsetMinutes}`;

  // Construct the formatted string
  return `${day}/${month}/${year} ${dayOfWeek} at ${hours}:${minutes} (${gmtOffset})`;
};

export default formatDateTime