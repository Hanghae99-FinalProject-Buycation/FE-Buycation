import styled from "@emotion/styled";
import React, { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const DetailCommentModal = () => {
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    !hide && (
      <StCommentModal ref={ref}>
        <button type="button">수정</button>
        <hr />
        <button type="button">삭제</button>
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
  bottom: -5rem;
  padding: 0rem;
  border: 1px solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 2px ${({ theme }) => theme.colors.grayList};
  background: #fff;

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
