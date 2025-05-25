
const getStatus = (startDate, startTime, endDate, endTime) => {
  if(!startDate || !startTime || !endDate || !endTime) return "past";

  const now = Date.now();
  let sh, smin, eh, emin;

  const [sy, sm, sd] = startDate.split("T")[0].split("-").map(Number);
  const [ey, em, ed] = endDate.split("T")[0].split("-").map(Number);

  if (endTime.includes("T") && startTime.includes("T")){
    [sh, smin] = startTime.split("T")[1].split(":").map(Number);
    [eh, emin] = endTime.split("T")[1].split(":").map(Number);
  } else {
    [sh, smin] = startTime.split(":").map(Number);
    [eh, emin] = endTime.split(":").map(Number);
  }
  
  const start = new Date(sy, sm - 1, sd, sh, smin).getTime();
  const end = new Date(ey, em - 1, ed, eh, emin).getTime();

  if (now >= start && now <= end) return "ongoing";
  if (now > end) return "past";
  return "upcoming";
};

export default getStatus;
