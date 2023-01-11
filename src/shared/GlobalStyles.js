import { Global, css } from "@emotion/react";

const styles = css`
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    font-family: "Pretendard-Regular";
  }

  body {
    font-size: 1rem;
    color: #000000;
    padding: 0;
    margin: 0;
    font-family: "Pretendard-Regular";
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
