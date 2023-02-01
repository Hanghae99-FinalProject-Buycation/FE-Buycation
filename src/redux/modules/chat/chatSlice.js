import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  getChatList: [],
  getChatRoom: {},
  getRoomNo: null,
  isLoading: false,
  error: null,
};

export const __getChatList = createAsyncThunk(
  "chatList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`talk/room`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getChatRoom = createAsyncThunk(
  "chatRoom/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`talk/room/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendRoomNo: (state, action) => {
      state.getRoomNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getChatList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__getChatList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getChatList = action.payload;
      })
      .addCase(__getChatList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__getChatRoom.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__getChatRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getChatRoom = action.payload;
      })
      .addCase(__getChatRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getChatList, getChatRoom, sendRoomNo } = chatSlice.actions;
export default chatSlice.reducer;
