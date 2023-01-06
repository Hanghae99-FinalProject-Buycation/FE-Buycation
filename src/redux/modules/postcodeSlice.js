import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getZonecode: "",
  getAddress: "",
  getAllAddress: {},
};

const postcodeSlice = createSlice({
  name: "postcode",
  initialState,
  reducers: {
    sendZonecode: (state, action) => {
      state.getZonecode = action.payload;
    },
    sendAddress: (state, action) => {
      state.getAddress = action.payload;
    },
    sendAllAddress: (state, action) => {
      state.getAllAddress = action.payload;
    },
  },
});

export const { sendZonecode, sendAddress } = postcodeSlice.actions;

export default postcodeSlice.reducer;
