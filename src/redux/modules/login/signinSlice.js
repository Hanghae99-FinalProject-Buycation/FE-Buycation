import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";
import { setCookies } from "../../../core/cookie";

const initialState = {
  postSignin: [],
  isLoading: false,
  error: null,
  isSussess: false,
};

export const __postSignin = createAsyncThunk(
  "signin/post",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.post(`members/login`, payload);
      //console.log("data", data);
      if (data.headers.authorization !== undefined) {
        setCookies("id", data.headers.authorization, {
          path: "/",
          maxAge: 1750,
        });
      }
      alert(data.data.msg);
      return thunkAPI.fulfillWithValue(data.data.statusCode);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinSlice = createSlice({
  name: "postSignin",
  initialState,
  reducers: {
    //상태 초기화
    __isSussess: (state, action) => {
      state.isSussess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__postSignin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postSignin.fulfilled, (state, action) => {
        state.isLoading = false;
        //console.log(action.payload);
        if (action.payload === 200) {
          state.isSussess = true;
        }
      })
      .addCase(__postSignin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __isSussess } = signinSlice.actions;
export default signinSlice.reducer;
