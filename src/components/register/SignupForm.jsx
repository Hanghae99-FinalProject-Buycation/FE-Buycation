import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import ButtonBasic from "../elements/ButtonBasic";
import SignupConditions from "../register/SignupConditions";
import Postcode from "../postcode/Postcode";
import { signupContents } from "./signupContents";
import {
  sendCheckAll,
  __postSignup,
} from "../../redux/modules/login/signupSlice";
import { sendRegisterModalStatus } from "../../redux/modules/postcode/postcodeModalSlice";
import usePostcode from "../../hooks/usePostcode";
import SignupPiece from "./SignupPiece";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkAll = useSelector((state) => state.postSignup.checkAll);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    nickname: "",
    address: "",
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
    if (
      signupForm.email.trim() === "" ||
      signupForm.nickname.trim() === "" ||
      compare.emailValidation.trim() === "" ||
      signupForm.password.trim() === "" ||
      compare.passwordCheck.trim() === ""
    ) {
      Swal.fire({
        text: "필수 기입란을 모두 채워주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      });
    } else if (!checkAll.checkStatus) {
      Swal.fire({
        text: "약관에 동의해주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      });
    } else if (!checkAll.email || !checkAll.validation || !checkAll.nickname) {
      Swal.fire({
        text: "확인 절차를 진행해주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      });
    } else {
      e.preventDefault();
      dispatch(__postSignup(signupForm)).then((res) => {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#FF5A5F",
        });
        if (res.payload.statusCode !== 200) {
          return;
        } else navigate("/login");
      });
    }
  };
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
        {postcodeModalStatus && <Postcode />}
        {signupContents.map((item) => (
          <SignupPiece
            key={item.id}
            item={item}
            onChangeHandler={onChangeHandler}
            onChangeCompareHandler={onChangeCompareHandler}
            onClickPostcodeHandler={onClickPostcodeHandler}
            signupForm={signupForm}
            compare={compare}
            value={address}
            emailCode={emailCode}
            checkAll={checkAll}
            sendCheckAll={sendCheckAll}
          />
        ))}
      </StSignupWrap>
      {/* form 다 차지 않으면 disabled */}
      <SignupConditions checkAll={checkAll} sendCheckAll={sendCheckAll} />
      <ButtonBasic width="15rem" type="submit" margin="0 0 2rem">
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
  ${({ theme }) => theme.common.flexCenter}
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    margin-block: 2rem;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    margin-block: 2rem;
  }
`;

const StSignupWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  flex-direction: column;
  width: 100%;
  max-width: 42.5rem;
  border-top: 0.2rem solid ${({ theme }) => theme.colors.main};
  padding: 1.875rem 3.125rem;
  input {
    border: 1px solid ${({ theme }) => theme.colors.grayWeak};
    background: white;
    :focus {
      border: 1px solid ${({ theme }) => theme.colors.main};
    }
  }

  @media screen and (max-width: 23.5rem) {
    width: calc(100% - 3.125rem);
    padding: 2rem 1rem;
  }
`;
