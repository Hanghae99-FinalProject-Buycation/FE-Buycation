import React, { useState } from "react";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import SignupConditions from "../signup/SignupConditions";
import { FormContents } from "./FormContents";
import Postcode from "../postcode/Postcode";
import { useDispatch } from "react-redux";
import { __postSignup } from "../../redux/modules/login/signupSlice";

const Signup = () => {
  // 이메일 인증 버튼
  // 닉네임 중복 체크 버튼
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    addressNum: "",
    addressDetail: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(__postSignup(signupForm));
    console.log(signupForm);
    //post 요청
  };
  /*   const testt = async (content) => {
    // const data = axios.get(`${baseURL}`);
    const { data } = await axios.post(`http://13.57.186.183/`);
    // console.log(baseURL);
    console.log(data);
  }; */

  // testt();
  return (
    <StSignupForm>
      <h1>회원가입</h1>
      <h2>내 정보 입력</h2>

      <StSignupWrap
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StRowEmail>
          <ElSpan>- 이메일*</ElSpan>
          <InputBasic
            gridArea="elInput"
            type="email"
            name="email"
            placeholder="이메일"
            _onChange={onChangeHandler}
            required
          />
          <ButtonBasic gridArea="elBtn">이메일 인증</ButtonBasic>
        </StRowEmail>

        <StRowResend>
          <div>
            <span>인증번호를 받지 못하셨나요? </span>
            <span onClick={() => console.log("인증 재전송")}>재전송</span>
          </div>
        </StRowResend>
        <StRowEmailCheck>
          <ElSpan>-인증번호 확인*</ElSpan>
          <InputBasic gridArea="elInput" placeholder="제한시간 10분" />
          <ButtonBasic gridArea="elConfirmBtn">확인</ButtonBasic>
          <ButtonBasic gridArea="elReBtn">재전송</ButtonBasic>
        </StRowEmailCheck>
        <StRowNickname>
          <ElSpan>-닉네임*</ElSpan>
          <InputBasic
            gridArea="elInput"
            type="text"
            name="nickname"
            placeholder="공백없이 한글, 영문, 숫자만 입력 가능"
            _onChange={onChangeHandler}
            required
          />
          <ButtonBasic gridArea="elBtn">중복 체크</ButtonBasic>
        </StRowNickname>
        <StRowPassword>
          <ElSpan>-비밀번호*</ElSpan>
          <InputBasic
            gridArea="elInput"
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            _onChange={onChangeHandler}
          />
        </StRowPassword>
        <StRowPasswordCheck>
          <ElSpan>-비밀번호 확인*</ElSpan>
          <InputBasic
            gridArea="elInput"
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            required
            _onChange={onChangeHandler}
          />
        </StRowPasswordCheck>
        <StRowAddressNum>
          <ElSpan>-주소</ElSpan>
          <InputBasic
            gridArea="elInput"
            name="addressNum"
            placeholder="우편번호"
            _onChange={onChangeHandler}
          />
          <ButtonBasic>주소 찾기</ButtonBasic>
        </StRowAddressNum>
        <StRowAddressDetail>
          <InputBasic
            gridArea="elInput"
            name="addressDetail"
            placeholder="주소(선택사항)"
            _onChange={onChangeHandler}
          />
        </StRowAddressDetail>
        {/* form 다 차지 않으면 disabled */}
      </StSignupWrap>
      <SignupConditions />
      {/* <Postcode /> */}
      <ButtonBasic
        width="15rem"
        gridArea="elBtn"
        type="submit"
        _onClick={(data) => {
          signupHandler(data);
        }}
      >
        회원가입
      </ButtonBasic>
    </StSignupForm>
  );
};

export default Signup;

const StSignupForm = styled.form`
  width: 100vw;
  height: 98vh;
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-block: 2rem;
    line-height: 2.5rem;
  }
  h2 {
    // 좌정렬 해야됨
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    margin-block: 1rem;
  }
`;

const StSignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(94% - 4.5rem);
  max-width: 50rem;
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding: 1.875rem 3.125rem;
  input {
    background: white;
    border: 1px solid #d9d9d9;
  }
  button {
    background: #d9d9d9;
  }
`;

// const TestDiv = styled.div`
//   ${({ theme }) => theme.signup.divGrid}
// `;

const StRowEmail = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elInput elBtn";
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const StRowResend = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: ". elSpan elSpan .";
  margin: 0.5rem;
  div {
    grid-area: elSpan;
  }
  span + span {
    text-decoration: underline;
  }
`;

const StRowEmailCheck = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elConfirmBtn elReBtn";
`;

const StRowNickname = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elInput elBtn";
`;

const StRowPassword = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elInput .";
`;

const StRowPasswordCheck = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elInput .";
`;

const StRowAddressNum = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: "elSpan elInput elInput elBtn.";
`;

const StRowAddressDetail = styled.div`
  ${({ theme }) => theme.signup.divGrid}
  grid-template-areas: ". elInput elInput elInput";
`;

const ElSpan = styled.span`
  grid-area: elSpan;
`;
