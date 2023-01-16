import React from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SmallModal from "../../components/headerModal/userModal";
import postingIcon from "../../assets/headerIcon/postingIcon.svg";
import chattingIcon from "../../assets/headerIcon/chattingIcon.svg";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);

  const onMovePostingHandler = () => {
    navigate("/posting");
  };

  const onMoveProfileHandler = () => {
    navigate("/profile");
    dispatch(sendModalStatus(true));
  };

  const onMoveLoginHandler = () => {
    navigate("/login");
    dispatch(sendModalStatus(true));
  };

  const onMoveLogoutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("memberId");
    navigate("/");
    dispatch(sendModalStatus(true));
  };

  const onClickMypageModalHandler = () => {
    dispatch(sendModalStatus(false));
  };

  return (
    <HeaderDiv>
      <Link to={"/"}>바이케이션</Link>
      <Icon>
        <img alt="posting" src={postingIcon} onClick={onMovePostingHandler} />
        <img alt="chatting" src={chattingIcon} />
        <img alt="alarm" src={alarmIcon} />
        <img
          alt="profile"
          src={profileIcon}
          onClick={onClickMypageModalHandler}
        />
      </Icon>
      <SmallModal
        top="4rem"
        right="0"
        first="마이페이지"
        firstClick={onMoveProfileHandler}
        second="로그인"
        secondClick={onMoveLoginHandler}
        third="로그아웃"
        thirdClick={onMoveLogoutHandler}
        hidden={!modalStatus}
      />
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
