import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import SignupConditions from "../register/SignupConditions";
import Postcode from "../postcode/Postcode";
import { signupContents } from "./signupContents";
import { __postSignup } from "../../redux/modules/login/signupSlice";
import { sendRegisterModalStatus } from "../../redux/modules/postcode/postcodeModalSlice";
import usePostcode from "../../hooks/usePostcode";
import SignupPiece from "./SignupPiece";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    nickname: "",
    address: "",
    addressDetail: "", //삭제 예정
  });
  const [compare, setCompare] = useState({
    passwordCheck: "",
    emailValidation: "",
  });

  const emailCode = useSelector((state) => state.postSignup.getEmailValidation);
  const postcodeModalStatus = useSelector(
    (state) => state.postcodeModal.openRegisterModal
  );
  const { address } = usePostcode();

  const onClickPostcodeHandler = () => {
    dispatch(sendRegisterModalStatus(true));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  const onChangeCompareHandler = (e) => {
    const { name, value } = e.target;
    setCompare({ ...compare, [name]: value });
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (emailCode !== compare.emailValidation) {
      alert("인증번호를 확인해주세요");
    } else {
      dispatch(__postSignup(signupForm));
      // alert("회원가입 성공");
      // navigate("/login");
    }
  };

  // d.evryan.kwon@gmail.com
  useEffect(() => {}, [dispatch]);
  return (
    <StSignupForm
      onSubmit={(e) => {
        e.preventDefault();
        signupHandler(e);
      }}
    >
      <StTitleWrap>
        <h1>회원가입</h1>
        <h2>내 정보 입력</h2>
      </StTitleWrap>
      <StSignupWrap>
        <Postcode hidden={!postcodeModalStatus} />
        {signupContents.map((item) => (
          <SignupPiece
            key={item.id}
            item={item}
            onChangeHandler={onChangeHandler}
            onChangeCompareHandler={onChangeCompareHandler}
            onClickPostcodeHandler={onClickPostcodeHandler}
            signupForm={signupForm}
            compare={compare}
            emailCode={emailCode}
            value={address}
          />
        ))}
      </StSignupWrap>
      {/* form 다 차지 않으면 disabled */}
      <SignupConditions />
      {/* <Postcode /> */}
      <ButtonBasic width="15rem" type="submit">
        회원가입
      </ButtonBasic>
    </StSignupForm>
  );
};

export default Signup;

const StSignupForm = styled.form`
  width: 100vw;
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
`;

const StTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 57.5rem;
  width: 100%;
  h1 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-block: 2rem;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    margin-block: 1rem;
  }
`;

const StSignupWrap = styled.div`
  width: 100%;
  max-width: 57.5rem;
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 0.5rem;
  padding: 1.875rem 3.125rem;
  input {
    background: white;
    border: 1px solid #d9d9d9;
  }
`;
