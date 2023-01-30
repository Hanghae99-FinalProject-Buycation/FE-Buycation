import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendCommentId,
  sendCommentToggle,
  __isSuccess,
  __postComment,
  __putComment,
} from "../../redux/modules/details/commentSlice";
import {
  __getMyProfile,
  __getProfile,
} from "../../redux/modules/profile/profileSlice";
import Swal from "sweetalert2";
import ButtonBasic from "../elements/ButtonBasic";
import { useParams } from "react-router-dom";

const DetailCommentForm = ({ className, commentId, commentContent }) => {
  const dispatch = useDispatch();
  const postingId = parseInt(useParams().postingId);
  const [comment, setComment] = useState({ content: commentContent });
  const myInfo = useSelector((state) => state.profile.getProfile);
  const isSuccess = useSelector((state) => state.comments.isSuccess);
  const toggleComment = useSelector((state) => state.comments.toggleComment);

  const onChangeCommentHandler = (e) => {
    setComment({ content: e.target.value });
  };

  const onClickCommentPostHandler = (e) => {
    if (comment.content.trim() === "") {
      Swal.fire({
        text: "내용을 입력해주세요.",
        confirmButtonColor: "#ff5a5f",
      });
    } else {
      dispatch(__postComment({ postingId, comment }));
      setComment({ content: "" });
      dispatch(sendCommentToggle(true));
    }
    if (isSuccess) {
      dispatch(__isSuccess(false));
    }
  };

  const onClickCommentPutHandler = (e) => {
    if (comment.content.trim() === "") {
      Swal.fire({
        text: "내용을 입력해주세요.",
        confirmButtonColor: "#ff5a5f",
      });
    } else {
      dispatch(__putComment({ commentId, comment }));
      dispatch(sendCommentToggle(true));
      dispatch(sendCommentId(null));
    }
    if (isSuccess) {
      dispatch(__isSuccess(false));
    }
  };

  useEffect(() => {
    dispatch(__getMyProfile());
  }, [dispatch]);

  return (
    <StComment className={className}>
      <span>{myInfo?.nickname}</span>
      <textarea
        placeholder="댓글을 남겨보세요"
        onChange={onChangeCommentHandler}
        value={comment.content}
      />
      <div>
        <ButtonBasic
          width="4.375rem"
          height="fit-content"
          color="white"
          _onClick={() =>
            className === "show" && !toggleComment
              ? onClickCommentPutHandler()
              : onClickCommentPostHandler()
          }
        >
          {className === "show" && !toggleComment ? "수정" : "등록"}
        </ButtonBasic>
      </div>
    </StComment>
  );
};

export default DetailCommentForm;

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
