import React from "react";
import styled from "@emotion/styled";
import postingIcon from "../../assets/headerIcon/postingIcon.svg";
import chattingIcon from "../../assets/headerIcon/chattingIcon.svg";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import logo from "../../assets/headerIcon/buycationLogo.webp";
import logoHover from "../../assets/headerIcon/buycationLogoHover.webp";
import ButtonBasic from "../elements/ButtonBasic";
import Alarm from "./Alarm";
import { getCookies } from "../../core/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const HeaderPc = (props) => {
  const {
    onAlarmCount,
    onClickAlarmModalHandler,
    onMoveSelectPageHandler,
    onCloseAlarmModalHandler,
    onAlarmModal,
  } = props;
  const tokenValue = getCookies("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);

  //헤더 아이콘 기능
  const onMovePostingHandler = () => {
    navigate("/posting");
    dispatch(sendModalStatus(true));
  };

  const onMoveLoginHandler = () => {
    navigate("/login");
    dispatch(sendModalStatus(true));
  };

  const onClickMypageModalHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };

  return (
    <HeaderDiv>
      <Logo alt="바이케이션" onClick={() => navigate("/")} />
      {tokenValue ? (
        <Icon>
          <img alt="posting" src={postingIcon} onClick={onMovePostingHandler} />
          <img alt="chatting" src={chattingIcon} />
          {onAlarmModal ? (
            <>
              <img
                className={onAlarmCount ? "mainColor" : ""}
                alt="alarm"
                src={alarmIcon}
                onClick={onClickAlarmModalHandler}
              />
              <Alarm
                top="4rem"
                right="0"
                onMove={onMoveSelectPageHandler}
                onClose={onCloseAlarmModalHandler}
              />
            </>
          ) : (
            <img
              className={onAlarmCount ? "mainColor" : ""}
              alt="alarm"
              src={alarmIcon}
              onClick={onClickAlarmModalHandler}
            />
          )}
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
    </HeaderDiv>
  );
};

export default HeaderPc;

const HeaderDiv = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
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

  .mainColor {
    filter: ${({ theme }) => theme.colors.imgFilter};
  }
`;
