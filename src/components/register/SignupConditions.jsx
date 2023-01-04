import React, { useState } from "react";
import styled from "@emotion/styled";
import InputCheckboxBasic from "../elements/InputCheckboxBasic";
import ConditionDiv from "./ConditionDiv";
import { ConditionContent } from "./ConditionContent";

const SignupConditions = () => {
  const [checked, setChecked] = useState(false);
  const onCheckHandler = (e) => {
    setChecked(!checked);
    console.log(checked);
  };
  return (
    <>
      <h2>약관 동의</h2>
      <StConditionsForm>
        {ConditionContent.map((item) => (
          <ConditionDiv
            key={item.num}
            id={item.num}
            item={item}
            _onChange={(e) => onCheckHandler(e)}
            _onClick={item.clickEvent}
            // checked={checked} 이거 들어가면 전체 적용...어떻게 하지
          >
            {item.title}
          </ConditionDiv>
        ))}
      </StConditionsForm>
    </>
  );
};

export default SignupConditions;

const StConditionsForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(94% - 4.5rem);
  max-width: 50rem;
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding: 1.875rem 3.125rem;
  input {
    background: white;
    border: 1px solid #d9d9d9;
  }
  button {
    background: #d9d9d9;
  }
`;

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
