import React from "react";
import styled from "@emotion/styled";

const Alarm = (props) => {
  const { alarmData, onMove, onClose, top, left, right } = props;

  return (
    <StPostingOption top={top} left={left} right={right}>
      <header>
        <span>알림 리스트 15</span>
        <span onClick={onClose}>창닫기</span>
      </header>
      <AlarmBox>
        <PerAlarm onClick={onMove}>{alarmData}</PerAlarm>
        <PerAlarm onClick={onMove}>{alarmData}</PerAlarm>
        <PerAlarm onClick={onMove}>{alarmData}</PerAlarm>
      </AlarmBox>
    </StPostingOption>
  );
};

export default Alarm;

const StPostingOption = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column !important;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  padding: 0rem;
  border: 1px solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 2px ${({ theme }) => theme.colors.grayList};
  background: #fff;
  z-index: 4;
  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
    font-size: ${({ theme }) => theme.fontSize.sm};
    span:nth-of-type(1) {
      font-weight: 600;
    }
    span:nth-of-type(2) {
      color: ${({ theme }) => theme.colors.grayStrong};
    }
  }
`;

const AlarmBox = styled.div`
  width: 100%;
  height: 415px;
`;

const PerAlarm = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
