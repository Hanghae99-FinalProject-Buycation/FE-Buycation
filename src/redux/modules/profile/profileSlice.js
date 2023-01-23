import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  memberId: {},
  getProfile: [],
  isLoading: false,
  error: null,

  isSuccess: false,
  alertMsg: {},
};

export const __getProfile = createAsyncThunk(
  "profile/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`members/${payload}/profile`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyProfile = createAsyncThunk(
  "myProfile/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`members/myprofile`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchProfile = createAsyncThunk(
  "profile/patch",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.patch(
        `members/${payload.memberId}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __duplicateCheck = createAsyncThunk(
  "duplicateCheck/patch",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(
        `members/signup?nickname=${payload}`
      );
      return thunkAPI.fulfillWithValue(data.msg);
    } catch (error) {
      alert(error.response.data.msg);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getProfile = action.payload;
    });
    builder.addCase(__getMyProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getProfile = action.payload;
    });
    builder.addCase(__patchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.alertMsg = action.payload.msg;
    });
    builder.addCase(__duplicateCheck.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.alertMsg = action.payload;
    });
  },
});

export const { __isSuccess } = profileSlice.actions;
export default profileSlice.reducer;
