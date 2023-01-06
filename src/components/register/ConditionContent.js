export const conditionContent = [
  // {
  //   num: 1,
  //   title:
  //     "필수동의 항목 및 개인정보 수집 및 이용 동의(선택)에 모두 동의합니다.",
  // },
  {
    num: 2,
    title: "[필수] 이용약관 동의",
    clickEvent: () => {
      console.log("hey");
    },
  },
  { num: 3, title: "[필수] 개인정보 수집 및 이용 동의", clickEvent: () => {} },
  { num: 4, title: "[선택] 개인정보 수집 및 이용 동의", clickEvent: () => {} },
];
