import { Global, css } from "@emotion/react";

const styles = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");

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

  a {
    color: #000000;
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

  //IOS CSS 적용
  img,
  input,
  select,
  button,
  textarea {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;
