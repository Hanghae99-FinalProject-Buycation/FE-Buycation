import React, { useState } from "react";
import styled from "@emotion/styled";
import alarmIcon from "../../assets/headerIcon/alarmIcon.svg";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import guideIcon from "../../assets/headerIcon/guideIcon.svg";
import loginIcon from "../../assets/headerIcon/loginIcon.svg";
import logo from "../../assets/headerIcon/buycationLogo.webp";
import logoHover from "../../assets/headerIcon/buycationLogoHover.webp";
import Alarm from "./Alarm";
import GuideModal from "./guideModal/GuideModal";
import { getCookies } from "../../core/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const HeaderMobile = (props) => {
  const {
    onInnerWidth,
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
  const [showUserGuide, setShowUserGuide] = useState(false);

  const onMoveLoginHandler = () => {
    navigate("/login");
    dispatch(sendModalStatus(true));
  };

  const onClickMypageModalHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };

  const onShowUserGuide = () => {
    setShowUserGuide(true);
  };

  const onCloseUserGuide = () => {
    setShowUserGuide(false);
  };

  return (
    <HeaderDiv>
      {tokenValue ? (
        <>
          {onAlarmModal ? (
            <Icon>
              <img
                alt="alarm"
                src={alarmIcon}
                onClick={onClickAlarmModalHandler}
              />
              <Alarm
                top="4rem"
                left="0"
                onMove={onMoveSelectPageHandler}
                onClose={onCloseAlarmModalHandler}
              />
            </Icon>
          ) : (
            <Icon>
              <AlarmBox>
                <img
                  alt="alarm"
                  src={alarmIcon}
                  onClick={onClickAlarmModalHandler}
                />
                <AlarmNumber display={onAlarmCount === "0" ? "none" : ""}>
                  <span>{onAlarmCount}</span>
                </AlarmNumber>
              </AlarmBox>
            </Icon>
          )}
          <Logo alt="바이케이션" onClick={() => navigate("/")} />
          <img
            alt="tapBar"
            src={profileIcon}
            onClick={onClickMypageModalHandler}
          />
        </>
      ) : (
        <>
          <Logo alt="바이케이션" onClick={() => navigate("/")} />
          <LoginBox>
            {showUserGuide ? (
              <GuideModal
                onClose={onCloseUserGuide}
                onInnerWidth={onInnerWidth}
              />
            ) : null}
            <img alt="guide" src={guideIcon} onClick={onShowUserGuide} />
            <img alt="login" src={loginIcon} onClick={onMoveLoginHandler} />
          </LoginBox>
        </>
      )}
    </HeaderDiv>
  );
};

export default HeaderMobile;

const HeaderDiv = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
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

const AlarmBox = styled.div`
  position: relative;
`;

const AlarmNumber = styled.div`
  display: ${({ display }) => display};
  position: absolute;
  top: -4px;
  right: -15px;
  width: 24px;
  height: 14px;
  text-align: center;
  background: ${({ theme }) => theme.colors.main};
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 40%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  span {
    color: #fff;
    font-weight: 600;
  }
`;

const LoginBox = styled.div`
  display: flex;
  gap: 0.8rem;
`;
