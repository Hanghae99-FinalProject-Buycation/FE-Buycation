import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  getComment: [],
  postComment: {},
  putComment: {},
  deleteComment: {},
  toggleComment: true, // 댓글 내용이 보이는 상태(미수정)
  getCommentId: null, // 댓글 보이는 상태
  isSuccess: false,
};

export const __postComment = createAsyncThunk(
  "comment/post",
  async ({ postingId, comment }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(
        `posting/${postingId}/comments`,
        comment
      );
      // alert(data.msg);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getComment = createAsyncThunk(
  "comment/get",
  async (postingId, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`posting/${postingId}`);
      return thunkAPI.fulfillWithValue(data.data.commentList);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comment/delete",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.delete(
        `posting/comments/${payload}`
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __putComment = createAsyncThunk(
  "comment/put",
  async ({ commentId, comment }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.put(
        `posting/comments/${commentId}`,
        comment
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    //상태 초기화
    __isSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    sendCommentToggle: (state, action) => {
      state.toggleComment = action.payload;
    },
    sendCommentId: (state, action) => {
      state.getCommentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__postComment.fulfilled, (state, action) => {
        state.postComment = action.payload;
        state.isSuccess = true;
      })
      .addCase(__getComment.fulfilled, (state, action) => {
        state.getComment = action.payload;
      })
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.deleteComment = action.payload;
        state.isSuccess = true;
      })
      .addCase(__putComment.fulfilled, (state, action) => {
        state.putComment = action.payload;
        state.isSuccess = true;
      });
  },
});

export const { __isSuccess, sendCommentToggle, sendCommentId } =
  commentSlice.actions;
export default commentSlice.reducer;
