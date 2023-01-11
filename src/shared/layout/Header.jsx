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
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0.5rem;
  & > a {
    color: black;
  }
`;
