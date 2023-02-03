import React from "react";
import styled from "@emotion/styled";

const EmptyContents = (props) => {
  return (
    <ContentsBox>
      <div>
        <p>{props.mainText}</p>
        <p>{props.subText}</p>
      </div>
    </ContentsBox>
  );
};

export default EmptyContents;

const ContentsBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayStrong};
  font-size: ${({ theme }) => theme.fontSize.sm};
  p {
    text-align: center;
    margin-bottom: 10px;
  }
`;
