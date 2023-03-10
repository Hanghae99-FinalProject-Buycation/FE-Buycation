import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "../../core/env";
import { sendRoomNo, __getChatList } from "../../redux/modules/chat/chatSlice";
import { sendChatStatus } from "../../redux/modules/modal/modalSlice";
import { HiOutlineX } from "@react-icons/all-files/hi/HiOutlineX";
import useWindowResize from "../../hooks/useWindowResize";
import useOutsideClick from "../../hooks/useOutsideClick";
import ChatWaitingRoom from "./ChatWaitingRoom";
import ChatList from "./ChatList";
import ChatBody from "./ChatBody";

const Chatroom = () => {
  const dispatch = useDispatch();
  const { error, getRoomNo } = useSelector((state) => state.chat);
  const chatList = useSelector((state) => state.chat.getChatList);
  const { nickname, memberId } = useSelector((state) => state.chat.getChatRoom);
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  const [hide, setHide] = useState(false);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState({
    memberId: "",
    sender: "",
    receiver: "",
    message: "",
    sendDate: "",
    connected: false,
  });

  const { innerWidth } = useWindowResize();
  const ref = useOutsideClick(() => dispatch(sendChatStatus(!chatStatus)));

  const client = useRef(null);

  const connect = () => {
    client.current = new Stomp.Client({
      debug: (str) => {
        // console.log(str);
      },
      splitLargeFrames: true,
      webSocketFactory: () => new SockJS(SOCKET_URL),
      onConnect: () => {
        setUserData({
          ...userData,
          connected: true,
          sender: nickname,
          memberId: memberId,
        });
        userJoin();
      },
      onStompError: (frame) => {},
    });
    client.current.activate();
  };

  const userJoin = (roomId) => {
    let chatMessage = {
      sender: nickname,
      status: "JOIN",
    };
    client.current.publish({
      destination: `/send/${roomId}`,
      body: JSON.stringify(chatMessage),
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const onClickExitHandler = () => {
    dispatch(sendChatStatus(!chatStatus));
    client.current.unsubscribe();
    dispatch(sendRoomNo(null));
  };

  useEffect(() => {
    dispatch(__getChatList()).then((res) => {
      connect();
    });
  }, [dispatch]);

  if (error) return <span>{error}</span>;

  return (
    <StBackground>
      <StWrap ref={ref}>
        <ElTitle>
          <span>??????</span>
          {innerWidth < 768 ? (
            hide ? (
              <HiOutlineX
                onClick={() => {
                  setHide(!hide);
                }}
              />
            ) : (
              <HiOutlineX onClick={onClickExitHandler} />
            )
          ) : (
            <HiOutlineX onClick={onClickExitHandler} />
          )}
        </ElTitle>
        <StChatContainer className={innerWidth < 768 ? hide : ""}>
          {innerWidth < 768 && chatList?.length === 0 && <ChatWaitingRoom />}
          <ChatList
            chatList={chatList}
            userData={userData}
            setUserData={setUserData}
            hide={hide}
            setHide={setHide}
            privateChats={privateChats}
            innerWidth={innerWidth}
          />
          {innerWidth > 768 && !hide && <ChatWaitingRoom />}
          <StRoomWrap className={innerWidth < 768 ? `${hide} room` : !hide}>
            <ChatBody
              client={client}
              chatList={chatList}
              memberId={memberId}
              nickname={nickname}
              userData={userData}
              setUserData={setUserData}
              privateChats={privateChats}
              setPrivateChats={setPrivateChats}
            />
          </StRoomWrap>
        </StChatContainer>
      </StWrap>
    </StBackground>
  );
};

export default Chatroom;

const StBackground = styled.div`
  position: absolute;
  top: 4.062rem;
  left: 0;
  width: 100%;
  height: calc(100% - 4.062rem);
  background: #ecf0f2;
  overflow: hidden;
  z-index: 4;
`;

const StWrap = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 60.75rem;
  height: 100%;
  background: #fff;
  box-shadow: 0 0.125rem 0.25rem 0.1rem ${({ theme }) => theme.colors.grayWeak};
  z-index: 5;

  ul {
    padding: 0;
    list-style: none;
  }

  @media screen and (max-width: 48rem) {
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

const ElTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 2rem 1.5rem;
  height: 4rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
`;

const StChatContainer = styled.div`
  display: grid;
  height: calc(100% - 4rem);
  grid-template-columns: 16.25rem 1fr;
  grid-template-rows: 100%;
  grid-template-areas: "chatlist chatroom";

  .false.list {
    display: none;
  }

  .false.room {
    display: none;
  }

  @media screen and (max-width: 48rem) {
    height: calc(100% - 4.5rem);
    grid-template-columns: 1fr;
    grid-template-areas: ${(props) =>
      props.className === true ? "'chatroom'" : "'chatlist'"};
    overflow-y: auto;
  }
`;

const StRoomWrap = styled.div`
  display: ${(props) => (props.className === true ? "none" : "grid")};
  grid-template-rows: 4rem 1fr auto;
  grid-area: chatroom;
  width: 100%;
  @media screen and (max-width: 48rem) {
    height: 100%;
  }
`;
