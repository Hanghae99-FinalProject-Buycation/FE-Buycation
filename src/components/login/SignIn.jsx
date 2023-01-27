import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import { useDispatch, useSelector } from "react-redux";
import {
  __postSignin,
  __statusCode,
  __isSuccess,
} from "../../redux/modules/login/signinSlice";
import { CLIENT_ID, REDIRECT_URI } from "../../core/env";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postSigninData = useSelector((data) => data.postSignin);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [inValid, setInValid] = useState({
    isEmail: false,
    isPassword: false,
  });

  useEffect(() => {
    if (postSigninData.isSuccess) {
      Swal.fire({
        text: postSigninData.alertMsg,
        confirmButtonText: "확인",
        confirmButtonColor: "#FF5A5F",
      }).then(() => {
        dispatch(__isSuccess(false));
        if (postSigninData.statusCode) {
          navigate("/");
          dispatch(__statusCode(false));
        }
      });
    }
  }, [
    dispatch,
    postSigninData.isSuccess,
    postSigninData.alertMsg,
    postSigninData.statusCode,
    navigate,
  ]);

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
            height="3rem"
            background="#EDEDED"
            name="email"
            type="text"
            placeholder="아이디 (이메일)"
            autoComplete="off"
            value={loginValue.email}
            _onChange={onChangeInputHandler}
            inValid={inValid.isEmail}
          />
          <InputBasic
            height="3rem"
            background="#EDEDED"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={loginValue.password}
            _onChange={onChangeInputHandler}
            inValid={inValid.isPassword}
          />
        </InputBox>
        <ButtonBasic type="submit">로그인</ButtonBasic>
        <OrTxt>or</OrTxt>
        <ButtonBasic
          background="#FFE812"
          color="#000000"
          _onClick={onClickKakaoHandler}
        >
          카카오 계정으로 로그인 하기
        </ButtonBasic>
        <LinkDiv>
          <Link to="/signup">
            바이케이션이 처음 이신가요? <span>회원가입</span>
          </Link>
        </LinkDiv>
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
  margin-top: 7.5rem;
  @media screen and (max-width: 768px) {
    margin-top: 5.5rem;
    /* align-items: center; */
  }
`;

const Form = styled.form`
  width: 25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  & > p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.18rem;
    line-height: 28px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OrTxt = styled.span`
  color: ${({ theme }) => theme.colors.grayStrong};
  text-align: center;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    top: 7px;
    left: 0;
    width: 44%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grayStrong};
  }
  ::after {
    content: "";
    position: absolute;
    top: 7px;
    right: 0;
    width: 44%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grayStrong};
  }
`;

const LinkDiv = styled.div`
  text-align: center;
  a {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.black};
  }
  span {
    font-weight: 600;
  }
`;
