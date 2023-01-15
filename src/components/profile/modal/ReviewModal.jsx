import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaTimes } from "react-icons/fa";
import ButtonBasic from "../../elements/ButtonBasic";
import { useDispatch, useSelector } from "react-redux";
import {
  __getReviewList,
  __postReviewScore,
} from "../../../redux/modules/profile/reviewsSlice";

const ReviewModal = ({ onClose, postingIdData }) => {
  /**
   * 해당 별 평점 텍스트 나타내기
   * 해당 별 클릭시 색깔 유지
   * 클릭한 해당 별 인데스 저장 후 백엔드로 데이터 보냄
   */
  const dispatch = useDispatch();
  const reviewList = useSelector((data) => data.reviews.reviews);
  //console.log(reviewList);

  useEffect(() => {
    dispatch(__getReviewList(postingIdData));
  }, [dispatch, postingIdData]);

  const [starClicked, setStarClicked] = useState(null);

  //state로 별점과 Css 변경
  const onClickStarHandler = (e) => {
    setStarClicked(e.target.id);
  };

  //등록 버튼 클릭 시 통신
  const onClickPostReviewHandler = () => {
    const newPostData = {
      postingId: postingIdData,
      //memberId: memberId,
      userScore: parseInt(starClicked),
    };
    //dispatch(__postReviewScore(newPostData));
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

        <PersonCard>
          <PersonInfo>
            <p>닉네임</p>
            <StarBox>
              {[2, 4, 6, 8, 10].map((el) => (
                <i
                  className={`fas fa-shoe-prints ${
                    starClicked >= el && "colorStar"
                  }`}
                  key={el}
                  id={el}
                  onClick={onClickStarHandler}
                />
              ))}
            </StarBox>
          </PersonInfo>

          <ButtonBasic _onClick={onClickPostReviewHandler}>등록</ButtonBasic>
        </PersonCard>

        <PersonCard>
          <PersonInfo>
            <p>닉네임</p>
            <StarBox>
              {[2, 4, 6, 8, 10].map((el) => (
                <i
                  className={`fas fa-shoe-prints ${
                    starClicked >= el && "colorStar"
                  }`}
                  key={el}
                  id={el}
                  onClick={onClickStarHandler}
                />
              ))}
            </StarBox>
          </PersonInfo>

          <ButtonBasic _onClick={onClickPostReviewHandler}>등록</ButtonBasic>
        </PersonCard>
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
  i {
    margin: 15px 5px 0 5px;
    opacity: 0.1;
    font-size: 30px;
    cursor: pointer;
  }
  .colorStar {
    color: ${({ theme }) => theme.colors.main};
    opacity: 1;
  }
`;
