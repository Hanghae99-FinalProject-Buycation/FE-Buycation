//주소 데이터 수정
export const addressForm = (address) => {
  let arr = address.split(" ", 3);
  let output = "";
  for (let name of arr) {
    output += name + " ";
  }
  return output;
};

//날짜 데이터 수정 후 비교
export const comparedDate = (dueDate) => {
  //현재 시간 구하기
  let currentDate = new Date();
  const nowYear = String(currentDate.getFullYear());
  let nowMonth = String(currentDate.getMonth() + 1);
  const nowDay = String(currentDate.getDate());
  let nowHours = String(currentDate.getHours());
  let nowMinutes = String(currentDate.getMinutes());

  function plusZeroMonth(nowMonth) {
    let newMonth = nowMonth;
    if (nowMonth.length < 2) {
      newMonth = "0" + nowMonth;
      return newMonth;
    } else {
      return newMonth;
    }
  }
  function plusZeroHour(nowHours) {
    let newHour = nowHours;
    if (nowHours.length < 2) {
      newHour = "0" + nowHours;
      return newHour;
    } else {
      return newHour;
    }
  }
  function plusZeroMinutes(nowMinutes) {
    let newMinutes = nowMinutes;
    if (nowHours.length < 2) {
      newMinutes = "0" + nowMinutes;
      return newMinutes;
    } else {
      return newMinutes;
    }
  }

  let newMonth = plusZeroMonth(nowMonth);
  let newHour = plusZeroHour(nowHours);
  let newMinutes = plusZeroMinutes(nowMinutes);

  let date = nowYear + newMonth + nowDay + newHour + newMinutes;

  //모집 기한 구하기
  let newDueDateForm = dueDate.split(" ");
  let newDueDate = newDueDateForm[0];
  let DueDate = newDueDate.split("-", 3).join("");
  let newDueTime = newDueDateForm[1];
  let DueTime = newDueTime.split(":", 2).join("");

  let due = DueDate + DueTime;

  //console.log(date);
  //console.log(due);

  return Number(date) > Number(due) ? false : true;
};

let dueDate = "2023-01-13 09:23";
comparedDate(dueDate);
