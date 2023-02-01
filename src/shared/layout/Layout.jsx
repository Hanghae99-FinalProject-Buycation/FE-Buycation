import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LayoutSt = styled.div`
  flex: 1;
  width: 100%;
  min-height: 80vh;
`;
