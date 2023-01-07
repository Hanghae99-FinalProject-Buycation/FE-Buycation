import React from "react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import ButtonBasic from "../elements/ButtonBasic";

const MyCreation = () => {
  return (
    <ContentsBox>
      <Box>
        <Image src="https://www.bhc.co.kr/images/index/banner/img_main_banner_220418_4.jpg"></Image>
        <Contents>
          <p>
            <FaMapMarkerAlt size="12px" /> 위치
          </p>
          <Title>맛있는 치킨 나눠먹어요</Title>
          <p>2023.1.1 13:00분 까지 모집</p>
          <p>
            <FaUser size="12px" /> 3/5
          </p>
        </Contents>
      </Box>
      <ButtonBasic width="5rem" height="2rem">
        후기 작성
      </ButtonBasic>
    </ContentsBox>
  );
};

export default MyCreation;

const ContentsBox = styled.div`
  display: flpxex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 10rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  @media screen and (max-width: 760px) {
    padding: 1rem;
  }
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  @media screen and (max-width: 760px) {
    gap: 0.5rem;
  }
`;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 5px;
  @media screen and (max-width: 760px) {
    width: 7rem;
    height: 7rem;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;
