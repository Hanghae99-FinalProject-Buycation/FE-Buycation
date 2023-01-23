import React from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../../components/elements/ButtonBasic";
import UserModal from "../../components/header/UserModal";
import postingIcon from "../../assets/headerIcon/postingIcon.svg";
import chattingIcon from "../../assets/headerIcon/chattingIcon.svg";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import logo from "../../assets/headerIcon/buycationLogo.webp";
import logoHover from "../../assets/headerIcon/buycationLogoHover.webp";
import useWindowResize from "../../hooks/useWindowResize";
import { getCookies, removeCookies } from "../../core/cookie";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const Header = () => {
  const { innerWidth } = useWindowResize();
  const tokenValue = getCookies("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);

  const onMovePostingHandler = () => {
    navigate("/posting");
    dispatch(sendModalStatus(true));
  };

  const onMoveMyProfileHandler = () => {
    navigate("/myprofile");
    dispatch(sendModalStatus(true));
  };

  const onMoveLoginHandler = () => {
    navigate("/login");
    dispatch(sendModalStatus(true));
  };

  const onMoveLogoutHandler = () => {
    removeCookies("id", {
      path: "/",
    });
    navigate("/");
    dispatch(sendModalStatus(true));
  };

  const onClickMypageModalHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };

  return innerWidth > 768 ? (
    <HeaderDiv>
      <Logo alt="바이케이션" onClick={() => navigate("/")} />
      {tokenValue ? (
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
      ) : (
        <ButtonBasic
          width="4rem"
          height="2rem"
          borderRadius="2rem"
          _onClick={onMoveLoginHandler}
        >
          로그인
        </ButtonBasic>
      )}

      {!modalStatus && (
        <UserModal
          top="4rem"
          right="0"
          posting="게시글 작성"
          postingClick={onMovePostingHandler}
          myProfile="마이페이지"
          myProfileClick={onMoveMyProfileHandler}
          logout="로그아웃"
          logoutClick={onMoveLogoutHandler}
          login="로그인"
          loginClick={onMoveLoginHandler}
        />
      )}
    </HeaderDiv>
  ) : (
    <HeaderDiv>
      <Icon>
        <img alt="alarm" src={alarmIcon} />
      </Icon>
      <Logo alt="바이케이션" onClick={() => navigate("/")} />
      {tokenValue ? (
        <HiOutlineBars3 size="1.5rem" onClick={onClickMypageModalHandler} />
      ) : (
        <ButtonBasic
          width="4rem"
          height="2rem"
          borderRadius="2rem"
          _onClick={onMoveLoginHandler}
        >
          로그인
        </ButtonBasic>
      )}

      {!modalStatus && (
        <UserModal
          top="4rem"
          right="0"
          posting="게시글 작성"
          postingClick={onMovePostingHandler}
          myProfile="마이페이지"
          myProfileClick={onMoveMyProfileHandler}
          logout="로그아웃"
          logoutClick={onMoveLogoutHandler}
          login="로그인"
          loginClick={onMoveLoginHandler}
        />
      )}
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
  @media screen and (max-width: 768px) {
    padding: 2rem 1;
  }
`;

const Logo = styled.div`
  height: 2.8rem;
  width: 12.5rem;
  margin-bottom: 1rem;
  background: url(${logo}) bottom/100% no-repeat;
  :hover {
    background: url(${logoHover}) bottom/100% no-repeat;
  }
`;

const Icon = styled.div`
  display: flex;
  gap: 23px;
  cursor: pointer;
`;
