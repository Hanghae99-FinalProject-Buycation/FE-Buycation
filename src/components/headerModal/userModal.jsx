import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";
import { getCookies } from "../../core/cookie";

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
  } = props;
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const tokenValue = getCookies("id");

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
      {tokenValue ? (
        <div>
          <button type="button" onClick={firstClick}>
            {first}
          </button>
          <button type="button" onClick={thirdClick}>
            {third}
          </button>
        </div>
      ) : (
        <button type="button" onClick={secondClick}>
          {second}
        </button>
      )}
    </StPostingOption>
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
  }
`;
