import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { sendRoomNo, __getChatRoom } from "../../redux/modules/chat/chatSlice";
import DetailSpan from "../detail/elements/DetailSpan";

const ChatList = (props) => {
  const {
    client,
    chatList,
    innerWidth,
    privateChats,
    setPrivateChats,
    setRoomId,
    isSubscribed,
    setIsSubscribed,
    userData,
    setUserData,
    hide,
    setHide,
    // userJoin,
  } = props;
  const dispatch = useDispatch();
  const onPrivateMessage = (message) => {
    const payloadData = JSON.parse(message.body);
    privateChats.set(payloadData.talkRoomId, [
      ...privateChats?.get(payloadData.talkRoomId),
      payloadData,
    ]);
    setPrivateChats(new Map(privateChats));
  };
  const onClickSelectRoomHandler = (roomNo) => {
    dispatch(__getChatRoom(roomNo)).then((res) => {
      const payloadData = res.payload;
      const subscriptionId = payloadData.roomInfo?.id;
      privateChats.set(subscriptionId, payloadData.talks);
      setRoomId(roomNo);
      dispatch(sendRoomNo(roomNo));
      if (!isSubscribed) {
        client.current.subscribe(`/talk/${roomNo}`, onPrivateMessage, {
          id: subscriptionId,
        });
        setIsSubscribed(true);
      } else {
        client.current.unsubscribe(subscriptionId);
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

  return (
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
              bodyText={<span className="cropText">{room.lastMessage}</span>}
              margin="0 0 0.25rem"
              fontWeight="400"
            />
          </StChatRooms>
        ))}
      </ul>
    </StChatList>
  );
};

export default ChatList;

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
