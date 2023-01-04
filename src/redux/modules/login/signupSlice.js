import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  postSignup: {},
  isLoading: false,
  error: null,
};

export const __postSignup = createAsyncThunk(
  "signup/post",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.post(`/members/signup`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const signupSlice = createSlice({
  name: "postSignup",
  initialState,
  reducers: {
    addSignup: (state, action) => {
      baseURL.post(`/members/signup`, action.content);
      state.postSignup = state.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__postSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postSignup.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        const { datas } = action.payload;
      })
      .addCase(__postSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { postSignup } = signupSlice.actions;
export default signupSlice.reducer;
