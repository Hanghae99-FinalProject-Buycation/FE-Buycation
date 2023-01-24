import React, { useState } from "react";
import styled from "@emotion/styled";
import DetailPostingOptionModal from "./modals/DetailPostingOptionModal";

import profileDefault from "../../assets/profileImg/profile_default.svg";

const DetailCreatorProfile = ({
  details,
  postingId,
  onClickMoveProfileHandler,
  DetailSpan,
  DetailMoreButton,
}) => {
  const [postingModal, setPostingModal] = useState(false);

  const onClickPostingModalHandler = () => {
    setPostingModal(!postingModal);
  };
  return (
    <StCreatorProfile>
      <div>
        {/* 프로필 이미지 */}
        <div className="profileWrap">
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
        </div>
        {/* 유저 정보 */}
        <DetailSpan
          titleText={details?.nickname}
          bodyText={details?.address?.split(" ", 3).join(" ")}
          margin="0 0 0.25rem"
          fontSize="0.875rem"
          _onClick={() => onClickMoveProfileHandler(details?.memberId)}
        />
      </div>
      <div className="postingOption">
        {postingModal && <DetailPostingOptionModal postingId={postingId} />}
        {details?.myPosting && (
          <DetailMoreButton onClick={onClickPostingModalHandler} />
        )}
      </div>
    </StCreatorProfile>
  );
};

export default DetailCreatorProfile;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* height: 5rem; */
  div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span:first-of-type {
    cursor: pointer;
  }
  span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayStrong};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  /* 프로필 이미지 래퍼 */
  .profileWrap {
    width: 3.725rem;
    height: 3.725rem;
    ${({ theme }) => theme.common.flexCenter}
    margin-right: 0.625rem;
    border-radius: 5rem;
    overflow: hidden;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
    cursor: pointer;
  }

  /* 프로필 이미지 */
  .profileWrap img {
    flex-shrink: 0;
    width: 100%;
    min-height: 100%;
  }

  .postingOption {
    position: relative;
  }
`;
