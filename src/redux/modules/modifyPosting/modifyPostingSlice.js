import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  putPosting: {},
};

export const __putPosting = createAsyncThunk(
  "posting/put",
  async ({ postingId, modifiedContent }, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.put(
        `posting/${postingId}`,
        modifiedContent
      );
      console.log(postingId, modifiedContent);
      console.log(data);
      // return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const modifyPostingSlice = createSlice({
  name: "modifyPosting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__putPosting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__putPosting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.putPosting = action.payload;
      })
      .addCase(__putPosting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = modifyPostingSlice.actions;
export default modifyPostingSlice.reducer;
