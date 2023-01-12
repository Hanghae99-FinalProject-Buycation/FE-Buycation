import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

const initialState = {
  getPostingList: [],
  getCoords: {},
  isLoading: false,
  error: null,
};

//전체 리스트 & 검색기능
export const __getPostingList = createAsyncThunk(
  "search/get",
  async (payload, thunkAPI) => {
    //console.log("페이로드 값 :", payload);
    try {
      const { data } = await baseURL.get(
        `posting?search=${payload.search}&category=${payload.category}&sort=${payload.sort}`
      );
      //console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postingListSlice = createSlice({
  name: "getPostingList",
  initialState,
  reducers: {
    //해당 게시글 좌표 값
    __getCoords: (state, action) => {
      state.getCoords = {
        coordsX: action.payload.coordsX,
        coordsY: action.payload.coordsY,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPostingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getPostingList = action.payload;
      })
      .addCase(__getPostingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __getCoords } = postingListSlice.actions;
export default postingListSlice.reducer;
