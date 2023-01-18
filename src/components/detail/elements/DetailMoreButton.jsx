import styled from "@emotion/styled";
import React from "react";
import { RiMore2Line } from "react-icons/ri";

const DetailMoreButton = ({ onClick, id }) => {
  return <ElBtn id={id} onClick={onClick} size="1.875rem" alt="" />;
};

export default DetailMoreButton;

const ElBtn = styled(RiMore2Line)`
  background: none;
  cursor: pointer;
`;
