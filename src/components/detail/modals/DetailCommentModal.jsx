import styled from "@emotion/styled";
import React, { useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const DetailCommentModal = () => {
  const [hide, setHide] = useState(false);
  const onClickModifyCommentHandler = () => {
    console.log("수정");
  };
  const onClickDeleteCommentHandler = () => {
    console.log("삭제");
  };
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    !hide && (
      <StCommentModal ref={ref}>
        <button type="button" onClick={onClickModifyCommentHandler}>
          수정
        </button>
        <hr />
        <button type="button" onClick={onClickDeleteCommentHandler}>
          삭제
        </button>
      </StCommentModal>
    )
  );
};

export default DetailCommentModal;

const StCommentModal = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column !important;
  position: absolute;
  right: 0;
  bottom: -4.5rem;
  padding: 0rem;
  border: 1px solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 6px 3px ${({ theme }) => theme.colors.grayList};
  background: #fff;

  button {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background: none;
  }
  hr {
    width: 100%;
    border-top: thin solid ${({ theme }) => theme.colors.grayList};
    margin: 0;
  }
`;
