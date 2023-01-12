import React, { useState } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import EditProfileModal from "./modal/EditProfileModal";
import footer from "../../assets/footer.svg";
//더미 데이터
import dummy from "../../db/profileDB.json";

const MyProfile = () => {
  console.log(dummy);
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
          <Image src="https://cdn.imweb.me/upload/S2020020306340f9e8280d/cfd0a45993a4a.jpg" />
          <div>
            <span>하얀천사</span>
            <p>
              <img src={footer} /> 발자국 점수 4점
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
    margin-right: 5px;
  }
`;
const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 50%;
`;
