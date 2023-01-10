import React from "react";
import styled from "@emotion/styled";
import DaumPostCode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { sendZonecode, sendAddress } from "../../redux/modules/postcodeSlice";
import {
  sendRegisterModalStatus,
  sendPostingModalStatus,
} from "../../redux/modules/postcodeModalSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const Postcode = ({ width, height, hidden }) => {
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
      <StPostcodeWrap ref={ref} width={width} height={height} hidden={hidden}>
        <StPostcode
          onComplete={(e) => selectAddress(e)}
          autoClose={false}
          defaultQuery=""
        />
      </StPostcodeWrap>
      <StPostcodeBg hidden={hidden}></StPostcodeBg>
    </>
  );
};

export default Postcode;

Postcode.defaultProps = {
  width: "",
  height: "",
};

const StPostcodeWrap = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 1rem 1rem 0 0;
  border: 4px solid red;
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

const StPostcode = styled(DaumPostCode)`
  ${({ theme }) => theme.common.flexCenter}
  left: 0;
  right: 0;
  margin: 0 auto 0;
  border: 1px solid #ffffff;
  z-index: 5;
  position: fixed;
`;
