import React, { useState } from "react";
import InputCheckboxBasic from "../elements/InputCheckboxBasic";
import styled from "@emotion/styled";

const ConditionDiv = ({ _onClick, _onChange, children, item, id, checked }) => {
  return (
    <ElConditionDiv id={item.num}>
      {children}
      <span onClick={_onClick}>
        내용 보기
        <InputCheckboxBasic
          id={item.num}
          checked={checked}
          background="red"
          _onChange={_onChange}
        />
      </span>
    </ElConditionDiv>
  );
};

export default ConditionDiv;

const ElConditionDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
