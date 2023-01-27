import React from "react";
import styled from "@emotion/styled";

const ChatZone = ({ privateChats, talks, userData, nickname }) => {
  console.log(privateChats);
  // if (privateChats?.size > 0)
  if (0 === 1)
    return (
      <>
        {[...privateChats?.get(nickname)]?.map((chat, index) =>
          chat.sender !== nickname ? (
            <StChatBubble key={index}>
              {chat.sender !== userData.sender && (
                <StSender>{chat.sender}</StSender>
              )}
              <StBubbleWrap>
                <StChatMsg>{chat.message}</StChatMsg>
                <span>{chat.sendDate.split("T")[0]}</span>
              </StBubbleWrap>
            </StChatBubble>
          ) : (
            <StChatBubble key={"user" + index} className="self">
              <StBubbleWrap className="self">
                <span>{chat.sendDate.split("T")[0]}</span>
                <StChatMsg className="self">{chat.message}</StChatMsg>
              </StBubbleWrap>
            </StChatBubble>
          )
        )}
      </>
    );

  return talks?.map((chat, index) =>
    chat.sender !== nickname ? (
      <StChatBubble key={"user" + index}>
        {chat.sender !== userData.sender && <StSender>{chat.sender}</StSender>}
        <StBubbleWrap>
          <StChatMsg>{chat.message}</StChatMsg>
          <span>{chat.sendDate?.split("T")[0]}</span>
        </StBubbleWrap>
      </StChatBubble>
    ) : (
      <StChatBubble key={"user" + index} className="self">
        <StBubbleWrap className="self">
          <span>{chat.sendDate?.split("T")[0]}</span>
          <StChatMsg className="self">{chat.message}</StChatMsg>
        </StBubbleWrap>
      </StChatBubble>
    )
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
