import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleModal: true, // 모달이 보이는 상태
};

export const generalModalSlice = createSlice({
  name: "generalModal",
  initialState,
  reducers: {
    sendModalStatus: (state, action) => {
      state.toggleModal = action.payload;
    },
  },
});

export const { sendModalStatus } = generalModalSlice.actions;
export default generalModalSlice.reducer;
