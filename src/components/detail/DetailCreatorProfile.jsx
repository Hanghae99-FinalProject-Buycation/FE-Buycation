import React from "react";
import styled from "@emotion/styled";
import profileDefault from "../../assets/profileImg/profile_default.svg";

const DetailCreatorProfile = ({
  details,

  onClickMoveProfileHandler,
  DetailSpan,
}) => {
  return (
    <StCreatorProfile>
      {/* 프로필 이미지 */}
      <StProfileWrap>
        {details?.profileImage !== "" ? (
          <img
            src={details?.profileImage}
            alt=""
            onClick={() => onClickMoveProfileHandler(details?.memberId)}
          />
        ) : (
          <img
            src={profileDefault}
            alt=""
            onClick={() => onClickMoveProfileHandler(details?.memberId)}
          />
        )}
      </StProfileWrap>
      {/* 유저 정보 */}
      <DetailSpan
        titleText={details?.nickname}
        bodyText={details?.address?.split(" ", 3).join(" ")}
        margin="0 0 0.25rem"
        fontSize="0.875rem"
        _onClick={() => onClickMoveProfileHandler(details?.memberId)}
      />
    </StCreatorProfile>
  );
};

export default DetailCreatorProfile;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  span:first-of-type {
    cursor: pointer;
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayStrong};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  select {
    border: 1px solid #000;
    border-radius: 1rem;
    padding: 1rem;
  }
`;

const StProfileWrap = styled.div`
  img {
    ${({ theme }) => theme.common.flexCenter}

    flex-shrink: 0;
    width: 3.725rem;
    height: 3.725rem;
    margin-right: 0.625rem;
    border-radius: 5rem;
    overflow: hidden;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
    cursor: pointer;
  }
`;
