import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  reviews: [],
  isSuccess: {},
  isLoading: false,
  error: null,
};

export const __getReviewList = createAsyncThunk(
  "reviewList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`profile/posting/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postReviewScore = createAsyncThunk(
  "reviewScore/post",
  async (payload, thunkAPI) => {
    const post = { userScore: payload.userScore };
    try {
      const { data } = await baseURLwToken.post(
        `profile/posting/${payload.postingId}/review/${payload.memberId}`,
        post
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getReviewList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getReviewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(__getReviewList, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(__postReviewScore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.statusCode;
    });
  },
});

export default reviewsSlice.reducer;
