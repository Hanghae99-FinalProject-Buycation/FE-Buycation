import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { Spinners } from "../../shared/layout/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { __getChatRoom } from "../../redux/modules/chat/chatSlice";

const ChatZone = ({ privateChats, userData }) => {
  const getRoomNo = useSelector((state) => state.chat.getRoomNo);
  const bottomRef = useRef(null);
  const date = new Date().toLocaleString();

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [privateChats]);
  /* if (privateChats.size === 0 || !privateChats.get(null))
    return (
      <>
        불편을 드려 죄송합니다. 채팅 창을 닫았다가 다시 접속해주세요 ... <br />
        <Spinners />
      </>
    ); */
  if (privateChats.get(getRoomNo)?.length > 0)
    return (
      <>
        {[...privateChats?.get(getRoomNo)]?.map((chat, index) =>
          // {talks?.map((chat, index) =>
          userData.memberId !== chat.memberId ? (
            <StChatBubble key={index}>
              {chat.sender !== userData.sender && (
                <StSender>{chat.sender}</StSender>
              )}
              <StBubbleWrap>
                <StChatMsg>{chat.message}</StChatMsg>
                <span>{chat.sendDate ? chat.sendDate : date}</span>
              </StBubbleWrap>
            </StChatBubble>
          ) : (
            <StChatBubble key={"user" + index} className="self">
              <StBubbleWrap className="self">
                <span>{chat.sendDate ? chat.sendDate : date}</span>
                <StChatMsg className="self">{chat.message}</StChatMsg>
              </StBubbleWrap>
            </StChatBubble>
          )
        )}
        <div ref={bottomRef} id="bottom" />
      </>
    );
};

export default ChatZone;

const StChatBubble = styled.li`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-items: ${(props) =>
    props.className !== "self" ? "flex-start" : "flex-end"};
`;

const StBubbleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  span {
    display: inline-block;
    margin: ${(props) =>
      props.className !== "self" ? "0 0 0 0.25rem" : "0 0.25rem 0 0"};
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayWeak};
  }
`;

const StSender = styled.div`
  background: #fff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 0.25rem;
`;

const StChatMsg = styled.div`
  width: fit-content;
  ${(props) =>
    props.className !== "self"
      ? `
  border-radius: 0 1rem 1rem 1.5rem;
  color: #000;
  background: #d9d9d9;
  `
      : `
  border-radius: 1rem 1rem 0rem 1.5rem;
  color: #fff;
  background: #ff5a5f;
  `};
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
