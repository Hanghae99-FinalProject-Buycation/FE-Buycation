import React, { useState } from "react";
import styled from "@emotion/styled";
import { conditionContents } from "./conditionContents";
import { useDispatch } from "react-redux";

const SignupConditions = ({ checkAll, sendCheckAll }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const onCheckHandler = (e) => {
    setChecked(!checked);
    dispatch(sendCheckAll({ ...checkAll, checkStatus: !checked }));
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
              id="check"
              onChange={onCheckHandler}
              checked={checked}
            />
            <label htmlFor="check"></label>
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
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  input {
    display: none;
  }
  input + label {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
    border-radius: 0.25rem;
    position: relative;
  }
  input[id="check"]:checked + label::after {
    content: "✔";
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
    text-align: center;
    position: absolute;
    color: ${({ theme }) => theme.colors.main};
    left: 0;
    top: 0;
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
