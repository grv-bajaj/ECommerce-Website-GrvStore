export const formatToIST = (dateString, withTime = true) => {
  if (!dateString) return "";
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...(withTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
  return new Date(dateString).toLocaleString("en-IN", options);
};