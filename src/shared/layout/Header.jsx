import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderDiv>
      <Link to={"/"}>바이케이션</Link>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #888;
  & > a {
    color: black;
  }
`;
