import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL, baseURLwToken } from "../../../core/axios";

const initialState = {
  getDetail: {},
  doneDetail: {},
  deleteDetail: {},
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk(
  "details/get",
  async (postingId, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`posting/${postingId}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __doneDetail = createAsyncThunk(
  "details/done",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.patch(`posting/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteDetail = createAsyncThunk(
  "details/delete",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.delete(`posting/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const detailSlice = createSlice({
  name: "getDetail",
  initialState,
  reducers: {},
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
      })
      .addCase(__doneDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doneDetail = action.payload;
      })
      .addCase(__deleteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteDetail = action.payload;
      });
  },
});

// export const { findDetail } = detailSlice.actions;
export default detailSlice.reducer;
