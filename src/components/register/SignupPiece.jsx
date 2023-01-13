import React, { useEffect } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";
import { useDispatch, useSelector } from "react-redux";
import {
  __getEmailValidation,
  __getNicknameDouble,
  getEmailValidation,
} from "../../redux/modules/login/signupSlice";

const SignupPiece = (props) => {
  const {
    onClickPostcodeHandler,
    onChangeHandler,
    onChangeCompareHandler,
    item,
    value,
    signupForm,
    compare,
    emailCode,
  } = props;
  const dispatch = useDispatch();
  /*   useEffect(() => {
    dispatch(__getEmailValidation);
  }, [dispatch]); */
  return (
    <StGridWrap style={{ gridTemplateAreas: item.gridTemplateAreas }}>
      {/* 이메일 */}
      {item.name === "email" && (
        <>
          <span style={{ margin: "0 0 -0.5rem 0" }}>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            required={item.required}
            _onChange={onChangeHandler}
            margin="0 0 -0.5rem 0"
          />
          <ButtonBasic
            gridArea="elBtn"
            _onClick={() => {
              dispatch(__getEmailValidation(signupForm.email));
            }}
            margin="0 0 -0.5rem 0"
          >
            {item.btnText}
          </ButtonBasic>
        </>
      )}
      {/* 닉네임, 비밀번호 */}
      {(item.name === "nickname" || item.name === "password") && (
        <>
          <span>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            required={item.required}
            _onChange={onChangeHandler}
          />
          {item.name === "nickname" && (
            <ButtonBasic
              gridArea="elBtn"
              _onClick={() =>
                dispatch(__getNicknameDouble(signupForm.nickname))
              }
            >
              {item.btnText}
            </ButtonBasic>
          )}
        </>
      )}
      {/* 인증번호 재전송 */}
      {item.name === "resend" && (
        <span style={{ fontSize: "12px", margin: "-0.5rem 0" }}>
          {item.title}{" "}
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => {
              dispatch(__getEmailValidation(signupForm.email));
            }}
          >
            {item.titleTwo}
          </span>
        </span>
      )}

      {/* 인증번호 확인 */}
      {item.name === "emailValidation" && (
        <>
          <span>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            _onChange={onChangeCompareHandler}
          />
          <ButtonBasic
            gridArea="elBtn"
            _onClick={() => {
              emailCode === compare.emailValidation
                ? alert("인증번호 확인 완료")
                : alert("인증번호가 일치하지 않습니다.");
            }}
          >
            {item.btnText}
          </ButtonBasic>
        </>
      )}
      {/* 비밀번호 확인 */}
      {item.name === "passwordCheck" && (
        <>
          <span style={{ margin: "0 0 -0.5rem 0" }}>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            _onChange={onChangeCompareHandler}
            margin="0 0 -0.5rem 0"
          />
        </>
      )}
      {/* 비밀번호 일치 알림 */}
      {item.name === "passAlert" &&
        signupForm.password.trim() !== "" &&
        compare.passwordCheck.trim() !== "" && (
          <span style={{ fontSize: "12px", margin: "-0.5rem 0" }}>
            {signupForm.password !== compare.passwordCheck ? (
              <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다</span>
            ) : (
              "비밀번호 일치"
            )}
          </span>
        )}

      {/* 주소 */}
      {item.name === "address" && (
        <>
          <span>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            value={value}
            _onChange={onChangeHandler}
          />
          <ButtonBasic gridArea="elBtn" _onClick={onClickPostcodeHandler}>
            {item.btnText}
          </ButtonBasic>
        </>
      )}
      {/* 주소 안내 */}
      {item.name === "addressNotice" && (
        <span
          style={{ fontSize: "12px", margin: "-0.5rem 0", color: "#adadad" }}
        >
          {item.title}
        </span>
      )}
    </StGridWrap>
  );
};

export default SignupPiece;

const StGridWrap = styled.div`
  display: grid;
  grid-template-columns: 6.875rem 15.5rem 4.5rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
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
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.main};
    :hover {
      background: ${({ theme }) => theme.colors.main};
      color: #fff;
    }
    background: #fff;
  }
`;
