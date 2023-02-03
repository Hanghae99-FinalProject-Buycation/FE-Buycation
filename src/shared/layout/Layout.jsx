import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  return (
    <Wrap>
      <Header />
      <LayoutSt className={chatStatus}>
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
  overflow: ${(props) => (props.className === false ? "hidden" : "auto")};
`;
