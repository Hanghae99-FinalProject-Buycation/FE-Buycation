import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";
import profileIcon from "../../assets/headerIcon/profileIcon.svg";
import ChatZone from "./ChatZone";
import ChatParticipantModal from "./ChatParticipantModal";
import { sendChatModalStatus } from "../../redux/modules/modal/modalSlice";

const ChatBody = (props) => {
  const {
    client,
    memberId,
    nickname,
    userData,
    setUserData,
    chatList,
    privateChats,
    setPrivateChats,
  } = props;

  const dispatch = useDispatch();
  const modalStatus = useSelector(
    (state) => state.generalModal.toggleChatParticipantModal
  );
  const { roomInfo, participants } = useSelector(
    (state) => state.chat.getChatRoom
  );
  const { getRoomNo } = useSelector((state) => state.chat);

  const sendPrivateValue = () => {
    if (client.current) {
      let chatMessage = {
        memberId: memberId,
        sender: nickname,
        receiver: getRoomNo,
        message: userData.message,
        status: "MESSAGE",
      };
      if (chatMessage.message.trim() !== "") {
        client.current.publish({
          destination: `/send/${getRoomNo}`,
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
    if (e.keyCode === 13) {
      sendPrivateValue();
    }
  };

  return (
    <>
      <StChatRoomTitle>
        {modalStatus && <ChatParticipantModal data={participants} />}
        <div>
          <ElChatRoomImage
            src={chatList?.filter((item) => item.id === getRoomNo)[0]?.image}
            alt=""
          />
          <span>
            {chatList
              ?.filter((item) => item.id === getRoomNo)[0]
              ?.title.substr(0, 18)}
          </span>
        </div>
        <span onClick={() => dispatch(sendChatModalStatus(!modalStatus))}>
          <img src={profileIcon} alt="" />{" "}
          {chatList?.filter((item) => item.id === getRoomNo)[0]?.currentMembers}
          /{roomInfo?.totalMembers}???
        </span>
      </StChatRoomTitle>
      <StChatZone>
        <ChatZone
          privateChats={privateChats}
          setPrivateChats={setPrivateChats}
          userData={userData}
          client={client}
        />
      </StChatZone>
      <StSendZone>
        <input
          type="text"
          placeholder="???????????? ??????????????????"
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
