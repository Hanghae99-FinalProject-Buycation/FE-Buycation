import React from "react";
import styled from "@emotion/styled";
import alarmClose from "../../assets/headerIcon/alarmClose.svg";
import { useDispatch } from "react-redux";
import {
  __getAlarmList,
  __deleteAlarm,
} from "../../redux/modules/alarm/alarmSlice";
import { useEffect } from "react";

const Alarm = (props) => {
  const { onMove, onClose, top, left, right } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getAlarmList());
  }, [dispatch]);

  const onClickDeleteAlarmHandler = (alarmId) => {
    console.log(alarmId);
    dispatch(__deleteAlarm(alarmId));
  };

  return (
    <StPostingOption top={top} left={left} right={right}>
      <header>
        <span>알림</span>
        <span onClick={onClose}>창닫기</span>
      </header>
      <AlarmBox>
        {[1, 2, 3].map((item) => (
          <PerAlarm key={item}>
            <article>
              <div onClick={() => onMove(9, 2)}>
                <p>세제공구합시다.연습글자숫자맞춰보기...</p>
                <p>공구에 댓글이 달렸습니다.</p>
                <span>6분전</span>
              </div>
            </article>
            <img
              alt="alarmClose"
              src={alarmClose}
              onClick={() => onClickDeleteAlarmHandler(2)}
            />
          </PerAlarm>
        ))}
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
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};
  font-size: ${({ theme }) => theme.fontSize.sm};
  div {
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    p:nth-of-type(1) {
      font-weight: 600;
    }
  }
  span {
    margin-top: 6px;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayStrong};
  }
`;
