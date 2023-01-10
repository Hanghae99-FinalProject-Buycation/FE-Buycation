import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../core/axios";
// import axios from "axios";
// import { RESTAPI } from "../../core/env";

const initialState = {
  getPostingList: [],
  getCoords: {},
  isLoading: false,
  error: null,
};

//전체리스트
export const __getPostingList = createAsyncThunk(
  "postingList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURL.get(`posting`);
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// //검색기능
export const __getSearchKeyword = createAsyncThunk(
  "searchKeyword/get",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await baseURL.get(`posting?serch=${payload}`);
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카테고리별 조회
export const __getCategory = createAsyncThunk(
  "category/get",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await baseURL.get(`posting?category=${payload}`);
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 좌표 받기
// export const __getCoords = createAsyncThunk(
//   "coords/get",
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const { data } = await axios.get(
//         `https://dapi.kakao.com/v2/local/search/address.json?query=${payload}`,
//         {
//           headers: { Authorization: `KakaoAK ${RESTAPI}` },
//         }
//       );
//       console.log("data", data.documents[0]);
//       return thunkAPI.fulfillWithValue(data.documents[0]);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
