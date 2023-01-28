import React from "react";
import styled from "@emotion/styled";
import reviewFootIcon from "../../assets/reviewIcon/reviewFootIcon.svg";
import { useSelector } from "react-redux";

const ProfileStar = () => {
  const getProfileData = useSelector((data) => data.profile.getProfile);
  const myReviewList = getProfileData.reviewList;

  return (
    <>
      {myReviewList?.map((item, index) => (
        <ContentsBox key={index}>
          <ProfileInfo>
            <p>익명{index + 1}</p>
            <p>{item.createAt}</p>
          </ProfileInfo>
          <FootReview>
            {[2, 4, 6, 8, 10].map((el) => (
              <img
                className={`${item.reviewScore >= el && "colorStar"}`}
                alt={el}
                src={reviewFootIcon}
                key={el}
                id={el}
              />
            ))}
          </FootReview>
        </ContentsBox>
      ))}
    </>
  );
};

export default ProfileStar;

const ContentsBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayList};

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
    color: ${({ theme }) => theme.colors.grayStrong};
  }
`;
const FootReview = styled.div`
  display: flex;
  gap: 12px;
  img {
    width: 26px;
    height: 44px;
    font-size: 30px;
  }
  .colorStar {
    filter: ${({ theme }) => theme.colors.imgFilter};
  }
`;
