import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import ButtonBasic from "../elements/ButtonBasic";
import ReviewModal from "./modal/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { __getCreatedList } from "../../redux/modules/profile/myListSlice";
import { addressForm } from "../../utils/editedData";

const MyCreation = () => {
  const dispatch = useDispatch();
  const createdList = useSelector((data) => data.myList.createdList);
  const [reviewModal, setReviewModal] = useState(false);
  const [postingID, setPostingID] = useState("");

  const onClickReviewHandler = (postingId) => {
    setReviewModal(true);
    setPostingID(postingId);
  };
  const onClickCloseHandler = () => {
    setReviewModal(false);
  };

  useEffect(() => {
    dispatch(__getCreatedList());
  }, [dispatch]);

  return (
    <>
      {reviewModal ? (
        <ReviewModal onClose={onClickCloseHandler} postingIdData={postingID} />
      ) : null}
      {createdList.map((item) => (
        <ContentsBox key={item.postingId}>
          <Box>
            <Image src={item.image}></Image>
            <Contents>
              <p>
                <FaMapMarkerAlt size="11px" /> {addressForm(item.address)}
              </p>
              <p>{item.title}</p>
              <p>{item.dueDate} 까지 모집</p>
              <p>
                <FaUser size="11px" /> {item.currentMembers}/{item.totalMembers}
              </p>
              <ReviewBtn onClick={() => onClickReviewHandler(item.postingId)}>
                후기 작성
              </ReviewBtn>
            </Contents>
          </Box>
        </ContentsBox>
      ))}
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};
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
  width: 11rem;
  height: 11rem;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 7.5rem;
    height: 7.5rem;
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

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ReviewBtn = styled.button`
  width: 5rem;
  height: 31px;
  background: inherit;
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
