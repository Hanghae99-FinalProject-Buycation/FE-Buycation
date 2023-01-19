import React from "react";
import styled from "@emotion/styled";
import DaumPostCode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import {
  sendZonecode,
  sendAddress,
} from "../../redux/modules/postcode/postcodeSlice";
import {
  sendRegisterModalStatus,
  sendPostingModalStatus,
} from "../../redux/modules/postcode/postcodeModalSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const Postcode = ({ width, height }) => {
  const dispatch = useDispatch();
  const selectAddress = (e) => {
    dispatch(sendZonecode(e.zonecode));
    dispatch(sendAddress(e.address));
    dispatch(sendRegisterModalStatus(false));
    dispatch(sendPostingModalStatus(false));
  };
  const handleClickOutside = () => {
    dispatch(sendRegisterModalStatus(false));
    dispatch(sendPostingModalStatus(false));
  };

  const ref = useOutsideClick(handleClickOutside);
  return (
    <>
      <StPostcodeWrap ref={ref} width={width} height={height}>
        <DaumPostCode
          onComplete={(e) => selectAddress(e)}
          autoClose={true}
          defaultQuery=""
        />
      </StPostcodeWrap>
      <StPostcodeBg />
    </>
  );
};

export default Postcode;

const StPostcodeWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  width: ${({ width }) => (width ? width : "370px")};
  height: ${({ height }) => height};
  border-radius: 1rem;
  left: 0;
  right: 0;
  top: 25%;
  margin: 0 auto 0;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayMid};
  z-index: 12;
  position: fixed;
  overflow: auto;
`;

const StPostcodeBg = styled.div`
  position: absolute;
  background: #191919;
  top: 0%;
  left: 0%;
  opacity: 0.7;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 4;
`;
