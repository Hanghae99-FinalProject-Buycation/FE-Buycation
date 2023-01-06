export const formContents = [
  {
    id: 1,
    title: "이메일*",
    placeholder: "이메일",
    btnText: "이메일 인증",
    gridArea: ["elSpan", "elInput", "elInput", "elBtn"],
    gridTemplateAreas: "elSpan elInput elInput elBtn",
  },
  {
    id: 2,
    title: "인증번호 확인*",
    placeholder: "제한시간 10분",
    btnText: "확인",
    gridArea: ["elSpan", "elInput", "elConfirmBtn", "elResendBtn"],
    gridTemplateArea: "elSpan elInput elConfirmBtn elResendBtn",
  },
];
