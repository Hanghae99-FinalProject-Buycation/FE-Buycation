import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";
import { setCookies } from "../../../core/cookie";

const initialState = {
  postSignin: [],
  isLoading: false,
  error: null,

  isSuccess: false,
  statusCode: false,
  alertMsg: {},
};

export const __postSignin = createAsyncThunk(
  "signin/post",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.post(`members/login`, payload);
      if (data.headers.authorization !== undefined) {
        setCookies("id", data.headers.authorization, {
          path: "/",
          maxAge: 3500, //대략 60분
        });
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinSlice = createSlice({
  name: "postSignin",
  initialState,
  reducers: {
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    __statusCode: (state, action) => {
      state.statusCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__postSignin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.alertMsg = action.payload.msg;
      if (action.payload.statusCode === 200) {
        state.statusCode = true;
      }
    });
  },
});

export const { __isSuccess, __statusCode } = signinSlice.actions;
export default signinSlice.reducer;
