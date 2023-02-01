import React, { useState } from "react";
import InputCheckboxBasic from "../elements/InputCheckboxBasic";
import styled from "@emotion/styled";
import { MdKeyboardArrowDown } from "react-icons/md";

const ConditionDiv = ({ _onClick, _onChange, item, checked }) => {
  const [hide, setHide] = useState(true);
  if (item.title === "")
    return (
      <ElConditionDiv style={{ gridTemplateAreas: item.gridTemplateAreas }}>
        <hr />
      </ElConditionDiv>
    );
  if (item.id === 1)
    return (
      <ElConditionDiv style={{ gridTemplateAreas: item.gridTemplateAreas }}>
        <span>{item.title}</span>
        <input
          // checked={checked}
          type="checkbox"
          onChange={_onChange}
        />
      </ElConditionDiv>
    );
  else
    return (
      <ElConditionDiv style={{ gridTemplateAreas: item.gridTemplateAreas }}>
        <span onClick={() => setHide(!hide)}>
          {item.title}
          <MdKeyboardArrowDown />
        </span>
        {/* <InputCheckboxBasic
          // checked={checked}
          _onChange={_onChange}
          gridArea="checkbox"
        /> */}
        <input
          // checked={checked}
          type="checkbox"
          onChange={_onChange}
          // gridArea="checkbox"
        />
        <div hidden={hide}>{item.fullText}</div>
      </ElConditionDiv>
    );
};

export default ConditionDiv;

const ElConditionDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 242px auto 22px;
  grid-template-rows: 1fr auto;
  margin: 0.6rem 0;
  hr {
    width: 100%;
    border-top: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
    grid-area: elHr;
  }
  span {
    grid-area: elSpan;
  }
  input {
    grid-area: checkbox;
  }
  div {
    grid-area: moreDiv;
  }
`;
