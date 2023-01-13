import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  getProfile: [],
  isLoading: false,
  error: null,
};

export const __getProfile = createAsyncThunk(
  "profile/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(`members/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
