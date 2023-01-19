//주소 데이터 수정
export const addressForm = (address) => {
  let arr = address.split(" ", 3);
  let output = "";
  for (let name of arr) {
    output += name + " ";
  }
  return output;
};

//제목 데이터 수정
export const titleForm = (title) => {
  if (title.length < 12) {
    return title;
  } else {
    return title.substr(0, 11) + "...";
  }
};
