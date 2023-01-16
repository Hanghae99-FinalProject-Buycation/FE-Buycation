import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL, baseURLwToken } from "../../../core/axios";

const initialState = {
  getDetail: {},
  doneDetail: {},
  postApplication: {},
  getApplication: [],
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk(
  "details/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(`posting/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __doneDetail = createAsyncThunk(
  "details/done",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.patch(`posting/${payload}`);
      alert(data.msg);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getApplication = createAsyncThunk(
  "application/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(
        `participant/posting/${payload}`
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __postApplication = createAsyncThunk(
  "application/post",
  async ({ postingId, memberId }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(
        `participant/posting/${postingId}`,
        memberId
      );
      alert(data.msg);
      // return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const detailSlice = createSlice({
  name: "getDetail",
  initialState,
  reducers: {
    /*     findDetail: (state, action) => {
      baseURL.post(`posting/${action}`);
      state.getDetail = action.payload;
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getDetail = action.payload;
      })
      .addCase(__getDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__doneDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doneDetail = action.payload;
      })
      .addCase(__getApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getApplication = action.payload;
      })
      .addCase(__postApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postApplication = action.payload;
      });
  },
});

// export const { findDetail } = detailSlice.actions;
export default detailSlice.reducer;
