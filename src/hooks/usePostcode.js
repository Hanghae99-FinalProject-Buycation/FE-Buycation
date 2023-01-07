import React, { useState } from "react";
import { useSelector } from "react-redux";

const usePostcode = () => {
  const zonecode = useSelector((state) => state.postcode.getZonecode);
  const address = useSelector((state) => state.postcode.getAddress);
  return { zonecode, address };
};

export default usePostcode;
