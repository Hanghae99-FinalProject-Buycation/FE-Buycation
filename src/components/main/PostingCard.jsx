import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import styled from "@emotion/styled";
import CardBasic from "../elements/CardBasic";
import ButtonBasic from "../elements/ButtonBasic";

const PostingCard = ({
  postingId,
  category,
  address,
  title,
  totalMembers,
  currentMembers,
  dueData,
  perBudget,
  image,
  onShowMarker,
}) => {
  return (
    <CardBasic>
      <ContentsBox onClick={onShowMarker}>
        <Image src={image}></Image>

        <Article>
          <p>
            <FaMapMarkerAlt size="12px" /> {address}
          </p>
          <p>{title}</p>
          <p>
            <FaUser size="12px" /> {currentMembers}/{totalMembers}
          </p>
          <p>{dueData} 까지 모집</p>
          <p>
            {perBudget} <span>1인당 예산 금액</span>
          </p>
        </Article>
      </ContentsBox>
      <ButtonBasic height="2rem">상세보기</ButtonBasic>
    </CardBasic>
  );
};

export default PostingCard;

const ContentsBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3%;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 32%;
  height: 7rem;
  border-radius: 5px;
`;

const Article = styled.article`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
