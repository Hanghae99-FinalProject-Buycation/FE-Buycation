import { Global, css } from "@emotion/react";

const styles = css`
  html {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    /* font-family: ; */
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
  }

  input::file-selector-button {
    display: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;
