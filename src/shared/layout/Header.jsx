import React, { useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import UserModal from "../../components/header/UserModal";
import HeaderPc from "../../components/header/HeaderPc";
import HeaderMobile from "../../components/header/HeaderMobile";
import { getCookies, removeCookies } from "../../core/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";
import {
  __getAlarmCount,
  __patchAlarmState,
} from "../../redux/modules/alarm/alarmSlice";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { BACK_API } from "../../core/env";

const Header = () => {
  const { innerWidth } = useWindowResize();
  const tokenValue = getCookies("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const { alarmCount } = useSelector((data) => data?.alarm);
  const [alarmModal, setAlarmModal] = useState(false);
  const EventSource = EventSourcePolyfill || NativeEventSource;

  //알람 구독
  useEffect(() => {
    if (tokenValue) {
      let eventSource = new EventSource(
        `${BACK_API}/alarm/subscribe/1`, //임시
        {
          headers: {
            Authorization: tokenValue,
            // lastEventId: "1_10101010",
          },
        }
      );
      //EVENTSOURCE ONMESSAGE
      eventSource.onmessage = (event) => {
        console.log(event.data);
        dispatch(__getAlarmCount());
      };
      //EVENTSOURCE ONERROR
      eventSource.onerror = (event) => {
        console.log(event.error.message);
        eventSource.close();
        if (!event.error.message.includes("No activity")) {
          console.log("이벤트  종료");
          eventSource.close();
        }
      };

      eventSource.addEventListener("No activity", function (event) {
        if (event) {
          eventSource.close();
        }
      });
    }
  }, [tokenValue, dispatch, EventSource]);

  //alarm 조회, 삭제, 수정
  const onClickAlarmModalHandler = () => {
    setAlarmModal(true);
  };
  const onMoveSelectPageHandler = (postingId, alarmId) => {
    setAlarmModal(false);
    navigate(`/details/${postingId}`);
    dispatch(__patchAlarmState(alarmId));
  };
  const onCloseAlarmModalHandler = () => {
    setAlarmModal(false);
  };

  //헤더 사람 아이콘 모달 내용 기능
  const onMovePostingHandler = () => {
    navigate("/posting");
    dispatch(sendModalStatus(true));
  };

  const onMoveMyProfileHandler = () => {
    navigate("/myprofile");
    dispatch(sendModalStatus(true));
  };

  const onMoveLogoutHandler = () => {
    removeCookies("id", {
      path: "/",
    });
    navigate("/");
    dispatch(sendModalStatus(true));
  };

  return (
    <>
      {innerWidth > 768 ? (
        <HeaderPc
          onAlarmCount={alarmCount}
          onClickAlarmModalHandler={onClickAlarmModalHandler}
          onMoveSelectPageHandler={onMoveSelectPageHandler}
          onCloseAlarmModalHandler={onCloseAlarmModalHandler}
          onAlarmModal={alarmModal}
        />
      ) : (
        <HeaderMobile
          onAlarmCount={alarmCount}
          onClickAlarmModalHandler={onClickAlarmModalHandler}
          onMoveSelectPageHandler={onMoveSelectPageHandler}
          onCloseAlarmModalHandler={onCloseAlarmModalHandler}
          onAlarmModal={alarmModal}
        />
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
        />
      )}
    </>
  );
};

export default Header;
