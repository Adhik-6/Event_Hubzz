
const getStatus = (startDate, startTime, endDate, endTime) => {
  const currentDate = new Date();
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (currentDate >= start && currentDate <= end) return "ongoing";
  else if (currentDate > end) return "past";
  else return "upcoming";
};

export default getStatus;