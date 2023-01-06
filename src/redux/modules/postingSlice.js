import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../core/axios";

const initialState = {
  postPosting: [],
  isLoading: false,
  error: null,
};

export const __postPosting = createAsyncThunk(
  "posting/post",
  async (payload, thunkAPI) => {
    console.log("페이로드 :", payload);
    try {
      const { data } = await baseURLwToken.post(`posting`, payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinSlice = createSlice({
  name: "postPosting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__postPosting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postPosting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postSignin = [...state.postPosting, action.payload];
        alert(action.payload.data.msg);
      })
      .addCase(__postPosting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = signinSlice.actions;
export default signinSlice.reducer;
