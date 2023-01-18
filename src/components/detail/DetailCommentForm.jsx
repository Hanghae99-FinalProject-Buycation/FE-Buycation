import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWindowResize from "../../hooks/useWindowResize";
import {
  __getComment,
  __postComment,
} from "../../redux/modules/details/commentSlice";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { __getMyProfile } from "../../redux/modules/profile/profileSlice";
import ButtonBasic from "../elements/ButtonBasic";

const DetailCommentForm = () => {
  const dispatch = useDispatch();
  const postingId = Number(useParams().postingId);
  const memberIdData = parseInt(localStorage.getItem("memberId"));
  const { nickname } = useSelector((state) => state.profile.getProfile);
  const [comment, setComment] = useState({ content: "" });
  const onChangeCommentHandler = (e) => {
    setComment({ content: e.target.value });
  };
  const onClickCommentPostHandler = (e) => {
    dispatch(__postComment({ postingId, comment }));
    dispatch(__getComment(postingId));
  };

  useEffect(() => {
    dispatch(__getMyProfile(memberIdData));
  }, [dispatch]);

  return (
    <StComment>
      <span>{nickname}</span>
      <textarea
        placeholder="댓글을 남겨보세요"
        onChange={onChangeCommentHandler}
      />
      <div>
        <ButtonBasic
          width="4.375rem"
          height="fit-content"
          color="white"
          _onClick={onClickCommentPostHandler}
        >
          등록
        </ButtonBasic>
      </div>
    </StComment>
  );
};

export default DetailCommentForm;

const StComment = styled.div`
  margin-top: ${({ theme }) => theme.lineHeight.perParagraph};
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
`;
