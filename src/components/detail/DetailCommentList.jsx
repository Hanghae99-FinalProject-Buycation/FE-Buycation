import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import DetailCommentModal from "./modals/DetailCommentModal";
import DetailCommentForm from "./DetailCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { sendCommentId } from "../../redux/modules/details/commentSlice";

const DetailCommentList = ({
  details,
  tokenValue,
  DetailMoreButton,
  memberId,
}) => {
  const dispatch = useDispatch();
  const commentsLength = details.commentList?.length || 0;
  const [modalId, setModalId] = useState("");
  const [modifyId, setModifyId] = useState("");
  const getCommentId = useSelector((state) => state.comments.getCommentId);
  const toggleComment = useSelector((state) => state.comments.toggleComment);

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
        {tokenValue && !details.doneStatus && (
          <DetailCommentForm className={true} />
        )}
      </StCommentWrap>
      {commentsLength !== 0 &&
        details.commentList?.map((comment, idx) => (
          <Fragment key={"frag" + idx}>
            <StCommentList key={"cmt" + comment.commentId}>
              <StComment
                className={getCommentId === comment.commentId ? "" : "show"}
                id={comment.commentId}
              >
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
              <DetailCommentForm
                key={"mod" + comment.commentId}
                id={comment.commentId}
                className={getCommentId === comment.commentId ? "show" : ""}
                commentId={comment.commentId}
                commentContent={comment.content}
              />
              <hr key={"hr" + idx} />
            </StCommentList>
          </Fragment>
        ))}
    </>
  );
};

export default DetailCommentList;

const StCommentWrap = styled.div`
  margin-bottom: 2rem;
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
  display: ${(props) => (props.className === "show" ? "flex" : "none")};
  /* display: flex; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    width: 80%;
  }
`;
