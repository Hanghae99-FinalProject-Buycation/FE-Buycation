import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  getMyList: [],
  isLoading: false,
  error: null,
};

const memberIdData = localStorage.getItem("memberId");

export const __getCreatedList = createAsyncThunk(
  "createdList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(
        `profile/${memberIdData}/myposting`
      );
      console.log("생성한 게시글", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getParticipatedList = createAsyncThunk(
  "participatedList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(
        `profile/${memberIdData}/joinposting`
      );
      console.log("참여한 게시글", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getCreatedList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getCreatedList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getMyList = action.payload;
      })
      .addCase(__getCreatedList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default myListSlice.reducer;
