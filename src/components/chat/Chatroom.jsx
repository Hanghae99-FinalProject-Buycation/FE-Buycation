import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "../../core/env";
import DetailSpan from "../detail/elements/DetailSpan";
import {
  sendRoomNo,
  __getChatList,
  __getChatRoom,
} from "../../redux/modules/chat/chatSlice";
import { sendChatStatus } from "../../redux/modules/modal/modalSlice";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import useWindowResize from "../../hooks/useWindowResize";
import useOutsideClick from "../../hooks/useOutsideClick";
import ChatZone from "./ChatZone";
import ChatWaitingRoom from "./ChatWaitingRoom";

const Chatroom = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.chat);
  const chatList = useSelector((state) => state.chat.getChatList);
  const { nickname, memberId } = useSelector((state) => state.chat.getChatRoom);
  const { roomInfo } = useSelector((state) => state.chat.getChatRoom);
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);

  const [roomId, setRoomId] = useState(null);
  const [hide, setHide] = useState(false);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
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
  const onPressEnterHandler = (e) => {
    if (e.keyCode === 13) {
      sendPrivateValue();
    }
  };
  const client = useRef(null);

  const onPrivateMessage = (message) => {
    const payloadData = JSON.parse(message.body);
    privateChats.set(payloadData.talkRoomId, [
      ...privateChats?.get(payloadData.talkRoomId),
      payloadData,
    ]);
    setPrivateChats(new Map(privateChats));
  };

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

  const userJoin = () => {
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

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = () => {
    if (client.current) {
      let chatMessage = {
        memberId: memberId,
        sender: nickname,
        receiver: roomId,
        message: userData.message,
        status: "MESSAGE",
      };
      if (chatMessage.message.trim() !== "") {
        client.current.publish({
          destination: `/send/${roomId}`,
          body: JSON.stringify(chatMessage),
        });
        setUserData({ ...userData, message: "" });
      }
    }
  };

  const onClickSelectRoomHandler = (roomNo) => {
    dispatch(__getChatRoom(roomNo)).then((res) => {
      const payloadData = res.payload;
      privateChats.set(payloadData.roomInfo.id, payloadData.talks);
      setTab(roomNo);
      setRoomId(roomNo);
      dispatch(sendRoomNo(roomNo));
      if (!isSubscribed) {
        client.current.subscribe(`/talk/${roomNo}`, onPrivateMessage);
        setIsSubscribed(true);
      } else {
        client.current.unsubscribe();
        setIsSubscribed(false);
      }
      privateChats.delete("");
      privateChats.delete(null);
      privateChats.delete(undefined);
      setUserData({
        ...userData,
        sender: payloadData.nickname,
        memberId: payloadData.memberId,
      });
    });
  };

  const onClickExitHandler = () => {
    dispatch(sendChatStatus(!chatStatus));
    /*  isSubscribed &&  */ client.current.unsubscribe();
    setIsSubscribed(false);
    setTab(null);
    setRoomId(null);
    setIsSubscribed(false);
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
        <div className="mainTitle">
          <span></span>
          <span>채팅</span>
          {innerWidth < 768 ? (
            hide ? (
              <RxCross1
                onClick={() => {
                  setHide(!hide);
                }}
              />
            ) : (
              <RxCross1 onClick={onClickExitHandler} />
            )
          ) : (
            <RxCross1 onClick={onClickExitHandler} />
          )}
        </div>
        <StChatContainer className={innerWidth < 768 ? hide : ""}>
          {chatList?.length === 0 && (
            <ChatWaitingRoom
              className={innerWidth < 768 ? `${!hide} list` : ""}
            />
          )}
          <StChatList className={innerWidth < 768 ? `${!hide} list` : ""}>
            <ul>
              {chatList?.map((room) => (
                <StChatRooms
                  onClick={() => {
                    onClickSelectRoomHandler(room.id);
                    innerWidth < 768 ? setHide(!hide) : setHide(true);
                  }}
                  key={room.id}
                >
                  <ElChatRoomImage src={room.image} alt="" />
                  <DetailSpan
                    titleText={
                      <div className="inner">
                        <span>{room.title}</span>
                        <span>{room.lastReceiveTime}</span>
                      </div>
                    }
                    bodyText={
                      <span className="cropText">{room.lastMessage}</span>
                    }
                    margin="0 0 0.25rem"
                    fontWeight="400"
                  />
                </StChatRooms>
              ))}
            </ul>
          </StChatList>
          <StRoomWrap className={innerWidth < 768 ? `${hide} room` : !hide}>
            {/* <ChatWaitingRoom /> */}
            <StChatRoomTitle>
              <div>
                <ElChatRoomImage
                  src={chatList?.filter((item) => item.id === roomId)[0]?.image}
                  alt=""
                />
                {chatList?.filter((item) => item.id === roomId)[0]?.title}
              </div>
              <span>
                <img src={profileIcon} alt="" />{" "}
                {
                  chatList?.filter((item) => item.id === roomId)[0]
                    ?.currentMembers
                }
                /{roomInfo?.totalMembers}명
              </span>
            </StChatRoomTitle>
            <StChatZone>
              <ChatZone privateChats={privateChats} userData={userData} />
            </StChatZone>
            <StSendZone>
              <input
                type="text"
                placeholder="메시지를 입력해주세요"
                value={userData.message}
                onKeyDown={onPressEnterHandler}
                onChange={handleMessage}
              />
              <IoMdSend
                color="#ff5f5a"
                size="1rem"
                onClick={sendPrivateValue}
              />
            </StSendZone>
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

  .mainTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1.5rem 2rem 1.5rem;
    height: 4rem;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  }

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

const StChatList = styled.ul`
  grid-area: chatlist;
  width: 100%;
  border-right: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  @media screen and (max-width: 48rem) {
    height: 100%;
  }
`;

const StChatRooms = styled.li`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  height: 4.5rem;
  padding: 1rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  cursor: pointer;
  :hover {
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
  }

  .inner {
    display: grid;
    grid-template-columns: 70% 30%;
    align-items: center;
    width: 100%;
    span:first-of-type {
      display: block;
      width: 8.125rem;
      font-size: ${({ theme }) => theme.fontSize.md};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:nth-of-type(2) {
      display: block;
      color: ${({ theme }) => theme.colors.grayWeak};
      font-size: ${({ theme }) => theme.fontSize.xs};
      text-align: center;
    }
  }

  .cropText {
    display: block;
    width: 11.5rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ElChatRoomImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 5rem;
  margin: 0 0.5rem 0 0;
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

const StChatRoomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  height: 4rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};

  div {
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

const StChatZone = styled.div`
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const StSendZone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  height: 2rem;
  padding: 0.5rem;
  margin: 1.5rem;
  background: ${({ theme }) => theme.colors.grayList};

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.grayList};
  }
`;
