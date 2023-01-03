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
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
  });

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginValue({ ...loginValue, [name]: value });

    const isValidList = {
      email: "isEmail",
      password: "isPassword",
    };
    setIsValid({
      ...isValid,
      [isValidList[name]]: value ? false : true,
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
      setIsValid({ ...isValid, isEmail: true });
    } else if (loginValue.password === "") {
      setIsValid({ ...isValid, isPassword: true });
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
    <section>
      <p>환영합니다! 바이케이션을 시작하고 저렴하고 풍족한 삶을 누리세요.</p>

      <Form onSubmit={onSubmitLoginValueHandler}>
        <InputBox>
          <InputBasic
            name="email"
            type="text"
            placeholder="아이디 (이메일)"
            autoComplete="off"
            value={loginValue.email}
            _onChange={onChangeInputHandler}
            isValid={isValid.isEmail}
          />
          <InputBasic
            name="password"
            type="password"
            placeholder="비밀번호"
            value={loginValue.password}
            _onChange={onChangeInputHandler}
            isValid={isValid.isPassword}
          />
        </InputBox>

        <LinkDiv>
          <Link to="/signup">회원가입</Link>
        </LinkDiv>

        <ButtonBasic>로그인</ButtonBasic>
      </Form>
    </section>
  );
};

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
