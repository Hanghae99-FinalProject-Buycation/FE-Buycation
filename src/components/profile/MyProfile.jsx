import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import EditProfileModal from "./modal/EditProfileModal";
import footer from "../../assets/footer.svg";
import profile_default from "../../assets/profile_default.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getProfile } from "../../redux/modules/profile/profileSlice";
//더미 데이터
//import dummy from "../../db/profileDB.json";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const profileData = useSelector((data) => data.profile.getProfile);

  useEffect(() => {
    dispatch(__getProfile());
  }, [dispatch]);

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
              profileData.profileImage === ""
                ? profile_default
                : profileData.profileImage
            }
          />
          <div>
            <span>{profileData.nickname}</span>
            <p>
              <img alt="review" src={footer} /> 발자국 평균 점수{" "}
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
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.grayMid};
  }
  div > p > img {
    margin: 8px 5px 0 0;
  }
`;
const ProfileImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;
