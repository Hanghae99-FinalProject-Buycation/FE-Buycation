import styled from "@emotion/styled";
import React from "react";
import chatWaitIcon from "../../assets/chatIcon/chatWaitIcon.svg";

const ChatWaitingRoom = ({ className }) => {
  return (
    <StWaitWrap className={className}>
      <img src={chatWaitIcon} alt="" />
      <p>
        참여한 공구가 있어야 채팅 이용이 가능합니다.
        <br />
        (참여 공구 당 하나의 채팅방이 개설됩니다.)
        <br />
        <br />
        해당 공구 참여자들과 채팅을 이용해 보세요!
      </p>
    </StWaitWrap>
  );
};

export default ChatWaitingRoom;

const StWaitWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  grid-area: chatlist;
  height: 80%;
  img {
    width: 8.25rem;
    margin: 1.5rem;
  }
  p {
    color: ${({ theme }) => theme.colors.grayStrong};
  }
`;
