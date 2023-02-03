import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import DetailPostingOptionModal from "./modals/DetailPostingOptionModal";

const DetailContent = ({ details, postingId, DetailMoreButton }) => {
  const [postingModal, setPostingModal] = useState(false);
  const onClickPostingModalHandler = () => {
    setPostingModal(!postingModal);
  };
  return (
    <StContent>
      {postingModal && <DetailPostingOptionModal postingId={postingId} />}
      <StTitleWrap>
        <h3>{details?.title}</h3>{" "}
        {details?.myPosting && !details?.doneStatus && (
          <DetailMoreButton
            onClick={onClickPostingModalHandler}
            size="1.875rem"
          />
        )}
      </StTitleWrap>
      <span>
        <u>{details?.category}</u> {details?.createdAt?.split(" ")[0]}
      </span>
      <p>{details?.content}</p>
    </StContent>
  );
};

export default DetailContent;

const StContent = styled.div`
  position: relative;

  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};
    color: ${({ theme }) => theme.colors.grayMid};
  }

  p {
    line-height: ${({ theme }) => theme.lineHeight.perParagraph};
    white-space: pre-wrap;
  }
`;

const StTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};

  h3 {
    display: inline-block;
    width: 26ch;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.xl};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
