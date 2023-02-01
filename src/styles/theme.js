const theme = {
  colors: {
    main: "#FF5A5F",
    black: "#000000",
    dark: "#191a20",
    primary: "#3f4150",
    secondary: "#8c",
    grayList: "#ECF0F2", // 리스트 비강조
    grayWeak: "#D9D9D9", // 회색 비강조
    grayMid: "#A6A6A6",
    grayStrong: "#939393", // 회색 강조
    grayHover: "#616161", //호버 시 진한 회색
    imgFilter:
      "invert(41%) sepia(45%) saturate(1242%) hue-rotate(317deg) brightness(112%) contrast(101%);",
    imgFilterBlack:
      "filter: invert(0%) sepia(6%) saturate(0%) hue-rotate(351deg) brightness(90%) contrast(105%);",
  },

  fontSize: {
    xs: "0.750rem", //12px
    sm: "0.875em", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", //18px
    xl: "1.313rem", //21px
  },

  lineHeight: {
    perSpan: "1rem", // 15px 근처, 문단 이하 몇 줄짜리 간격
    perParagraph: "1.5rem", // 24px, 문단 내 간격
    perDiv: "2rem", // 30px 근처, 문단 간 간격
  },

  common: {
    flexCenter: `display: flex;
    align-items: center;
    justify-content: center;
    `,
  },
};

export default theme;
