import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import GlobalStyles from "./shared/GlobalStyles";
import Router from "./shared/Router";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
