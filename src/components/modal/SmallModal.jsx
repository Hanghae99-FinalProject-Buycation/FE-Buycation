import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const SmallModal = (props) => {
  const {
    first,
    second,
    third,
    firstClick,
    secondClick,
    thirdClick,
    top,
    left,
    right,
    bottom,
    hidden,
  } = props;
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const onClickCloseHandler = () => {
    dispatch(sendModalStatus(!modalStatus));
  };
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    !modalStatus && (
      <StPostingOption
        ref={ref}
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        hidden={hidden}
      >
        <button type="button" onClick={firstClick}>
          {first}
        </button>
        <hr />
        <button type="button" onClick={secondClick}>
          {second}
        </button>
        <hr />
        <button type="button" onClick={thirdClick}>
          {third}
        </button>
      </StPostingOption>
    )
  );
};

export default SmallModal;

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
  }
  hr {
    width: 100%;
    background: ${({ theme }) => theme.colors.grayWeak};
    height: 0.1rem;
    border: 0;
    margin: 0;
  }
`;
