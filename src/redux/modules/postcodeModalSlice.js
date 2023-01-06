import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPostingModal: false,
  openRegisterModal: false,
};

const postcodeModalSlice = createSlice({
  name: "postcodeModal",
  initialState,
  reducers: {
    sendPostingModalStatus: (state, action) => {
      state.openPostingModal = action.payload;
    },
    sendRegisterModalStatus: (state, action) => {
      state.openRegisterModal = action.payload;
    },
  },
});

export const { sendPostingModalStatus, sendRegisterModalStatus } =
  postcodeModalSlice.actions;
export default postcodeModalSlice.reducer;
