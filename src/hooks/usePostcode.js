import React from "react";
import DaumPostCode from "react-daum-postcode";

const usePostcode = () => {
  const selectAddress = (e) => {
    console.log(`주소:${e.address}, 우편번호:${e.zonecode}`);
    // setOpenPostcode(false);
  };
  return (
    <>
      {/* <button onClick={() => onClickHandler()}>toggle</button> */}
      {/* {openPostcode && ( */}
      <DaumPostCode
        onComplete={(e) => selectAddress(e)}
        autoClose={false}
        defaultQuery="판교역로 235"
      />
      {/* )} */}
    </>
  );
};

export default usePostcode;
