import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Wrap>
      <Header />
      <LayoutSt>
        <Outlet />
      </LayoutSt>
    </Wrap>
  );
};

export default Layout;

const Wrap = styled.div`
  height: 100%;
`;

const LayoutSt = styled.div`
  flex: 1;
  width: 100%;
  min-width: 1440px;
  min-height: 80vh;
`;
