import React, { useState } from "react";
import styled from "@emotion/styled";

const MyStar = () => {
  return (
    <>
      <ContentsBox>
        <ProfileInfo>
          <p>익명</p>
          <p>2023-10-01</p>
        </ProfileInfo>
        <FootReview>
          {[2, 4, 6, 8, 10].map((el) => (
            <i
              className={`fas fa-shoe-prints ${6 >= el && "colorStar"}`}
              key={el}
              id={el}
            />
          ))}
        </FootReview>
      </ContentsBox>
    </>
  );
};

export default MyStar;

const ContentsBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};

  @media screen and (max-width: 768px) {
    height: 6rem;
    padding: 1rem;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p:nth-of-type(2) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayMid};
  }
`;
const FootReview = styled.div`
  display: flex;
  gap: 12px;
  i {
    opacity: 0.1;
    font-size: 22px;
  }
  .colorStar {
    color: ${({ theme }) => theme.colors.main};
    opacity: 1;
  }
`;
