import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {
  __deleteComment,
  __isSuccess,
} from "../../../redux/modules/details/commentSlice";

const DetailCommentModal = ({ id, modalId, setModalId }) => {
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.comments.isSuccess);
  const onClickModifyCommentHandler = () => {};
  const onClickDeleteCommentHandler = () => {
    dispatch(__deleteComment(id));
    if (isSuccess) {
      dispatch(__isSuccess(false));
    }
  };
  const onClickCloseHandler = () => {
    setModalId("");
  };
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    <StCommentModal ref={ref} className={modalId === id ? "show" : ""}>
      <button type="button" onClick={onClickModifyCommentHandler}>
        수정
      </button>
      <hr />
      <button type="button" onClick={onClickDeleteCommentHandler}>
        삭제
      </button>
    </StCommentModal>
  );
};

export default DetailCommentModal;

const StCommentModal = styled.div`
  display: ${(props) => (props.className === "show" ? "flex" : "none")};
  flex-direction: column;
  width: 5.5rem;
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
