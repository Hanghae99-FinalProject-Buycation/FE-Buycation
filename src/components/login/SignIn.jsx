import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import { sign_in } from "../../core/axios";

const SignIn = () => {
  // const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [inValid, setInValid] = useState({
    isEmail: false,
    isPassword: false,
  });

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
  console.log("onChange 인풋 값 :", loginValue);

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
      console.log("확인");
      sign_in(newLoginValue).then((res) => {
        alert(res.data.msg);
        //localStorage.setItem("id", res.headers.authorization);
        //navigate("/")
      });
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
        <ButtonBasic type="button" background="#FFE812">
          카카오 계정으로 로그인 하기
        </ButtonBasic>
      </Form>
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  width: 100vw;
  height: 88vh;
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
