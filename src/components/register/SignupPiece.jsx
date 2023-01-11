import React from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";

const SignupPiece = (props) => {
  const { onClickPostcodeHandler, onChangeHandler, item, value } = props;
  if (item.name === "address")
    return (
      <StGridWrap style={{ gridTemplateAreas: item.gridTemplateAreas }}>
        <span>{item.title}</span>
        {item.placeholder && (
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            required={item.required}
            value={value}
            _onChange={onChangeHandler}
          />
        )}
        <ButtonBasic gridArea="elBtn" _onClick={onClickPostcodeHandler}>
          {item.btnText}
        </ButtonBasic>
      </StGridWrap>
    );
  else
    return (
      <StGridWrap style={{ gridTemplateAreas: item.gridTemplateAreas }}>
        <span>{item.title}</span>
        {item.placeholder && (
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            required={item.required}
            _onChange={onChangeHandler}
          />
        )}
        {item.name === "email" && (
          <ButtonBasic gridArea="elBtn" _onClick={() => console.log("email")}>
            {item.btnText}
          </ButtonBasic>
        )}
        {item.name === "auth" && (
          <ButtonBasic gridArea="elBtn" _onClick={() => console.log("auth")}>
            {item.btnText}
          </ButtonBasic>
        )}
        {item.name === "nickname" && (
          <ButtonBasic
            gridArea="elBtn"
            _onClick={() => console.log("nickname")}
          >
            {item.btnText}
          </ButtonBasic>
        )}
      </StGridWrap>
    );
};

export default SignupPiece;

const StGridWrap = styled.div`
  display: grid;
  grid-template-columns: 6.875rem 15.5rem 3.375rem 1.5rem;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem;
  span {
    grid-area: elSpan;
  }

  input {
    height: 1.875rem;
    grid-area: elInput;
  }

  button {
    height: 1.875rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.main};
    background: #fff;
    color: ${({ theme }) => theme.colors.main};
    :hover {
      background: ${({ theme }) => theme.colors.main};
      color: #fff;
    }
  }
`;
