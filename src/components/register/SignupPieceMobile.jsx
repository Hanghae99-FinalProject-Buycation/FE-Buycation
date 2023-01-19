import React from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";
import { useDispatch } from "react-redux";
import {
  __getEmailValidation,
  __getNicknameDouble,
  __getEmailValidationCheck,
} from "../../redux/modules/login/signupSlice";

const SignupPieceMobile = (props) => {
  const {
    onClickPostcodeHandler,
    onChangeHandler,
    onChangeCompareHandler,
    item,
    value,
    signupForm,
    compare,
  } = props;
  const dispatch = useDispatch();
  const nicknameCheck = /^.[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z|0-9][\W|\s/g/]{2,10}$/;
  const passCheck =
    /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return (
    <StGridWrap style={{ gridTemplateAreas: item.gridTemplateAreasMobile }}>
      {/* 이메일 */}
      {item.name === "email" && (
        <>
          <span style={{ margin: "0 0 0.25rem 0" }}>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            required={item.required}
            _onChange={onChangeHandler}
            margin="0 0 0.25rem 0"
          />
          <ButtonBasic
            _onClick={() => {
              dispatch(__getEmailValidation(signupForm.email));
            }}
            margin="0 0 0.25rem 0"
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
              _onClick={() =>
                signupForm.nickname.search(nicknameCheck)
                  ? alert("2~10자, 공백 없이 한글, 영문, 숫자로만 입력해주세요")
                  : dispatch(__getNicknameDouble(signupForm.nickname))
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
            _onClick={() => {
              dispatch(
                __getEmailValidationCheck({
                  email: signupForm.email,
                  code: compare.emailValidation,
                })
              );
            }}
          >
            {item.btnText}
          </ButtonBasic>
        </>
      )}
      {/* 비밀번호 확인 */}
      {item.name === "passwordCheck" && (
        <>
          <span style={{ margin: "0 0 0.25rem 0" }}>{item.title}</span>
          <InputBasic
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            _onChange={onChangeCompareHandler}
            margin="0 0 0.25rem 0"
          />
        </>
      )}
      {/* 비밀번호 일치 알림 */}
      {item.name === "passAlert" &&
        // signupForm.password.search(passCheck) &&
        // compare.passwordCheck.search(passCheck) &&
        signupForm.password.trim() !== "" &&
        compare.passwordCheck.trim() !== "" && (
          <span style={{ fontSize: "12px", margin: "-0.5rem 0" }}>
            {signupForm.password !== compare.passwordCheck ? (
              <span style={{ color: "#f04452" }}>
                비밀번호 형식이나 내용이 일치하지 않습니다.
              </span>
            ) : (
              <span style={{ color: "#34C759" }}>비밀번호 사용 가능</span>
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
          <ButtonBasic _onClick={onClickPostcodeHandler}>
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

export default SignupPieceMobile;

const StGridWrap = styled.div`
  display: grid;
  grid-template-columns: 15.5rem 4.5rem;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.25rem 0;
  span {
    grid-area: elSpan;
  }

  input {
    height: 2.25rem;
    grid-area: elInput;
  }

  button {
    height: 2.25rem;
    width: 4rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.main};
    background: #fff;
    grid-area: elBtn;
    :hover {
      background: ${({ theme }) => theme.colors.main};
      color: #fff;
    }
  }
`;
