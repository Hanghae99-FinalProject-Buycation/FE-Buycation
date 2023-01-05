import React, { useState } from "react";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __postSignin } from "../../redux/modules/login/signinSlice";
import { CLIENT_ID, REDIRECT_URI } from "../../core/env";

const SignIn = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [inValid, setInValid] = useState({
    isEmail: false,
    isPassword: false,
  });

  //kakao
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}
    &redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClickKakaoHandler = (event) => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginValue({ ...loginValue, [name]: value });

    const inValidList = {
      email: "isEmail",
      password: "isPassword",
    };
    setInValid({
      ...inValid,
      [inValidList[name]]: value ? false : true,
    });
  };

  const onSubmitLoginValueHandler = (event) => {
    event.preventDefault();
    const newLoginValue = {
      email: loginValue.email,
      password: loginValue.password,
    };

    if (loginValue.email === "") {
      setInValid({ ...inValid, isEmail: true });
    } else if (loginValue.password === "") {
      setInValid({ ...inValid, isPassword: true });
    } else {
      dispatch(__postSignin(newLoginValue));
      //navigate("/")
    }
  };

  return (
    <Wrap>
      <Form onSubmit={onSubmitLoginValueHandler}>
        <p>
          환영합니다! 바이케이션을 시작하고 <br />
          저렴하고 풍족한 삶을 누리세요.
        </p>
        <InputBox>
          <InputBasic
            name="email"
            type="text"
            placeholder="아이디 (이메일)"
            autoComplete="off"
            value={loginValue.email}
            _onChange={onChangeInputHandler}
            inValid={inValid.isEmail}
          />
          <InputBasic
            name="password"
            type="password"
            placeholder="비밀번호"
            value={loginValue.password}
            _onChange={onChangeInputHandler}
            inValid={inValid.isPassword}
          />
        </InputBox>

        <LinkDiv>
          <Link to="/signup">회원가입</Link>
        </LinkDiv>

        <ButtonBasic>로그인</ButtonBasic>
        <ButtonBasic
          type="button"
          background="#FFE812"
          onClick={onClickKakaoHandler}
        >
          카카오 계정으로 로그인 하기
        </ButtonBasic>
      </Form>
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: end;
  & > a {
    color: black;
  }
`;
