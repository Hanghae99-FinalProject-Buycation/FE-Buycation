import React from "react";
import styled from "@emotion/styled";
import MyProfile from "./MyProfile";
import MyStar from "./MyStar";
import MyParicipation from "./MyParicipation";
import MyCreation from "./MyCreation";

const Profile = () => {
  return (
    <Wrap>
      <Container>
        <MyProfile />
        <TagButton>
          <Button>나의 평점(3)</Button>
          <Button>참여한 공구(1)</Button>
          <Button>오픈한 공구(0)</Button>
        </TagButton>
        <div>
          <MyCreation />
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
  @media screen and (max-width: 760px) {
    padding: 2.2rem 0;
  }
`;

const Container = styled.div`
  /* border: 1px solid #888; */
  width: 100%;
  display: grid;
  grid-template-rows: 100px auto;
  @media screen and (max-width: 760px) {
    grid-template-rows: 1fr;
  }
`;

const TagButton = styled.button`
  margin-top: 50px;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Button = styled.button`
  border-bottom: 1px solid #888;
  margin: 0;
  padding-bottom: 20px;
  width: 100%;
  height: 3rem;
  font-size: 14px;
  font-weight: 700;
  background: white;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid #888;
  }
`;
