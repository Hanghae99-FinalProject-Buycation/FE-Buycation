import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleModal: true, // 모달이 보이는 상태
  toggleChat: true, // 모달이 보이는 상태
};

export const generalModalSlice = createSlice({
  name: "generalModal",
  initialState,
  reducers: {
    sendModalStatus: (state, action) => {
      state.toggleModal = action.payload;
    },
    sendChatStatus: (state, action) => {
      state.toggleChat = action.payload;
    },
  },
});

export const { sendModalStatus, sendChatStatus } = generalModalSlice.actions;
export default generalModalSlice.reducer;
