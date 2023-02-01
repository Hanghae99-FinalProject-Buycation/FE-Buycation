import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  postPosting: [],
  isLoading: false,
  error: null,

  isSuccess: false,
  alertMsg: {},
};

export const __postPosting = createAsyncThunk(
  "posting/post",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(`posting`, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postingSlice = createSlice({
  name: "postPosting",
  initialState,
  reducers: {
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__postPosting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.alertMsg = action.payload.msg;
    });
  },
});

export const { __isSuccess } = postingSlice.actions;
export default postingSlice.reducer;
