import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleModal: true, // 모달이 보이는 상태
  toggleChat: true, // 모달이 보이는 상태
  toggleChatParticipantModal: false,
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
    sendChatModalStatus: (state, action) => {
      state.toggleChatParticipantModal = action.payload;
    },
  },
});

export const { sendModalStatus, sendChatStatus, sendChatModalStatus } =
  generalModalSlice.actions;
export default generalModalSlice.reducer;
