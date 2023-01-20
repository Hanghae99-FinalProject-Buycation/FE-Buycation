//주소 데이터 수정
export const addressForm = (address) => {
  const arr = address.split(" ", 3).join(" ");
  return arr;
};

//제목 데이터 수정
export const titleForm = (title) => {
  if (title.length < 12) {
    return title;
  } else {
    return title.substr(0, 11) + "...";
  }
};

export const longTitleForm = (title) => {
  if (title?.length < 60) {
    return title;
  } else {
    return title?.substr(0, 60) + "...";
  }
};

// 금액 자릿수 추가
export const countComma = (money) => {
  return money?.toLocaleString("ko-KR") + "원";
};
