import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import ChatZone from "./ChatZone";
import ChatParticipantModal from "./ChatParticipantModal";
import { useState } from "react";
import { useEffect } from "react";
import { sendChatModalStatus } from "../../redux/modules/modal/modalSlice";

const ChatBody = (props) => {
  const {
    client,
    memberId,
    nickname,
    roomId,
    userData,
    setUserData,
    chatList,
    privateChats,
  } = props;

  const dispatch = useDispatch();
  const modalStatus = useSelector(
    (state) => state.generalModal.toggleChatParticipantModal
  );
  const { roomInfo, participants } = useSelector(
    (state) => state.chat.getChatRoom
  );

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

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const onPressEnterHandler = (e) => {
    if (e.keyCode === 13 /*  || e.keyCode === 261 */) {
      sendPrivateValue();
    }
  };

  useEffect(() => {
    // connect();
    // return () => disconnect();
    // return () => client.current.unsubscribe();
  }, []);

  return (
    <>
      <StChatRoomTitle>
        {modalStatus && <ChatParticipantModal data={participants} />}
        <div>
          <ElChatRoomImage
            src={chatList?.filter((item) => item.id === roomId)[0]?.image}
            alt=""
          />
          <span>
            {chatList
              ?.filter((item) => item.id === roomId)[0]
              ?.title.substr(0, 18)}
          </span>
        </div>
        <span onClick={() => dispatch(sendChatModalStatus(!modalStatus))}>
          <img src={profileIcon} alt="" />{" "}
          {chatList?.filter((item) => item.id === roomId)[0]?.currentMembers}/
          {roomInfo?.totalMembers}명
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
          onClick={() => {
            sendPrivateValue();
          }}
        />
      </StSendZone>
    </>
  );
};

export default ChatBody;

const ElChatRoomImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 5rem;
  margin: 0 0.5rem 0 0;
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

    span:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }

  span:last-of-type {
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
