import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  __deleteDetail,
  __doneDetail,
} from "../../redux/modules/details/detailSlice";

const DetailPostingOptionModal = ({ postingId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  const onClickSendDoneHandler = () => {
    dispatch(__doneDetail(postingId));
  };
  const onMoveModifyHandler = () => {
    navigate(`../modify/${postingId}`);
  };
  const onClickDeleteHandler = () => {
    dispatch(__deleteDetail(postingId));
  };
  // 더블클릭 해야 다시 버튼 등장함...
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    !hide && (
      <StPostingOption ref={ref}>
        <button type="button" onClick={onClickSendDoneHandler}>
          완료
        </button>
        <hr />
        <button type="button" onClick={onMoveModifyHandler}>
          수정
        </button>
        <hr />
        <button type="button" onClick={onClickDeleteHandler}>
          삭제
        </button>
      </StPostingOption>
    )
  );
};

export default DetailPostingOptionModal;

const StPostingOption = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column !important;
  position: absolute;
  right: 0;
  bottom: -7.5rem;
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
