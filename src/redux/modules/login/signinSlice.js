import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../core/axios";

//초기값
const initialState = {
  signin: [],
  isLoading: false,
  error: null,
};

//__singin : 로그인
export const __signin = createAsyncThunk(
  "__signin",
  async (payload, thunkAPI) => {
    console.log("__signin payload :", payload);
    try {
      const data = await baseURL.post(`members/login`, payload);
      console.log("data", data);
      //localStorage.setItem("id", data.headers.authorization);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},
  extraReducers: {
    [__signin.fulfilled]: (state) => {
      state.isLoading = true;
    },
    [__signin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signin = [...state.signin, action.payload];
      // localStorage.setItem("id", action.payload.headers.authorization);
      alert(action.payload.msg);
    },
    [__signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = signinSlice.actions;
export default signinSlice.reducer;
