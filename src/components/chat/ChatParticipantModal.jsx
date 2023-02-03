import React from "react";
import styled from "@emotion/styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { sendChatModalStatus } from "../../redux/modules/modal/modalSlice";

const ChatParticipantModal = ({ data }) => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(
    (state) => state.generalModal.toggleChatParticipantModal
  );

  const onClickCloseHandler = () => {
    dispatch(sendChatModalStatus(!modalStatus));
  };

  const ref = useOutsideClick(onClickCloseHandler);

  return (
    <StList ref={ref}>
      {data?.map((item) => (
        <li key={item.memberId}>{item.nickname}</li>
      ))}
    </StList>
  );
};

export default ChatParticipantModal;

const StList = styled.ul`
  width: 9rem;
  height: 6.25rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 7.5em;
  right: 1.5rem;
  padding: 0rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.1rem 0.125rem ${({ theme }) => theme.colors.grayList};
  background: #fff;
  z-index: 4;
  overflow-y: auto;
  li {
    width: 100%;
    height: 1.875rem;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  li:hover {
    color: ${({ theme }) => theme.colors.grayHover};
  }

  @media screen and (max-width: 48rem) {
    right: 0.5rem;
  }
`;
