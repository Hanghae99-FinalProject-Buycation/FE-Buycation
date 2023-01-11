import React, { useState } from "react";
import styled from "@emotion/styled";
import InputCheckboxBasic from "../elements/InputCheckboxBasic";
import ConditionDiv from "./ConditionDiv";
import { conditionContents } from "./conditionContents";

const SignupConditions = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const onCheckHandler = (e) => {
    setCheckedAll(!setCheckedAll);
  };
  return (
    <>
      <ElH2>
        <h2>약관 동의</h2>
      </ElH2>
      <StConditionsForm>
        {conditionContents.map((item) => (
          <ConditionDiv
            key={item.id}
            id={item.id}
            item={item}
            _onChange={(e) => onCheckHandler(e)}
            _onClick={item.clickEvent}
            // checked={checkedAll} // 이거 들어가면 전체 적용...어떻게 하지
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
  width: 100%;
  max-width: 57.5rem;
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 0.5rem;
  padding: 1.875rem 3.125rem;
  margin-bottom: 2.25rem;
`;

const ElH2 = styled.div`
  width: 100%;
  max-width: 57.5rem;
  display: flex;
  align-items: start;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  margin: 1.5rem;
`;
