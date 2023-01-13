import styled from "@emotion/styled";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import posting from "../../assets/posting.svg";
import chatting from "../../assets/chatting.svg";
import alarm from "../../assets/alarm.svg";
import myprofile from "../../assets/myprofile.svg";

const Header = () => {
  const navigate = useNavigate();
  const onMovePostingHandler = () => {
    navigate("/posting");
  };
  const onMoveProfileHandler = () => {
    navigate("/profile");
  };

  return (
    <HeaderDiv>
      <Link to={"/"}>바이케이션</Link>
      <Icon>
        <img src={posting} onClick={onMovePostingHandler} />
        <img src={chatting} />
        <img src={alarm} />
        <img src={myprofile} onClick={onMoveProfileHandler} />
      </Icon>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
  & > a {
    color: black;
  }
`;
const Icon = styled.div`
  display: flex;
  gap: 23px;
`;
