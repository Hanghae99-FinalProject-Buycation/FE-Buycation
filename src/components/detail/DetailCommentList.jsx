import React, { useState } from "react";
import styled from "@emotion/styled";
import DetailCommentModal from "./modals/DetailCommentModal";
import DetailCommentForm from "./DetailCommentForm";

const DetailCommentList = ({ details, tokenValue, DetailMoreButton }) => {
  const commentsLength = details.commentList?.length || 0;
  const [commentModal, setCommentModal] = useState(false);

  const onClickCommentModalHandler = (e) => {
    //console.log(e.target.id);
    if (e.target.id === details.commentList.commentId) {
      setCommentModal(!commentModal);
    }
  };
  return (
    <>
      <StCommentWrap>
        {commentsLength !== 0 ? (
          <span> 댓글 {commentsLength}</span>
        ) : (
          <span> 댓글 0</span>
        )}
        {tokenValue && !details.doneStatus && <DetailCommentForm />}
      </StCommentWrap>
      {commentsLength !== 0 &&
        details.commentList?.map((comment, idx) => (
          <StCommentList key={comment.nickname[0] + idx}>
            <div>
              <span>
                <span>
                  {comment.nickname}
                  &nbsp;&nbsp;&nbsp;
                </span>
                <span>{comment.createdAt?.split(" ", 1)}</span>
                <p>{comment.content}</p>
              </span>
              {tokenValue && (
                <div className="commentOption">
                  {commentModal && (
                    <DetailCommentModal id={comment.commentId} />
                  )}
                  <DetailMoreButton
                    onClick={onClickCommentModalHandler}
                    id={comment.commentId}
                  />
                </div>
              )}
            </div>
            <hr key={"hr" + idx} />
          </StCommentList>
        ))}
    </>
  );
};

export default DetailCommentList;

const StCommentWrap = styled.div`
  margin-bottom: 2rem;
  div:first-of-type {
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.grayList};
    padding: 1rem;
  }
`;

const StCommentList = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  span > span:first-of-type {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perSpan};
    font-weight: 600;
  }
  span > span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayMid};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  .commentOption {
    position: relative;
  }
`;
