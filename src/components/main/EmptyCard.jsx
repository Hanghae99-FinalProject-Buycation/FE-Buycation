import React from "react";
import styled from "@emotion/styled";

const PostingCard = () => {
  return (
    <CardWrap>
      <ContentsBox>
        <article>게시글이 존재하지 않습니다.</article>
      </ContentsBox>
    </CardWrap>
  );
};

export default PostingCard;

const CardWrap = styled.div`
  width: 100%;
  height: 12rem;
  padding: 20px 22px;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grayList};
`;
const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  article {
    margin: auto;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
