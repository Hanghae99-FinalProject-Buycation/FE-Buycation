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
  select,
  text-align,
  a {
    border: 0;
    outline: none !important;
    box-sizing: border-box;
    text-decoration: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;
