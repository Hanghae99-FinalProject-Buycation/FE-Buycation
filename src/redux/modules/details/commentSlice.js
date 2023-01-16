import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL, baseURLwToken } from "../../../core/axios";

const initialState = {
  postComment: {},
  putComment: {},
  deleteComment: {},
};

export const __postComment = createAsyncThunk(
  "comment/post",
  async ({ postingId, comment }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(
        `posting/${postingId}/comments`,
        comment
      );
      alert(data.msg);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__postComment.fulfilled, (state, action) => {
      state.postComment = action.payload;
    });
  },
});

export default commentSlice.reducer;
