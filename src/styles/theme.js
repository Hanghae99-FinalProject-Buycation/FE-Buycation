const theme = {
  colors: {
    black: "#000",
    dark: "#191a20",
    primary: "#3f4150",
    secondary: "#8c",
  },

  fontSize: {
    xs: "0.750rem", //12px
    sm: "0.875em", // 14px
    md: "1em", // 16px
    lg: "1.125rem", //18px
    xl: "1.313rem", //21px
  },

  lineHeight: {
    perSpan: "1rem", // 15px 근처, 문단 이하 몇 줄짜리 간격
    perParagraph: "1.125rem", // 20px, 문단 내 간격
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
