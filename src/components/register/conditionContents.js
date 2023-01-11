export const conditionContents = [
  {
    id: 1,
    title: "약관 전체 동의",
    gridArea: "elSpan",
    gridTemplateAreas: `"elSpan . checkbox"`,
  },
  {
    id: 2,
    title: "",
    gridArea: "elHr",
    gridTemplateAreas: `"elHr elHr elHr"
    `,
  },
  {
    id: 3,
    title: "[필수] 이용약관 동의",
    gridArea: "elSpan",
    gridTemplateAreas: `"elSpan . checkbox"\n"moreDiv moreDiv moreDiv"`,
    fullText: `이용약관 동의입니다. 줄바꿈이 있을지 모름.`,
  },
  {
    id: 4,
    title: "[필수] 개인정보 수집 및 이용 동의",
    gridArea: "elSpan",
    gridTemplateAreas: `"elSpan . checkbox"\n"moreDiv moreDiv moreDiv"`,
    fullText: `개인정보 수집 필수 동의입니다. 줄바꿈이 있을지 모름.`,
  },
  {
    id: 5,
    title: "[선택] 개인정보 수집 및 이용 동의",
    gridArea: "elSpan",
    gridTemplateAreas: `"elSpan . checkbox"\n"moreDiv moreDiv moreDiv"`,
    fullText: `개입정보 수집 선택 동의입니다. 줄바꿈이 있을지 모름.`,
  },
];
