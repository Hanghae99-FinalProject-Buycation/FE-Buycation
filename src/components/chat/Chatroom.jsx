import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "../../core/env";
import DetailSpan from "../detail/elements/DetailSpan";
import {
  __getChatList,
  __getChatRoom,
} from "../../redux/modules/chat/chatSlice";
import { sendChatStatus } from "../../redux/modules/modal/modalSlice";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import { titleForm } from "../../utils/editedData";
import useWindowResize from "../../hooks/useWindowResize";
import useOutsideClick from "../../hooks/useOutsideClick";

var stompClient = null;
const Chatroom = () => {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState(null);
  const [hide, setHide] = useState(false);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [list, setList] = useState([]);
  // const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState({
    sender: "",
    receiver: "",
    message: "",
    seondDate: "",
    connected: false,
  });

  const chatList = useSelector((state) => state.chat.getChatList);
  const chatBody = useSelector((state) => state.chat.getChatRoom);
  const chatStatus = useSelector((state) => state.generalModal.toggleChat);
  const { innerWidth } = useWindowResize();
  const ref = useOutsideClick(() => dispatch(sendChatStatus(!chatStatus)));

  const connect = () => {
    let Sock = new SockJS("http://54.180.87.207:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true, sender: "buycation" });
    // stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(`/talk/room/${roomId}`, onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      sender: userData.sender,
      status: "JOIN",
    };
    // stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    // stompClient.send("/talk", {}, JSON.stringify(chatMessage));
    stompClient.send("/talk/room", {}, JSON.stringify(chatMessage));
    // stompClient.send("/talk/${roomid}", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.sender)) {
          privateChats.set(payloadData.sender, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      /* case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break; */
      // 내가 추가함
      default:
        return;
    }
  };
  // const [list, setList] = useState([]);

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.sender)) {
      // privateChats.get(payloadData.sender).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      // let list = [];
      // list.push(payloadData);
      setList(...list, payloadData);
      privateChats.set(payloadData.sender, list);
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
  /*   const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        sender: userData.sender,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      // stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      stompClient.send("/talk", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  }; */

  const sendPrivateValue = () => {
    console.log("stompClient: ", stompClient);
    if (stompClient) {
      var chatMessage = {
        // sender: userData.sender,
        sender: "david",
        receiver: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.sender !== tab) {
        // privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      // stompClient.send(`/talk/${roomId}`, {}, JSON.stringify(chatMessage));
      stompClient.send(`/talk/room/${roomId}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handlesender = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, sender: value });
  };

  const registerUser = () => {
    connect();
  };

  const onClickSelectRoomHandler = (roomNo) => {
    dispatch(__getChatRoom(roomNo));
    setRoomId(roomNo);
  };

  useEffect(() => {
    connect();
    dispatch(__getChatList());
    console.log(userData);
  }, [dispatch, userData]);

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
      {/* {userData.connected ? ( */}
      <StChatContainer className={innerWidth < 768 ? hide : ""}>
        <StChatList className={innerWidth < 768 ? `${!hide} list` : ""}>
          {/* <StChatList style={{ display: innerWidth < 768 ? "" : "" }}> */}
          <ul>
            {chatList?.map((room) => (
              <StChatRooms
                onClick={() => {
                  setTab(room.title);
                  onClickSelectRoomHandler(room.id);
                  innerWidth < 768 ? setHide(!hide) : setHide(true);
                  console.log(hide);
                }}
                // className={tab === room.id}
                key={room.id}
              >
                <ElChatRoomImage src={"test.jpg"} alt="" />
                <DetailSpan
                  titleText={titleForm(room?.title)}
                  bodyText="n분전"
                  margin="0 0 0.25rem"
                  fontSize="0.8rem"
                  fontWeight="400"
                  color="#adadad"
                />
              </StChatRooms>
            ))}
          </ul>
        </StChatList>
        {/* <StRoomWrap style={{ display: innerWidth < 768 ? hide : "" }}> */}
        <StRoomWrap className={innerWidth < 768 ? `${hide} room` : !hide}>
          <StChatRoomTitle>
            <div>
              <ElChatRoomImage src="test.jpg" alt="" />
              {chatList?.filter((item) => item.id === roomId)[0]?.title}
            </div>
            <span>
              <img src={profileIcon} alt="" />
              {
                chatList?.filter((item) => item.id === roomId)[0]
                  ?.currentMembers
              }
              /totalMember명
            </span>
          </StChatRoomTitle>
          <StChatZone className={!hide}>
            {/* {[...privateChats.get(tab)].map((chat, index) => ( */}
            {chatBody?.map((chat, index) => (
              <StChatBubble
                className={`${chat.sender === userData.sender && "self"}`}
                key={index}
              >
                {/* 보낸 사람 이름 */}
                {chat.sender !== userData.sender && (
                  <StSender>{chat.sender}</StSender>
                )}

                {/* 메시지 */}
                <div className="bubbleWrap">
                  <StChatMsg>{chat.message}</StChatMsg>
                  <span>{chat.sendDate.split("T")[0]}</span>
                </div>

                {/* 유저 부분 */}
                {chat.sender === userData.sender && (
                  // <div className="avatar self">{chat.sender}</div>
                  <StSenderSelf>작성자</StSenderSelf>
                )}
              </StChatBubble>
            ))}
          </StChatZone>
          <StSendZone>
            <input
              type="text"
              placeholder="메시지를 입력해주세요"
              value={userData.message}
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
  /* height: calc(100% - 4rem); */
  border-right: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  @media screen and (max-width: 48rem) {
    height: 100%;
  }
`;

const StChatRooms = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 4.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  cursor: pointer;
  :hover {
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
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
  /* height: calc(100% - 4rem); */
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

const StChatBubble = styled.li`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  .bubbleWrap {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    span {
      display: inline-block;
      width: 14ch;
      margin-left: 0.25rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.colors.grayWeak};
    }
  }
`;

const StSender = styled.div`
  background: #fff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 0.25rem;
`;

const StSenderSelf = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  justify-content: end;
`;

const StChatMsg = styled.div`
  width: fit-content;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  border-radius: 0 1rem 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.grayWeak};
  font-size: ${({ theme }) => theme.fontSize.sm};
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
    background: ${({ theme }) => theme.colors.grayList};
  }
`;
