import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";
import {
  __getEmailValidation,
  __getNicknameDouble,
  __getEmailValidationCheck,
  __isSuccess,
} from "../../redux/modules/login/signupSlice";
import useWindowResize from "../../hooks/useWindowResize";
import {
  emailCheck,
  emailForm,
  nicknameCheck,
  passCheck,
  passValidate,
} from "./checkSignup";

const SignupPiece = (props) => {
  const {
    onClickPostcodeHandler,
    onChangeHandler,
    onChangeCompareHandler,
    item,
    value,
    signupForm,
    compare,
    // getMsg,
  } = props;
  const dispatch = useDispatch();

  const isSuccess = useSelector((state) => state.postSignup.isSuccess);

  const { innerWidth } = useWindowResize();
  const onClickEmailValidationHandler = () => {
    if (!emailCheck.test(signupForm.email)) {
      alert("이메일 형식을 지켜주세요");
    } else {
      dispatch(__getEmailValidation(signupForm.email)).then((res) =>
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#FF5A5F",
        })
      );
    }
  };
  const onClickEmailValidationCheckHandler = () => {
    dispatch(
      __getEmailValidationCheck({
        email: signupForm.email,
        code: compare.emailValidation,
      })
    ).then((res) =>
      Swal.fire({
        text: res.payload.msg,
        confirmButtonColor: "#FF5A5F",
      })
    );
  };

  const onClickNicknameHandler = () => {
    if (
      // !nicknameCheck.test(signupForm.nickname) ||
      signupForm.nickname.trim() !== ""
    ) {
      /* {
      Swal.fire({
        text: "2~10자, 공백 없이 한글, 영문, 숫자로만 입력해주세요.",
        padding: "1rem",
        confirmButtonColor: "#FF5A5F",
      });
    } else  */
      dispatch(__getNicknameDouble(signupForm.nickname)).then((res) =>
        Swal.fire({
          text: res.payload,
          padding: "1rem",
          confirmButtonColor: "#FF5A5F",
        })
      );
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <StGridWrap
      style={{
        gridTemplateAreas:
          innerWidth > 768
            ? item.gridTemplateAreas
            : item.gridTemplateAreasMobile,
      }}
      className={innerWidth > 768 ? "" : "mobile"}
    >
      {/* 이메일 */}
      {item.name === "email" && (
        <>
          <span>{item.title}</span>
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
            _onClick={onClickEmailValidationHandler}
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
            <ButtonBasic gridArea="elBtn" _onClick={onClickNicknameHandler}>
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
            onClick={onClickEmailValidationHandler}
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
            _onClick={onClickEmailValidationCheckHandler}
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
            {/* {signupForm.password !== compare.passwordCheck ? ( */}
            <span
              style={{
                color:
                  signupForm.password !== compare.passwordCheck ||
                  !passCheck.test(signupForm.password)
                    ? "#f04452"
                    : "#34C759",
              }}
            >
              {passValidate(signupForm.password, compare.passwordCheck)}
            </span>
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
  grid-template-columns: ${(props) =>
    props.className ? "15.5rem 4.5rem" : "8rem 15.5rem 4.5rem"};
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  span {
    grid-area: elSpan;
  }

  input {
    height: 2.25rem;
    grid-area: elInput;
  }

  button {
    height: 2.25rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.main};
    :hover {
      background: ${({ theme }) => theme.colors.main};
      color: #fff;
    }
    background: #fff;
  }
`;
