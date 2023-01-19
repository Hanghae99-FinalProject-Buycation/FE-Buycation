import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SmallModal from "../../components/headerModal/userModal";
import ButtonBasic from "../../components/elements/ButtonBasic";
import postingIcon from "../../assets/headerIcon/postingIcon.svg";
import chattingIcon from "../../assets/headerIcon/chattingIcon.svg";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import logo from "../../assets/headerIcon/buycationLogo.svg";
import logoHover from "../../assets/headerIcon/buycationLogoHover.svg";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";
import { getCookies, removeCookies } from "../../core/cookie";
import { HiOutlineBars3 } from "react-icons/hi2";
import useWindowResize from "../../hooks/useWindowResize";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookies("id");
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const { innerWidth } = useWindowResize();
  const onMovePostingHandler = () => {
    navigate("/posting");
  };

  const onMoveProfileHandler = () => {
    navigate("/myprofile");
    dispatch(sendModalStatus(true));
  };

  const onMoveLoginHandler = () => {
    navigate("/login");
    dispatch(sendModalStatus(true));
  };

  const onMoveLogoutHandler = () => {
    removeCookies("id");
    navigate("/");
    dispatch(sendModalStatus(true));
  };

  const onClickMypageModalHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };

  return (
    <HeaderDiv>
      <Logo alt="바이케이션" onClick={() => navigate("/")} />
      {token ? (
        innerWidth > 450 ? (
          <Icon>
            <img
              alt="posting"
              src={postingIcon}
              onClick={onMovePostingHandler}
            />
            <img alt="chatting" src={chattingIcon} />
            <img alt="alarm" src={alarmIcon} />
            <img
              alt="profile"
              src={profileIcon}
              onClick={onClickMypageModalHandler}
            />
          </Icon>
        ) : (
          <HiOutlineBars3 size="1.5rem" onClick={onClickMypageModalHandler} />
        )
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
        <SmallModal
          top="4rem"
          right="0"
          first="마이페이지"
          firstClick={onMoveProfileHandler}
          second="로그인"
          secondClick={onMoveLoginHandler}
          third="로그아웃"
          thirdClick={onMoveLogoutHandler}
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
  & > a {
    color: black;
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
`;
