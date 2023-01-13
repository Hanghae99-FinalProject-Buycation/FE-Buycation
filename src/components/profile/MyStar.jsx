import React from "react";
import styled from "@emotion/styled";
import footers from "../../assets/footers.svg";

const MyStar = () => {
  return (
    <>
      <ContentsBox>
        <ProfileInfo>
          <p>익명</p>
          <p>2023-10-01</p>
        </ProfileInfo>
        <img alt="footers" src={footers} />
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};
  img {
    width: 194px;
    height: 39px;
  }
  @media screen and (max-width: 768px) {
    height: 6rem;
    padding: 1rem;
    img {
      width: 90px;
      height: 20px;
    }
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
