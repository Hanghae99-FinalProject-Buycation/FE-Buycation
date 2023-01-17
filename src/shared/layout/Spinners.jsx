import React from "react";
import styled from "@emotion/styled";
import { FadeLoader } from "react-spinners";

export const Spinners = () => {
  return (
    <Container>
      <Box>
        <FadeLoader color="#FF5A5F" loading={true} />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
