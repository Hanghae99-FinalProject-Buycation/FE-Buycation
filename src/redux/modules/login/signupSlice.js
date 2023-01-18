import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  postSignup: {},
  getEmailValidation: "",
  isLoading: false,
  error: null,
};

export const __getEmailValidation = createAsyncThunk(
  "signup/email",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(
        `members/signup/email?email=${payload}`
      );
      alert(data.msg);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getEmailValidationCheck = createAsyncThunk(
  "signup/emailcheck",
  async ({ email, code }, thunkAPI) => {
    try {
      const { data } = await baseURL.put(
        `members/signup/emailcheck?email=${email}&code=${code}`
      );
      alert(data.msg);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getNicknameDouble = createAsyncThunk(
  "signup/nickname",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(`members/signup?nickname=${payload}`);
      alert(data.msg);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __postSignup = createAsyncThunk(
  "signup/post",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.post(`members/signup`, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const signupSlice = createSlice({
  name: "postSignup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__postSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        const datas = action.payload;
        state.postSignup = datas;
      })
      .addCase(__postSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__getEmailValidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getEmailValidation = action.payload;
      })
      .addCase(__getEmailValidationCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getEmailValidation = action.payload;
      });
  },
});

export const { postSignup, getEmailValidation } = signupSlice.actions;
export default signupSlice.reducer;
