import React from "react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import ButtonBasic from "../elements/ButtonBasic";

const PostingCard = ({
  postingId,
  address,
  title,
  totalMembers,
  currentMembers,
  dueData,
  perBudget,
  image,
  onShowMarker,
}) => {
  const editAddress = (address) => {
    console.log(address);
    return address.split(" ", 3);
  };

  return (
    <CardWrap>
      <CardBox>
        <ContentsBox onClick={onShowMarker}>
          <img src={image}></img>
          <article>
            <p>
              <FaMapMarkerAlt size="11px" /> {editAddress(address)}
            </p>
            <p>{title}</p>
            <p>
              <FaUser size="11px" /> {currentMembers}/{totalMembers}
            </p>
            <p>~{dueData} 모집</p>
            <p>
              {perBudget} <span>(1인당 예산 금액)</span>
            </p>
          </article>
        </ContentsBox>
        <ButtonBasic height="1.8rem">상세보기</ButtonBasic>
      </CardBox>
    </CardWrap>
  );
};

export default PostingCard;

const CardWrap = styled.div`
  width: 100%;
  height: 12rem;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grayList};
`;

const CardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > img {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 8px;
  }

  & > article {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;

    & p:nth-child(1) {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
    & p:nth-child(2) {
      font-weight: 600;
    }
    & p:nth-child(3) {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
    & p:nth-child(4) {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
    & p:nth-child(5) {
      font-weight: 600;
    }

    & span {
      color: ${({ theme }) => theme.colors.grayMid};
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: 400;
    }
  }
`;
