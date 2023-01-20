import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  postPosting: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const __postPosting = createAsyncThunk(
  "posting/post",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(`posting`, payload);
      alert(data.msg);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postingSlice = createSlice({
  name: "postPosting",
  initialState,
  reducers: {
    //상태 초기화
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__postPosting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postPosting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(__postPosting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __isSuccess } = postingSlice.actions;
export default postingSlice.reducer;
