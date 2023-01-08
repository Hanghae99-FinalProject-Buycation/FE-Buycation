import React from "react";
import styled from "@emotion/styled";

const MyStar = () => {
  return (
    <>
      <ContentsBox>
        <ProfileInfo>
          <p>익명</p>
          <p>2023-10-01</p>
        </ProfileInfo>
        <p>아이콘</p>
      </ContentsBox>
    </>
  );
};

export default MyStar;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 10rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  @media screen and (max-width: 760px) {
    padding: 1rem;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 1rem;
`;
