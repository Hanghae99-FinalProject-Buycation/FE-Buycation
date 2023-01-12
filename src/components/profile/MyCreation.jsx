import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import ButtonBasic from "../elements/ButtonBasic";
import ReviewModal from "./modal/ReviewModal";

const MyCreation = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const onClickReviewHandler = () => {
    setReviewModal(true);
  };
  const onClickCloseHandler = () => {
    setReviewModal(false);
  };

  return (
    <>
      {reviewModal ? <ReviewModal onClose={onClickCloseHandler} /> : null}
      <ContentsBox>
        <Box>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1cuwGu33uyLO0kXmE5WT3upryL1ng6rdRLHpDmqmEj2TUyKgZLvjc-CkdErVNwmF05g&usqp=CAU"></Image>
          <Contents>
            <p>
              <FaMapMarkerAlt size="11px" /> 위치
            </p>
            <p> 맛있는 치킨 나눠먹어요</p>
            <p>2023-1-1 13:00 까지 모집</p>
            <p>
              <FaUser size="11px" /> 3/5
            </p>
            <ButtonBasic _onClick={onClickReviewHandler}>후기 작성</ButtonBasic>
          </Contents>
        </Box>
      </ContentsBox>
    </>
  );
};

export default MyCreation;

const ContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 15rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  @media screen and (max-width: 768px) {
    height: 10rem;
    padding: 0 1rem;
  }
`;
const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;
const Image = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 8rem;
    height: 8rem;
  }
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p:nth-of-type(1) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  p:nth-of-type(2) {
    font-weight: 600;
  }
  p:nth-of-type(3) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  p:nth-of-type(4) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  button {
    width: 5rem;
    height: 2rem;
    background: inherit;
    border: 1px solid #ff5a5f;
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;
