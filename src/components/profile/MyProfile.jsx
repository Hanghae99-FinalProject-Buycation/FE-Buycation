import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import EditProfileModal from "./modal/EditProfileModal";
import footer from "../../assets/profileImg/footer.svg";
import profile_default from "../../assets/profileImg/profile_default.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getMyProfile } from "../../redux/modules/profile/profileSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((data) => data.profile.getProfile);
  const { isSuccess } = useSelector((state) => state.profile);
  const [editProfileModal, setEditProfileModal] = useState(false);

  useEffect(() => {
    dispatch(__getMyProfile());
  }, [dispatch, isSuccess]);

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
              profileData.profileImage === "" ||
              profileData.profileImage === undefined
                ? profile_default
                : profileData.profileImage
            }
          />
          <div>
            <span>{profileData.nickname}</span>
            <p>
              <img alt="review" src={footer} /> 발자국 평점{" "}
              {profileData.userScore}점
            </p>
          </div>
        </Box>
        <ButtonBasic width="3.5rem" height="2rem" _onClick={onClickEditHandler}>
          수정
        </ButtonBasic>
      </Profile>
    </>
  );
};

export default MyProfile;

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
    color: ${({ theme }) => theme.colors.grayMid};
  }
  div > p > img {
    width: 20px;
    margin-right: 5px;
  }
`;
const ProfileImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;
