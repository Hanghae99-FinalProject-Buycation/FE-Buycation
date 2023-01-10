import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  getDetail: {},
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk(
  "details/get",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload); //1
      const { data } = await baseURL.get(`posting/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const detailSlice = createSlice({
  name: "getDetail",
  initialState,
  reducers: {
    findDetail: (state, action) => {
      baseURL.post(`posting/${action}`);
      state.getDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getDetail = action.payload;
      })
      .addCase(__getDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { findDetail } = detailSlice.actions;
export default detailSlice.reducer;
