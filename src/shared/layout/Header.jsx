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
  // __getAlarmCount,
  __patchAlarmState,
} from "../../redux/modules/alarm/alarmSlice";
import { EventSourcePolyfill } from "event-source-polyfill";
import { BACK_API } from "../../core/env";

const Header = () => {
  const { innerWidth } = useWindowResize();
  const tokenValue = getCookies("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  //const { alarmCount } = useSelector((data) => data?.alarm);
  const [alarmModal, setAlarmModal] = useState(false);
  const EventSource = EventSourcePolyfill;
  const [alarmCount, setAlarmCount] = useState();

  //알람 구독
  // useEffect(() => {
  //   if (tokenValue) {
  //     let eventSource = new EventSource(
  //       `${BACK_API}/alarm/subscribe/1`, //임시
  //       {
  //         headers: {
  //           Authorization: tokenValue,
  //           // lastEventId: "1_10101010",
  //         },
  //       }
  //     );
  //     //EVENTSOURCE ONMESSAGE
  //     eventSource.onmessage = (event) => {
  //       console.log(event.data);
  //       dispatch(__getAlarmCount());
  //     };
  //     //EVENTSOURCE ONERROR
  //     eventSource.onerror = (event) => {
  //       console.log(event.error.message);
  //       console.log(!event.error.message.includes("No activity"));
  //       if (!event.error.message.includes("No activity")) {
  //         console.log("이벤트 종료");
  //         eventSource.close();
  //       }
  //     };
  //   }
  // }, [tokenValue, dispatch, EventSource]);

  useEffect(() => {
    if (tokenValue) {
      let eventSource;
      const fetchSSE = async () => {
        try {
          eventSource = new EventSource(`${BACK_API}/alarm/subscribe`, {
            headers: {
              Authorization: tokenValue,
            },
            //heartbeatTimeout: 120000, //2분
            withCredentials: true, //크로스 도메인에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목
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
            console.log("에러 이벤트 발생");
            if (!event.error.message.includes("No activity")) {
              console.log("에러 이벤트 발생 왜 안하냐?");
              eventSource.close();
            }
          };
        } catch (error) {}
      };
      fetchSSE();
      //return () => eventSource.close();
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
