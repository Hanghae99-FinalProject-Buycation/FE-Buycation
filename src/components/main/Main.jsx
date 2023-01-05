import React from "react";
import styled from "@emotion/styled";
import PostingList from "./PostingList";
import Map from "./Map";

const Main = () => {
  return (
    <Wrap>
      <PostingList />
      <Map />
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 354px 1fr;
  grid-template-areas: "list map";

  @media screen and (max-width: 740px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "map"
      "list";
  }
`;
