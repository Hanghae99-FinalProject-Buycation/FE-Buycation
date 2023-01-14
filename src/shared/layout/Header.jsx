import styled from "@emotion/styled";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import postingIcon from "../../assets/headerIcon/postingIcon.svg";
import chattingIcon from "../../assets/headerIcon/chattingIcon.svg";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";

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
        <img alt="posting" src={postingIcon} onClick={onMovePostingHandler} />
        <img alt="chatting" src={chattingIcon} />
        <img alt="alarm" src={alarmIcon} />
        <img alt="profile" src={profileIcon} onClick={onMoveProfileHandler} />
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
