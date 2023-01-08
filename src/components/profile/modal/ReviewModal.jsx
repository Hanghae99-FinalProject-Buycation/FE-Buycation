import React, { useState } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../../elements/ButtonBasic";
import { FaTimes } from "react-icons/fa";

const ReviewModal = (props) => {
  /**
   * 해당 별 평점 텍스트 나타내기
   * 해당 별 클릭시 색깔 유지
   * 클릭한 해당 별 인데스 저장 후 백엔드로 데이터 보냄
   */

  const [starClicked, setStarClicked] = useState(null);

  //state로 별점과 Css 변경
  const onClickStarHandler = (e) => {
    setStarClicked(e.target.id);
  };
  console.log(starClicked);

  //등록 버튼 클릭 시 통신
  const onClickPostReviewHandler = () => {
    console.log("테스트");
    //dispatch
  };

  return (
    <Backdrop>
      <ModalCard>
        <Header>
          <p>후기 작성</p>
          <CloseBtn onClick={props.onClose}>
            <FaTimes size="1.3rem" />
          </CloseBtn>
        </Header>
        <PersonCard>
          <PersonInfo>
            <p>닉네임</p>
            <StarBox>
              {/* 별 아이콘 다섯개 만들기 */}
              {[2, 4, 6, 8, 10].map((el) => (
                <i
                  className={`fas fa-star ${starClicked >= el && "yellowStar"}`}
                  key={el}
                  id={el}
                  onClick={onClickStarHandler}
                />
              ))}
            </StarBox>
          </PersonInfo>
          <ButtonBasic width="3rem" _onClick={onClickPostReviewHandler}>
            등록
          </ButtonBasic>
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
  top: 30%;
  width: 50%;
  z-index: 10;
  background: white;
  border-radius: 5px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: auto;
  }
`;

const CloseBtn = styled.button`
  background: none;
  cursor: pointer;
`;

const PersonCard = styled.div`
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PersonInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StarBox = styled.div`
  display: flex;
  /* gap: 0.2rem; */

  i {
    margin: 20px 10px 20px 0;
    opacity: 0.1;
    font-size: 30px;
    cursor: pointer;
  }

  .yellowStar {
    color: orange;
    opacity: 1;
  }
`;
