import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  memberId: {},
  getProfile: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const __getProfile = createAsyncThunk(
  "profile/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`members/${payload}/profile`);
      //console.log(data.data);
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
      //console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchProfile = createAsyncThunk(
  "profile/patch",
  async (payload, thunkAPI) => {
    //console.log("수정 데이터", payload);
    try {
      const { data } = await baseURLwToken.patch(
        `members/${payload.memberId}`,
        payload
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __duplicateCheck = createAsyncThunk(
  "duplicateCheck/patch",
  async (payload, thunkAPI) => {
    //console.log("중복체크", payload);
    try {
      const { data } = await baseURL.get(`members/signup?nickname=${payload}`);
      //console.log(data.msg);
      alert(data.msg);
      return thunkAPI.fulfillWithValue(data.data);
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
    //상태 초기화
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getProfile = action.payload;
      })
      .addCase(__getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(__getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getProfile = action.payload;
      })
      .addCase(__getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(__patchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});

export const { __isSuccess } = profileSlice.actions;
export default profileSlice.reducer;
