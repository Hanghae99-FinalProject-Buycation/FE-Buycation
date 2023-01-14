import React, { useState } from "react";
import styled from "@emotion/styled";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

const MyStar = () => {
  const [starClicked, setStarClicked] = useState(null);

  return (
    <>
      <ContentsBox>
        <ProfileInfo>
          <p>익명</p>
          <p>2023-10-01</p>
        </ProfileInfo>
        <FootReview>
          {[2, 4, 6, 8, 10].map((el) => (
            <i
              className={`fas fa-star ${starClicked >= el && "yellowStar"}`}
              key={el}
              id={el}
            />
          ))}
        </FootReview>
      </ContentsBox>
    </>
  );
};

export default MyStar;

const ContentsBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayWeak};

  @media screen and (max-width: 768px) {
    height: 6rem;
    padding: 1rem;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p:nth-of-type(2) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayMid};
  }
`;
const FootReview = styled.div`
  display: flex;
  gap: 12px;
  i {
    opacity: 0.1;
    font-size: 22px;
  }
  .yellowStar {
    color: orange;
    opacity: 1;
  }
`;
