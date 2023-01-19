import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL, baseURLwToken } from "../../../core/axios";

const initialState = {
  postApplication: {},
  getApplication: [],
  allowApplication: {},
  denyApplication: {},
  isLoading: false,
  error: null,
};

export const __getApplication = createAsyncThunk(
  "application/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(
        `participant/posting/${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __postApplication = createAsyncThunk(
  "application/post",
  async ({ postingId, token }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(
        `participant/posting/${postingId}`,
        token
      );
      alert(data.msg);
      // return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __allowApplication = createAsyncThunk(
  "application/allow",
  async ({ applicationId, postingId }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.post(
        `participant/${applicationId}/posting/${postingId}`
      );
      alert(data.msg);
      // return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __denyApplication = createAsyncThunk(
  "application/deny",
  async ({ applicationId, postingId }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.delete(
        `participant/${applicationId}/posting/${postingId}`
      );
      alert(data.msg);
      // return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const applicationSlice = createSlice({
  name: "applicate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getApplication = action.payload;
      })
      .addCase(__postApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postApplication = action.payload;
      })
      .addCase(__allowApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allowApplication = action.payload;
      })
      .addCase(__denyApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.denyApplication = action.payload;
      });
  },
});

export default applicationSlice.reducer;
