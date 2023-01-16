import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import reviewImg from "../../../assets/reviewIcon/emptyLeftFoot.svg";
import { FaTimes } from "react-icons/fa";
import ButtonBasic from "../../elements/ButtonBasic";
import { useDispatch, useSelector } from "react-redux";
import {
  __getReviewList,
  __postReviewScore,
} from "../../../redux/modules/profile/reviewsSlice";

const ReviewModal = ({ onClose, postingIdData }) => {
  const dispatch = useDispatch();
  const reviewList = useSelector((data) => data.reviews.reviews);
  console.log(reviewList);

  useEffect(() => {
    dispatch(__getReviewList(postingIdData));
  }, [dispatch, postingIdData]);

  const [starClicked, setStarClicked] = useState([]);

  const onClickStarHandler = (event, idx) => {
    const newArr = [...starClicked];
    newArr[idx] = event.target.id;
    setStarClicked(newArr);
    //console.log(idx);
  };
  //console.log(starClicked);

  const onClickPostReviewHandler = (memberId) => {
    const newPostData = {
      postingId: postingIdData,
      memberId: memberId,
      userScore: parseInt(starClicked),
    };
    dispatch(__postReviewScore(newPostData));
    console.log(newPostData);
  };

  return (
    <Backdrop>
      <ModalCard>
        <Header>
          <p>후기 작성</p>
          <CloseBtn onClick={onClose}>
            <FaTimes size="1.3rem" />
          </CloseBtn>
        </Header>
        {reviewList.map((item, idx) => (
          <PersonCard key={item.memberId}>
            <PersonInfo>
              <p>{item.nickname}</p>
              <StarBox>
                {[2, 4, 6, 8, 10].map((el) => (
                  <img
                    className={`${starClicked[idx] >= el && "colorStar"}`}
                    alt={el}
                    src={reviewImg}
                    key={el}
                    id={el}
                    onClick={(event) => onClickStarHandler(event, idx)}
                  />
                ))}
              </StarBox>
            </PersonInfo>
            <ButtonBasic
              _onClick={() => onClickPostReviewHandler(item.memberId)}
            >
              등록
            </ButtonBasic>
          </PersonCard>
        ))}
      </ModalCard>
    </Backdrop>
  );
};

export default ReviewModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
`;
const ModalCard = styled.div`
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 20%;
  width: 37rem;
  z-index: 10;
  background: white;
  border-radius: 5px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
    margin: auto;
  }
`;
const CloseBtn = styled.button`
  background: none;
  cursor: pointer;
`;
const PersonCard = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};

  button {
    width: 3.5rem;
    height: 2rem;
    background: inherit;
    border: 1px solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
  }
`;
const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StarBox = styled.div`
  display: flex;

  img {
    margin: 15px 5px 0 5px;
    opacity: 0.1;
    font-size: 30px;
    cursor: pointer;
  }
  .colorStar {
    filter: ${({ theme }) => theme.colors.imgFilter};
    opacity: 1;
  }
`;
