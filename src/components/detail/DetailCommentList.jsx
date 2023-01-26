import React, { useState } from "react";
import styled from "@emotion/styled";
import DetailCommentModal from "./modals/DetailCommentModal";
import DetailCommentForm from "./DetailCommentForm";
import { useSelector } from "react-redux";

const DetailCommentList = ({
  details,
  tokenValue,
  DetailMoreButton,
  memberId,
}) => {
  const commentsLength = details.commentList?.length || 0;
  const [modalId, setModalId] = useState("");

  const onClickCommentModalHandler = (id) => {
    setModalId(id);
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
            <StComment>
              <span>
                <span>
                  {comment.nickname}
                  &nbsp;&nbsp;&nbsp;
                </span>
                <span>{comment.createdAt?.split(" ", 1)}</span>
                <p>{comment.content}</p>
              </span>
              {tokenValue && memberId === comment.memberId && (
                <div className="commentOption">
                  <DetailCommentModal
                    id={comment.commentId}
                    modalId={modalId}
                    setModalId={setModalId}
                  />
                  <DetailMoreButton
                    onClick={() =>
                      onClickCommentModalHandler(comment.commentId)
                    }
                  />
                </div>
              )}
            </StComment>
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

const StComment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
