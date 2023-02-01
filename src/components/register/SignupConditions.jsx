import React, { useState } from "react";
import styled from "@emotion/styled";
import { conditionContents } from "./conditionContents";

const SignupConditions = () => {
  const [checked, setChecked] = useState(false);
  const onCheckHandler = (e) => {
    setChecked(!checked);
  };
  return (
    <>
      <ElH2>
        <h2>약관 동의</h2>
      </ElH2>
      <StConditionsForm>
        <StConditionDiv>
          <span>
            {conditionContents?.title}{" "}
            <input
              type="checkbox"
              onChange={onCheckHandler}
              checked={checked}
            />
          </span>
          <div>
            <p>{conditionContents?.fullText}</p>
          </div>
        </StConditionDiv>
      </StConditionsForm>
    </>
  );
};

export default SignupConditions;

const StConditionsForm = styled.div`
  width: 100%;
  max-width: 42.5rem;
  border-top: 0.2rem solid ${({ theme }) => theme.colors.main};
  padding: 1.875rem 3.125rem;
  margin-bottom: 2.25rem;

  @media screen and (max-width: 23.5rem) {
    width: calc(100% - 3.125rem);
    padding: 1.875rem 1rem;
  }
`;

const ElH2 = styled.div`
  width: 100%;
  max-width: 57.5rem;
  ${({ theme }) => theme.common.flexCenter}
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  margin: 2rem;
`;

const StConditionDiv = styled.div`
  width: 100%;
  span {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  input {
    width: 1rem;
    height: 1rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
    border-radius: 0.25rem;
    :checked {
      background: ${({ theme }) => theme.colors.main};
    }
  }
  div {
    width: 100%;
    height: 12rem;
    padding: 1.25rem 3.125rem;
    overflow-y: scroll;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
    border-radius: 0.5rem;
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 1rem;
    white-space: pre-wrap;
  }
`;
