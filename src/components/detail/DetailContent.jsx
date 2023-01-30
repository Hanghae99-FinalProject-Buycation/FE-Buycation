import React from "react";
import styled from "@emotion/styled";

const DetailContent = ({ details }) => {
  return (
    <StContent>
      <h3>{details?.title}</h3>
      {/* <h3>{longtitleForm(details?.title)}</h3> */}
      <span>
        <u>{details?.category}</u> {details?.createdAt?.split(" ")[0]}
      </span>
      <p>{details?.content}</p>
    </StContent>
  );
};

export default DetailContent;

const StContent = styled.div`
  h3 {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};
  }
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
