import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import ButtonBasic from "../elements/ButtonBasic";
import { addressForm, titleForm, countComma } from "../../utils/editedData";

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
  const navigate = useNavigate();
  const editedAddress = addressForm(address);
  const editedTitle = titleForm(title);
  const editedBudget = countComma(perBudget);

  const onClickMoveDetailHandler = () => {
    navigate(`/details/${postingId}`);
  };

  return (
    <CardWrap>
      <CardBox>
        <ContentsBox onClick={onShowMarker}>
          <img alt="img" src={image}></img>
          <article>
            <p>
              <FaMapMarkerAlt size="11px" /> {editedAddress}
            </p>
            <p>{editedTitle}</p>
            <p>
              <FaUser size="11px" /> {currentMembers}/{totalMembers}
            </p>
            <p>{dueData}까지 모집</p>
            <p>
              {editedBudget} <span>(1인당 예산 금액)</span>
            </p>
          </article>
        </ContentsBox>
        <ButtonBasic height="2rem" _onClick={onClickMoveDetailHandler}>
          상세보기
        </ButtonBasic>
      </CardBox>
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
  &:hover {
    //border-bottom: 1px solid ${({ theme }) => theme.colors.grayMid};
    //box-shadow: 0 0 0 1.5px #a6a6a6 inset;
    box-shadow: 0px -5px 5px -2px #a6a6a6;
  }
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
  img {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 8px;
  }
  article {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;

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
    p:nth-of-type(5) {
      font-weight: 600;
    }
    span {
      color: ${({ theme }) => theme.colors.grayMid};
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: 400;
    }
  }
`;
