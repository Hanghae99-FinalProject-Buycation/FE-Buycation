import React from "react";
import styled from "@emotion/styled";
import alarmClose from "../../assets/headerIcon/alarmClose.svg";
import { getCookies } from "../../core/cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  __sendAlarmModalStatus,
  __getAlarmList,
  __deleteAlarm,
  __deleteTotalAlarm,
  __deleteState,
} from "../../redux/modules/alarm/alarmSlice";
import { useEffect } from "react";
import { midTitleForm } from "../../utils/editedData";
import useOutsideClick from "../../hooks/useOutsideClick";

const Alarm = (props) => {
  const { onMove, top, left, right } = props;
  const tokenValue = getCookies("id");
  const dispatch = useDispatch();
  const alarmListData = useSelector((data) => data.alarm);
  const alarmList = alarmListData.alarmList.dataList;
  const alarmKey = alarmListData.alarmKey; //무한 스크롤 시 사용될 예정 현재는 ""만 보냄
  const { deleteState } = useSelector((state) => state.alarm);

  const onClickCloseHandler = () => {
    dispatch(__sendAlarmModalStatus(false));
  };
  const ref = useOutsideClick(onClickCloseHandler);

  useEffect(() => {
    if (tokenValue) {
      dispatch(__getAlarmList(alarmKey));
      dispatch(__deleteState(false));
    }
  }, [dispatch, tokenValue, deleteState]);

  const onClickDeleteAlarmHandler = (alarmId, index) => {
    dispatch(__deleteAlarm({ alarmId, index }));
  };

  const onClickDeleteTotalAlarmListHandler = (alarmId) => {
    dispatch(__deleteTotalAlarm(alarmId));
  };

  return (
    <AlarmModal top={top} left={left} right={right} ref={ref}>
      <header>
        <span>알림</span>
        <button onClick={onClickDeleteTotalAlarmListHandler}>
          모든 알림 삭제
        </button>
      </header>
      <AlarmListBox>
        {alarmList?.length === 0 ? (
          <EmptyAlarmListBox>새로운 알림이 없습니다.</EmptyAlarmListBox>
        ) : (
          alarmList?.map((item, index) => (
            <PerAlarm key={item.alarmId}>
              <article>
                <div onClick={() => onMove(item.postingId, item.alarmId)}>
                  <p className={item.read ? "read" : ""}>
                    {midTitleForm(item.title)}
                  </p>
                  <p className={item.read ? "read" : ""}>{item.message}</p>
                  <span>{item.createdAt}</span>
                </div>
              </article>
              <img
                alt="alarmClose"
                src={alarmClose}
                onClick={() => onClickDeleteAlarmHandler(item.alarmId, index)}
              />
            </PerAlarm>
          ))
        )}
      </AlarmListBox>
    </AlarmModal>
  );
};

export default Alarm;

const AlarmModal = styled.div`
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
    span {
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    button {
      border: 2px solid ${({ theme }) => theme.colors.grayList};
      background: inherit;
      color: ${({ theme }) => theme.colors.grayStrong};
      font-weight: 600;
    }
    button:hover {
      color: ${({ theme }) => theme.colors.grayHover};
    }
  }
`;

const AlarmListBox = styled.div`
  overflow: auto;
  height: 380px;
`;

const EmptyAlarmListBox = styled.span`
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayStrong};
`;

const PerAlarm = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
  font-size: ${({ theme }) => theme.fontSize.sm};
  div {
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    p:nth-of-type(1) {
      font-weight: 600;
    }
    .read {
      color: ${({ theme }) => theme.colors.grayStrong};
    }
  }
  span {
    margin-top: 6px;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayStrong};
  }
  img {
    width: 10px;
    height: 50px;
  }
  img:hover {
    filter: ${({ theme }) => theme.colors.imgFilter};
  }
`;
