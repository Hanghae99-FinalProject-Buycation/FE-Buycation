import React, { useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import UserModal from "../../components/header/UserModal";
import HeaderPc from "../../components/header/HeaderPc";
import HeaderMobile from "../../components/header/HeaderMobile";
import { getCookies, removeCookies } from "../../core/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendChatStatus,
  sendModalStatus,
} from "../../redux/modules/modal/modalSlice";
import {
  // __getAlarmCount,
  __patchAlarmState,
} from "../../redux/modules/alarm/alarmSlice";
import { EventSourcePolyfill } from "event-source-polyfill";
import { BACK_API } from "../../core/env";
import Chatroom from "../../components/chat/Chatroom";

const Header = () => {
  const { innerWidth } = useWindowResize();
  const tokenValue = getCookies("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  //const { alarmCount } = useSelector((data) => data?.alarm);
  const [alarmModal, setAlarmModal] = useState(false);
  const EventSource = EventSourcePolyfill;
  const [alarmCount, setAlarmCount] = useState();

  //알람 구독
  useEffect(() => {
    if (tokenValue) {
      let eventSource;
      const fetchSSE = async () => {
        try {
          eventSource = new EventSource(`${BACK_API}/alarm/subscribe`, {
            headers: {
              Authorization: tokenValue,
            },
            heartbeatTimeout: 60 * 1000 * 30,
            //withCredentials: true, //크로스 도메인에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목
          });

          /* EVENTSOURCE ONMESSAGE : 서버로부터 message를 수신했을 때 호출하는 이벤트 핸들러 */
          eventSource.onmessage = async (event) => {
            const res = await event.data;
            console.log(res);
            setAlarmCount(res);
            //dispatch(__getAlarmCount());
          };

          /* EVENTSOURCE ONERROR : 에러가 발생하거나 EventSource 객체에서 error event가 감지되었을 때 호출하는 이벤트 핸들러 */
          eventSource.onerror = async (event) => {
            console.log(event.error.message);
            eventSource.close(); //렌더링이 안되서 연결이 안되는 거일수도 있음
          };
        } catch (error) {}
      };
      fetchSSE();
      return () => eventSource.close();
    }
  }, [tokenValue, EventSource]);

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

  // 채팅 모달
  const onClickChatOpenHandler = () => {
    dispatch(sendChatStatus(!chatStatus));
  };

  return (
    <>
      {innerWidth > 768 ? (
        <HeaderPc
          onInnerWidth={innerWidth}
          onAlarmCount={alarmCount}
          onClickAlarmModalHandler={onClickAlarmModalHandler}
          onMoveSelectPageHandler={onMoveSelectPageHandler}
          onCloseAlarmModalHandler={onCloseAlarmModalHandler}
          onAlarmModal={alarmModal}
          onClickChatOpenHandler={onClickChatOpenHandler}
        />
      ) : (
        <HeaderMobile
          onInnerWidth={innerWidth}
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
          chat="채팅"
          chatClick={onClickChatOpenHandler}
        />
      )}
      {!chatStatus && <Chatroom />}
    </>
  );
};

export default Header;
