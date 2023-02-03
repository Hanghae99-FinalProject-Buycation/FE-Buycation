import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendCommentBody,
  sendCommentId,
  sendCommentToggle,
  __isSuccess,
  __putComment,
} from "../../../redux/modules/details/commentSlice";
import Swal from "sweetalert2";
import ButtonBasic from "../../elements/ButtonBasic";

const DetailCommentModifyForm = ({ className, commentId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ content: "" });
  const isSuccess = useSelector((state) => state.comments.isSuccess);
  const toggleComment = useSelector((state) => state.comments.toggleComment);
  const modifyContent = useSelector((state) => state.comments.getCommentBody);

  const onChangeCommentHandler = (e) => {
    setComment({ content: e.target.value });
  };

  const onClickCommentPutHandler = (e) => {
    if (comment.content?.trim() === "") {
      Swal.fire({
        text: "내용을 입력해주세요.",
        confirmButtonColor: "#ff5a5f",
      });
    } else {
      dispatch(__putComment({ commentId, comment })).then((res) => {
        dispatch(sendCommentToggle(true));
        dispatch(sendCommentId(null));
        if (isSuccess) {
          dispatch(__isSuccess(false));
        }
        setComment({ content: "" });
        dispatch(sendCommentBody(""));
      });
    }
  };

  useEffect(() => {
    setComment({ content: modifyContent });
  }, [dispatch, modifyContent]);

  return (
    <StComment className={className}>
      {className === "show" && !toggleComment && (
        <textarea
          placeholder="댓글을 남겨보세요"
          onChange={onChangeCommentHandler}
          defaultValue={modifyContent}
        />
      )}
      <div>
        <ButtonBasic
          width="4.375rem"
          height="fit-content"
          color="white"
          _onClick={onClickCommentPutHandler}
        >
          수정
        </ButtonBasic>
      </div>
    </StComment>
  );
};

export default DetailCommentModifyForm;

const StComment = styled.div`
  display: ${(props) => (props.className === "show" ? "flex" : "none")};
  flex-direction: column;
  margin-top: ${({ theme }) => theme.lineHeight.perParagraph};
  padding: 1rem;
  background: ${({ theme }) => theme.colors.grayList};
  textarea {
    height: 8rem;
    padding: 1rem 0;
    border: none;
    background: ${({ theme }) => theme.colors.grayList};
    resize: none;
    outline: none;
  }
  /* 작성 버튼 오른정렬용 래퍼 */
  div:last-of-type {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  @media screen and (max-width: 23.5rem) {
    textarea {
      height: 4rem;
    }
  }
`;
