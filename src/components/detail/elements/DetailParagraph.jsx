import React from "react";
import styled from "@emotion/styled";

const DetailParagraph = ({ spanText, paraText }) => {
  return (
    <ElDiv>
      <span>{spanText}</span>
      <p>{paraText}</p>
    </ElDiv>
  );
};

export default DetailParagraph;

const ElDiv = styled.div`
  span {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  line-height: ${({ theme }) => theme.lineHeight.perParagraph};
`;
