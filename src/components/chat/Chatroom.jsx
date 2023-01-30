import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "../../core/env";
import DetailSpan from "../detail/elements/DetailSpan";
import {
  getChatRoom,
  __getChatList,
  __getChatRoom,
} from "../../redux/modules/chat/chatSlice";
import { sendChatStatus } from "../../redux/modules/modal/modalSlice";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import { Spinners } from "../../shared/layout/Spinners";
import useWindowResize from "../../hooks/useWindowResize";
import useOutsideClick from "../../hooks/useOutsideClick";
import ChatZone from "./ChatZone";

var stompClient = null;
const Chatroom = () => {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState(null);
  const [hide, setHide] = useState(false);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState({
    memberId: "",
    sender: "",
    receiver: "",
    message: "",
    sendDate: "",
    connected: false,
  });

  const { isLoading, error } = useSelector((state) => state.chat);
  const chatList = useSelector((state) => state.chat.getChatList);
  const { nickname, talks, memberId } = useSelector(
    (state) => state.chat.getChatRoom
  );
  const chatBody = useSelector((state) => state.chat.getChatRoom);
  const { roomInfo } = useSelector((state) => state.chat.getChatRoom);

  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  const { innerWidth } = useWindowResize();
  const ref = useOutsideClick(() => dispatch(sendChatStatus(!chatStatus)));

  const onPressEnterHandler = (e) => {
    if (e.keyCode === 13) {
      sendPrivateValue();
    }
  };

  const connect = () => {
    // let Sock = new SockJS(SOCKET_URL);
    let Sock = new SockJS("http://13.125.15.202:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({
      ...userData,
      connected: true,
      sender: nickname,
      memberId: memberId,
    });
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      sender: nickname,
      status: "JOIN",
    };
    stompClient.send("/send", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    if (tab !== "" || tab !== undefined) {
      privateChats.set(tab, [...privateChats.get(tab), payloadData]);
      setPrivateChats(new Map(privateChats));
    } else {
      dispatch(getChatRoom(payloadData.talkRoomId));
      privateChats.set(tab, [...privateChats.get(tab), payloadData]);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        memberId: memberId,
        sender: nickname,
        receiver: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      /* if (userData.username !== nickname) {
        privateChats.set(tab, [...privateChats.get(tab), chatMessage]);
      } */
      stompClient.send(`/send/${roomId}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onClickSelectRoomHandler = (roomNo) => {
    dispatch(__getChatRoom(roomNo));
    setRoomId(roomNo);
    privateChats.set(tab, talks);
    privateChats.delete("");
    privateChats.delete(undefined);
    stompClient.subscribe(`/talk/${roomId}`, onPrivateMessage);
  };
  const [idk, setIdk] = useState([]);
  useEffect(() => {
    connect();
    dispatch(__getChatList());
    chatList?.map((item, idx) => {
      dispatch(__getChatRoom(item.id)).then((res) => {
        privateChats.set(chatList[idx]?.title, []);
        // setIdk([...idk, chatBody]);
        // ChatList 내에 데이터가 있다면 로비에서 바로 상태값에 주입 가능함
      });
    });
  }, [dispatch]);

  // console.log(chatBody);
  // console.log(chatList);

  if (isLoading) return <Spinners />;

  if (error) return <span>{error}</span>;

  return (
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
            <RxCross1
              onClick={() => {
                dispatch(sendChatStatus(!chatStatus));
              }}
            />
          )
        ) : (
          <RxCross1
            onClick={() => {
              dispatch(sendChatStatus(!chatStatus));
            }}
          />
        )}
      </div>
      <StChatContainer className={innerWidth < 768 ? hide : ""}>
        <StChatList className={innerWidth < 768 ? `${!hide} list` : ""}>
          <ul>
            {chatList?.map((room) => (
              <StChatRooms
                onClick={() => {
                  setTab(room.title);
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
          <StChatRoomTitle>
            <div>
              <ElChatRoomImage
                src={chatList?.filter((item) => item.id === roomId)[0]?.image}
                alt=""
              />
              {chatList?.filter((item) => item.id === roomId)[0]?.title}
            </div>
            <span>
              <img src={profileIcon} alt="" />
              {
                chatList?.filter((item) => item.id === roomId)[0]
                  ?.currentMembers
              }
              /{roomInfo?.totalMembers}명
            </span>
          </StChatRoomTitle>
          <StChatZone className={!hide}>
            <ChatZone
              privateChats={privateChats}
              talks={talks}
              userData={userData}
              nickname={nickname}
              tab={tab}
              roomId={roomId}
              memberId={memberId}
              // id={id}
            />
          </StChatZone>
          <StSendZone>
            <input
              type="text"
              placeholder="메시지를 입력해주세요"
              value={userData.message}
              onKeyDown={onPressEnterHandler}
              onChange={handleMessage}
            />
            <IoMdSend color="#ff5f5a" size="1rem" onClick={sendPrivateValue} />
          </StSendZone>
        </StRoomWrap>
      </StChatContainer>
    </StWrap>
  );
};

export default Chatroom;

const StWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 60.75rem;
  height: 41.625rem;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 0 4px 1px ${({ theme }) => theme.colors.grayWeak};
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
    height: calc(100% - 4rem);
    top: 4rem;
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
