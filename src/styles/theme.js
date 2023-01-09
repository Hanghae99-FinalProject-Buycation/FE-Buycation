const theme = {
  colors: {
    main: "#FF5A5F",
    black: "#000",
    dark: "#191a20",
    primary: "#3f4150",
    secondary: "#8c",
    grayList: "#ECF0F2", // 리스트 비강조
    grayWeak: "#D9D9D9", // 회색 비강조
    grayStrong: "#939393", // 회색 강조
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

  signup: {
    divGrid: `
    display: grid;
    grid-template-columns: 8rem 12rem 4.5rem 8rem;
    // grid-template-columns: 8rem 1fr auto 8rem;
    align-items:center;
    gap:0.5rem;
    margin: 0.5rem;
    `,
  },
};

export default theme;
