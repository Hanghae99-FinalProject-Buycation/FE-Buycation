import React from "react";
import styled from "@emotion/styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const UserModal = (props) => {
  const {
    posting,
    myProfile,
    logout,
    postingClick,
    myProfileClick,
    logoutClick,
    top,
    left,
    right,
    bottom,
  } = props;

  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);

  const onClickCloseHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };
  const ref = useOutsideClick(onClickCloseHandler);

  return (
    <StPostingOption
      ref={ref}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
    >
      <div>
        <button onClick={postingClick}>{posting}</button>
        <button onClick={myProfileClick}>{myProfile}</button>
        <button onClick={logoutClick}>{logout}</button>
      </div>
    </StPostingOption>
  );
};

export default UserModal;

const StPostingOption = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column !important;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  padding: 0rem;
  border: 1px solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 2px ${({ theme }) => theme.colors.grayList};
  background: #fff;
  z-index: 4;
  button {
    width: 100%;
    height: 100%;
    padding: 8px;
    background: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
  }
`;
