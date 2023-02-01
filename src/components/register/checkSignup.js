export const emailCheck =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
export const nicknameCheck = /^[가-힣|0-9|a-z|A-Z]{2,10}$/;
export const passCheck =
  /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

export const passValidate = (password, passCompare) => {
  if (passCheck.test(password) === true && passCheck.test(passCompare)) {
    return "비밀번호 사용 가능";
  } else {
    return "비밀번호 형식이나 내용이 일치하지 않습니다.";
  }
};
