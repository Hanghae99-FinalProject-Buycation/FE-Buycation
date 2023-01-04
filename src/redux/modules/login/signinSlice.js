import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  postSignin: [],
  isLoading: false,
  error: null,
};

export const __postSignin = createAsyncThunk(
  "signin/post",
  async (payload, thunkAPI) => {
    console.log("페이로드 :", payload);
    try {
      const data = await baseURL.post(`members/login`, payload);
      console.log("data", data);
      //localStorage.setItem("id", data.headers.authorization);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinSlice = createSlice({
  name: "postSignin",
  initialState,
  reducers: {},
  extraReducers: {
    [__postSignin.fulfilled]: (state) => {
      state.isLoading = true;
    },
    [__postSignin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postSignin = [...state.signin, action.payload];
      // localStorage.setItem("id", action.payload.headers.authorization);
      alert(action.payload.msg);
    },
    [__postSignin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { postSignin } = signinSlice.actions;
export default signinSlice.reducer;
