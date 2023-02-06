import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const ChatZone = ({ privateChats, userData }) => {
  const getRoomNo = useSelector((state) => state.chat.getRoomNo);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      block: "nearest",
      inline: "start",
    });
  }, [privateChats]);

  if (privateChats.get(getRoomNo)?.length > 0)
    return (
      <>
        {[...privateChats?.get(getRoomNo)]?.map((chat, index) =>
          userData.memberId !== chat.memberId ? (
            <StChatBubble key={index}>
              {chat.sender !== userData.sender && (
                <StSender>{chat.sender}</StSender>
              )}
              <StBubbleWrap>
                <StChatMsg>{chat.message}</StChatMsg>
                <span>{chat.sendDate}</span>
              </StBubbleWrap>
            </StChatBubble>
          ) : (
            <StChatBubble key={"user" + index} className="self">
              <StBubbleWrap className="self">
                <span>{chat.sendDate}</span>
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
    color: ${({ theme }) => theme.colors.grayStrong};
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
  padding: 0.5rem 0.825rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
