import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const __getReviewList = createAsyncThunk(
  "reviewList/get",
  async (payload, thunkAPI) => {
    //console.log("포스팅ID", payload);
    try {
      const { data } = await baseURLwToken.get(`profile/posting/${payload}`);
      //console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postReviewScore = createAsyncThunk(
  "reviewScore/post",
  async (payload, thunkAPI) => {
    console.log("리뷰 등록 페이로드", payload);
    const post = { userScore: payload.userScore };
    try {
      const { data } = await baseURLwToken.post(
        //페이로드로 넘길 값 : postingId랑 memberId랑 UseScore
        `profile/posting/${payload.postingId}/review/${payload.memberId}`,
        post
      );
      console.log(data.data);
      alert(data.data);
      return thunkAPI.fulfillWithValue(data.data);
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
  },
});

// export const {} = reviewsSlice.actions;
export default reviewsSlice.reducer;
