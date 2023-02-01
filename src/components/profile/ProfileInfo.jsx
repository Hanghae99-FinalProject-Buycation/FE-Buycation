import React, { useState } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import EditProfileModal from "./modal/EditProfileModal";
import footer from "../../assets/profileImg/footer.svg";
import profile_default from "../../assets/profileImg/profile_default.svg";
import { useSelector } from "react-redux";

const ProfileInfo = ({ onProfileData }) => {
  const getProfileData = useSelector((data) => data.profile.getProfile);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const onClickEditHandler = () => {
    setEditProfileModal(true);
  };

  const onClickCloseHandler = () => {
    setEditProfileModal(false);
  };

  return (
    <>
      {editProfileModal ? (
        <EditProfileModal onClose={onClickCloseHandler} />
      ) : null}
      <Profile>
        <Box>
          <ProfileImage
            alt="profileImage"
            src={
              getProfileData?.profileImage === "" ||
              getProfileData?.profileImage === undefined
                ? profile_default
                : getProfileData.profileImage
            }
          />
          <div>
            <span>{getProfileData.nickname}</span>
            <p>
              <img alt="review" src={footer} /> 발자국 평점{" "}
              {getProfileData.userScore}점
            </p>
          </div>
        </Box>
        {onProfileData === false ? null : (
          <ButtonBasic
            width="3.5rem"
            height="2rem"
            _onClick={onClickEditHandler}
          >
            수정
          </ButtonBasic>
        )}
      </Profile>
    </>
  );
};

export default ProfileInfo;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  div > span {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
    margin-bottom: 8px;
  }
  div > p {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.grayStrong};
  }
  div > p > img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
const ProfileImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;
