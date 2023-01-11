import React, { useState } from "react";
import styled from "@emotion/styled";
import MyProfile from "./MyProfile";
import MyStar from "./MyStar";
import MyParicipation from "./MyParicipation";
import MyCreation from "./MyCreation";

const Profile = () => {
  const [tagBtnValue, setTagBtnValue] = useState("default");

  const onClickStarBtnHandler = (e) => {
    setTagBtnValue("default");
  };
  const onClickGuestBtnHandler = (e) => {
    setTagBtnValue("guest");
  };
  const onClickOwnerBtnHandler = (e) => {
    setTagBtnValue("owner");
  };

  return (
    <Wrap>
      <Container>
        <MyProfile />
        <TagBtnDiv>
          <Button onClick={onClickStarBtnHandler}>나의 평점(3)</Button>
          <Button onClick={onClickGuestBtnHandler}>참여한 공구(1)</Button>
          <Button onClick={onClickOwnerBtnHandler}>오픈한 공구(0)</Button>
        </TagBtnDiv>
        <div>
          {tagBtnValue === "guest" ? (
            <MyParicipation />
          ) : tagBtnValue === "owner" ? (
            <MyCreation />
          ) : (
            <MyStar />
          )}
        </div>
      </Container>
    </Wrap>
  );
};

export default Profile;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 6rem 16rem;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 2.2rem 0;
    display: block;
  }
`;
const Container = styled.div`
  width: 920px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const TagBtnDiv = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 768px) {
    margin-top: 2.7rem;
  }
`;
const Button = styled.button`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  padding: 0 0 20px 0;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  background: white;
  cursor: pointer;
  :focus {
    border-bottom: 2px solid ${({ theme }) => theme.colors.main};
  }
`;
