import styled from "@emotion/styled";
import React from "react";
import { RiMore2Line } from "react-icons/ri";

const DetailMoreButton = ({ onClick, id, size }) => {
  return <ElBtn id={id} onClick={onClick} size={size} alt="" />;
};

export default DetailMoreButton;

const ElBtn = styled(RiMore2Line)`
  background: none;
  cursor: pointer;
`;
