import styled from "@emotion/styled";
import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";

const Postcode = () => {
  const [openPostcode, setOpenPostcode] = useState(false);

  const onClickHandler = () => {
    setOpenPostcode(!openPostcode);
  };

  const selectAddress = (e) => {
    console.log(`주소:${e.address}, 우편번호:${e.zonecode}`);
    setOpenPostcode(false);
  };
  return (
    <StPostcode>
      <button onClick={() => onClickHandler()}>toggle</button>
      {openPostcode && (
        <DaumPostCode
          onComplete={(e) => selectAddress(e)}
          autoClose={false}
          defaultQuery="판교역로 235"
        />
      )}
    </StPostcode>
  );
};

export default Postcode;

const StPostcode = styled.div`
  /* background: rgba(0, 0, 0, 0.25); */
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
