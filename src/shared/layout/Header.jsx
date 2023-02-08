import React, { useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import HeaderPc from "../../components/header/HeaderPc";
import HeaderMobile from "../../components/header/HeaderMobile";
import UserModal from "../../components/header/UserModal";
import Chatroom from "../../components/chat/Chatroom";
import { EventSourcePolyfill } from "event-source-polyfill";
import { BACK_API } from "../../core/env";
import { getCookies, removeCookies } from "../../core/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendModalStatus,
  sendChatStatus,
} from "../../redux/modules/modal/modalSlice";
import { __sendAlarmModalStatus } from "../../redux/modules/alarm/alarmSlice";
import { __getChatList } from "../../redux/modules/chat/chatSlice";

const Header = () => {
  const { innerWidth } = useWindowResize();
  const tokenValue = getCookies("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  const [alarmCount, setAlarmCount] = useState();
  const EVENTSOURCE = EventSourcePolyfill;

  //알람 구독
  useEffect(() => {
    if (tokenValue) {
      let eventSource;
      const fetchSSE = async () => {
        try {
          eventSource = new EVENTSOURCE(`${BACK_API}/alarm/subscribe`, {
            headers: {
              Authorization: tokenValue,
            },
            heartbeatTimeout: 60 * 1000 * 60, //라이브러리 자체 기능인 45000초 관련 에러 안띄우는 방법1
          });

          /* EVENTSOURCE ONMESSAGE : 서버로부터 message를 수신했을 때 호출하는 이벤트 핸들러 */
          eventSource.onmessage = async (event) => {
            const res = await event.data;
            //console.log("서버 응답 데이터 :", res);
            setAlarmCount(res);
          };

          /* EVENTSOURCE ONERROR : 에러가 발생하거나 EventSource 객체에서 error event가 감지되었을 때 호출하는 이벤트 핸들러 */
          eventSource.onerror = async (event) => {
            eventSource.close();
          };

          window.onbeforeunload = () => {
            //잦은 새로고침으로 인해 서버에서 broken pipe 에러 발생 시, eventSource도 에러 발생 막기
            //console.log("새로고침 이벤트 감지 후 eventSource 종료");
            eventSource.close();
          };
        } catch (error) {}
      };

      fetchSSE();
      return () => eventSource.close();
    }
  }, [tokenValue, EVENTSOURCE]);

  //알람 & 채팅 모달
  const onClickAlarmModalHandler = () => {
    dispatch(__sendAlarmModalStatus(true));
  };
  const onClickChatOpenHandler = () => {
    dispatch(__getChatList());
    dispatch(sendChatStatus(!chatStatus));
  };

  //헤더 탭바 기능 유저 모달
  const onMoveMyProfileHandler = () => {
    navigate("/myprofile");
    dispatch(sendModalStatus(true));
  };
  const onMovePostingHandler = () => {
    navigate("/posting");
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
          onInnerWidth={innerWidth}
          onAlarmCount={alarmCount}
          onClickAlarmModalHandler={onClickAlarmModalHandler}
          onClickChatOpenHandler={onClickChatOpenHandler}
        />
      ) : (
        <HeaderMobile
          onInnerWidth={innerWidth}
          onAlarmCount={alarmCount}
          onClickAlarmModalHandler={onClickAlarmModalHandler}
        />
      )}

      {!modalStatus && (
        <UserModal
          top="4rem"
          right="0"
          myProfile="마이페이지"
          myProfileClick={onMoveMyProfileHandler}
          posting="공구 생성"
          postingClick={onMovePostingHandler}
          chat="채팅"
          chatClick={onClickChatOpenHandler}
          logout="로그아웃"
          logoutClick={onMoveLogoutHandler}
        />
      )}

      {!chatStatus && <Chatroom />}
    </>
  );
};

export default Header;
