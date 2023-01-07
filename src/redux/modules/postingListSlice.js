import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../core/axios";

const initialState = {
  getPostingList: [],
  isLoading: false,
  error: null,
};

export const __getPostingList = createAsyncThunk(
  "postingList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(`posting`);
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postingListSlice = createSlice({
  name: "getPostingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getPostingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getPostingList = action.payload;
      })
      .addCase(__getPostingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = postingListSlice.actions;
export default postingListSlice.reducer;
