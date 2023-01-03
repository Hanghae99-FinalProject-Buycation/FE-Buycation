import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";

const SignIn = () => {
  // const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    email: "",
    pw: "",
  });

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginValue({ ...loginValue, [name]: value });
  };
  console.log("onChange :", loginValue);

  const onSubmitLoginValueHandler = (event) => {
    event.preventDefault();
    if (loginValue.email === "") {
      setLoginValue({ ...loginValue, isValidEmail: false });
    } else if (loginValue.pw === "") {
      setLoginValue({ ...loginValue, isValidPW: false });
    } else {
      const newLoginValue = {
        email: loginValue.email,
        password: loginValue.pw,
      };
      console.log("확인");
    }
  };

  return (
    <section>
      <p>환영합니다! 바이케이션을 시작하고 저렴하고 풍족한 삶을 누리세요.</p>

      <form onSubmit={onSubmitLoginValueHandler}>
        <div>
          <InputBasic
            name="email"
            type="email"
            placeholder="아이디 (이메일)"
            autoComplete="off"
            value={loginValue.email}
            _onChange={onChangeInputHandler}
          />
          <InputBasic
            name="pw"
            type="password"
            placeholder="비밀번호"
            value={loginValue.pw}
            _onChange={onChangeInputHandler}
          />
        </div>

        <LinkDiv type="button">
          <Link to="/signup">회원가입</Link>
        </LinkDiv>

        <ButtonBasic>로그인</ButtonBasic>
      </form>
    </section>
  );
};

export default SignIn;

const LinkDiv = styled.div`
  display: flex;
  justify-content: end;
  & > a {
    color: black;
  }
`;
