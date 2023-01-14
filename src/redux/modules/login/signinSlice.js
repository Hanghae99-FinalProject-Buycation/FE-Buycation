import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  postSignin: [],
  isLoading: false,
  error: null,
  statusCode: "",
};

export const __postSignin = createAsyncThunk(
  "signin/post",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.post(`members/login`, payload);
      console.log("data", data);
      if (data.headers.authorization !== undefined) {
        localStorage.setItem("id", data.headers.authorization);
        localStorage.setItem("memberId", data.data.data.memberId);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__postSignin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postSignin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statusCode = action.payload;
      })
      .addCase(__postSignin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default signinSlice.reducer;
