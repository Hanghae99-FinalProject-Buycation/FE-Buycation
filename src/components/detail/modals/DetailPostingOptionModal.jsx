import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { __deleteDetail } from "../../../redux/modules/details/detailSlice";
import Swal from "sweetalert2";

const DetailPostingOptionModal = ({ postingId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  const onMoveModifyHandler = () => {
    navigate(`../modify/${postingId}`);
  };
  const onClickDeleteHandler = () => {
    dispatch(__deleteDetail(postingId)).then((res) => {
      if (res.payload.statusCode !== 200) {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#ff5f5a",
          confirmButtonText: "확인",
        });
      } else {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#ff5f5a",
          confirmButtonText: "확인",
        });
        navigate("/");
      }
    });
  };
  const ref = useOutsideClick(onClickCloseHandler);
  return (
    !hide && (
      <StPostingOption ref={ref}>
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
  width: 5.625rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 2rem;
  padding: 0rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayList};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.375rem 0.1rem ${({ theme }) => theme.colors.grayWeak};
  background: #fff;

  button {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background: none;
  }
  hr {
    width: 100%;
    border-top: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    margin: 0;
  }
`;
