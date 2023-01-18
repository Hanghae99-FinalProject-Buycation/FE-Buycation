import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import ReviewModal from "./modal/ReviewModal";
import { addressForm } from "../../utils/editedData";
import { useDispatch, useSelector } from "react-redux";
import { __getParticipatedList } from "../../redux/modules/profile/myListSlice";

const MyParicipation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId } = useSelector((data) => data.profile.getMyProfile);
  const participatedList = useSelector((data) => data.myList.participatedList);
  const [reviewModal, setReviewModal] = useState(false);
  const [postingID, setPostingID] = useState("");

  const onClickReviewHandler = (postingId) => {
    setReviewModal(true);
    setPostingID(postingId);
  };

  const onClickCloseHandler = () => {
    setReviewModal(false);
  };

  const onClickMoveDetails = (postingId) => {
    navigate(`/details/${postingId}`);
  };

  useEffect(() => {
    dispatch(__getParticipatedList(memberId));
  }, [dispatch, memberId]);

  return (
    <>
      {reviewModal ? (
        <ReviewModal onClose={onClickCloseHandler} postingIdData={postingID} />
      ) : null}
      {participatedList.map((item) => (
        <ContentsBox key={item.postingId}>
          <Box>
            <Image
              src={item.image}
              onClick={() => onClickMoveDetails(item.postingId)}
            ></Image>
            <Contents>
              <p>
                <FaMapMarkerAlt size="11px" /> {addressForm(item.address)}
              </p>
              <p>{item.title}</p>
              <p>{item.dueDate} 까지 모집</p>
              <p>
                <FaUser size="11px" /> {item.currentMembers}/{item.totalMembers}
              </p>
              {item.doneStatus ? (
                <ReviewBtn onClick={() => onClickReviewHandler(item.postingId)}>
                  후기 작성
                </ReviewBtn>
              ) : null}
            </Contents>
          </Box>
        </ContentsBox>
      ))}
    </>
  );
};

export default MyParicipation;

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
  cursor: pointer;
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
