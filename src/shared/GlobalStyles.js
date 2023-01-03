import { Global, css } from "@emotion/react";

const styles = css`
  html {
    font-size: 16px;
  }

  body {
    /* font-family: ; */
  }

  button,
  input,
  select,
  text-align {
    border: 0;
    outline: 0 !important;
  }
`;

const GlobalStyles = () => {
  return <Global styles={styles} />;
};

export default GlobalStyles;
