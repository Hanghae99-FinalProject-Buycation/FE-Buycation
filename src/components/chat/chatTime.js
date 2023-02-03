const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = date.getDate();
const hour = date.getHours();
const mins = date.getMinutes("ko-kr");

const joinDates = (number) => {
  return String(number).padStart(2, "0");
};

export const chatTime = `${month}월 ${joinDates(day)}일 ${joinDates(
  hour
)}:${joinDates(mins)}`;
