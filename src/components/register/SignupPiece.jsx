import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";
import {
  __getEmailValidation,
  __getNicknameDouble,
  __getEmailValidationCheck,
} from "../../redux/modules/login/signupSlice";
import useWindowResize from "../../hooks/useWindowResize";
import { emailCheck, passCheck, passValidate } from "./checkSignup";

const SignupPiece = (props) => {
  const {
    onClickPostcodeHandler,
    onChangeHandler,
    onChangeCompareHandler,
    item,
    value,
    signupForm,
    compare,
    checkAll,
    sendCheckAll,
  } = props;
  const dispatch = useDispatch();

  const { innerWidth } = useWindowResize();
  const [click, setClick] = useState(false);
  const onClickEmailValidationHandler = () => {
    if (!emailCheck.test(signupForm.email)) {
      Swal.fire({
        text: "이메일 형식을 지켜주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      });
    } else {
      dispatch(__getEmailValidation(signupForm.email)).then((res) => {
        setClick(true);
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#FF5A5F",
          confirmButtonText: "확인",
        });
        dispatch(sendCheckAll({ ...checkAll, email: true }));
      });
    }
  };
  const onClickEmailValidationCheckHandler = () => {
    if (compare.emailValidation.trim() === "") {
      Swal.fire({
        text: "인증번호를 입력해주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      });
    } else {
      dispatch(
        __getEmailValidationCheck({
          email: signupForm.email,
          code: compare.emailValidation,
        })
      ).then((res) => {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#FF5A5F",
          confirmButtonText: "확인",
        });
        dispatch(sendCheckAll({ ...checkAll, validation: true }));
      });
    }
  };

  const onClickNicknameHandler = () => {
    if (signupForm.nickname.trim() !== "") {
      dispatch(__getNicknameDouble(signupForm.nickname)).then((res) => {
        Swal.fire({
          text: res.payload,
          padding: "1rem",
          confirmButtonColor: "#FF5A5F",
          confirmButtonText: "확인",
        });
        dispatch(sendCheckAll({ ...checkAll, nickname: true }));
      });
    }
  };

  useEffect(() => {
    sendCheckAll();
  }, [dispatch]);

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
            _onChange={onChangeHandler}
            margin="0 0 -0.5rem 0"
          />
          {!click ? (
            <ButtonBasic
              gridArea="elBtn"
              _onClick={onClickEmailValidationHandler}
              margin="0 0 -0.5rem 0"
            >
              {item.btnText}
            </ButtonBasic>
          ) : (
            <ButtonBasic
              className="complete"
              gridArea="elBtn"
              margin="0 0 -0.5rem 0"
            >
              {item.btnTextNext}
            </ButtonBasic>
          )}
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
    props.className ? "minmax(auto, 15.5rem) 4.5rem" : "8rem 15.5rem 4.5rem"};
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

  .complete {
    border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
    background: ${({ theme }) => theme.colors.grayMid};
    color: #fff;
    :hover {
      background: ${({ theme }) => theme.colors.grayMid};
      color: #fff;
      cursor: default;
    }
    /* background: #fff; */
  }
`;
