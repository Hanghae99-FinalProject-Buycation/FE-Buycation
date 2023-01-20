import { Global, css } from "@emotion/react";

const styles = css`
  @font-face {
    font-family: "Pretendard";
    font-style: normal;
    src: local("Pretendard") url("../styles/fonts/Pretendard-Regular.woff2")
      format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Pretendard";
    font-style: bold;
    src: local("Pretendard") url("../styles/fonts/Pretendard-SemiBold.woff2")
      format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Pretendard";
    font-style: bold;
    src: local("Pretendard") url("../styles/fonts/Pretendard-Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    font-family: "Pretendard";
  }

  body {
    font-size: 1rem;
    color: #000000;
    padding: 0;
    margin: 0;
    font-family: "Pretendard";
  }

  button,
  input,
  textarea,
  select,
  text-align,
  a {
    border: 0;
    outline: none !important;
    box-sizing: border-box;
    text-decoration: none;
    resize: none;
  }

  a,
  button {
    cursor: pointer;
  }

  select {
    color: #a6a6a6;
  }

  textarea::placeholder {
    color: #a6a6a6;
  }

  input::placeholder {
    color: #a6a6a6;
  }

  input::file-selector-button {
    display: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;
